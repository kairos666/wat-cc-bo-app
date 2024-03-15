<script lang="ts">
    import UploadFile from "$lib/utilitary-widget/UploadFile.svelte";
    import { parseCSV } from '$lib/scripts/csv-extractors';
    import  { csvExportFileToBrowser } from '$lib/scripts/csv-export-to-browser';
    import type { SAP_Article_FiltersAndTypes, SAP_Carac_Filters, SAP_Article_FiltersAndTypes_EXPORT_ENTRY, SAP_Carac_Filters_EXPORT_ENTRY } from "$lib/types/sap-types";
    import { bulkUpsertSAPArticleFiltersAndTypes, bulkUpsertSAPCaracFilters, getAllSAPArticles, getAllSAPArticleFiltersAndTypes, getAllSAPCaracteristics, getAllSAPCaracteristicFilters } from "../../../../stores/sap-store";
    import Papa from 'papaparse';
    import _ from "lodash";

    // export - article filters and types
    async function onArticlesFiltersAndTypesExport() {
        isProcessing = true;
        // 1. get all articles + get all filters and types (may be empty)
        const [allArticles, allFiltersAndTypes] = await Promise.all([
            getAllSAPArticles(),
            getAllSAPArticleFiltersAndTypes()
        ]);
        // 2. merge and convert to target format
        let resultExportableData:SAP_Article_FiltersAndTypes_EXPORT_ENTRY[] = allArticles.map(entry => {
            // convert all to target data with defaults (no config for filters and types case)
            return {
                "Article": entry.articleID, 
                "Désignation article": entry.label.find(labelEntry => (labelEntry.language === "FR"))?.name ?? "Manquant", 
                "EXCLURE": "0", 
                "TYPE": ""
            }
        });
        if(allFiltersAndTypes.length > 0) {
            // filters and types already loaded in app, apply current configuration
            resultExportableData = resultExportableData.map(entry => {
                const foundFilterEntry = allFiltersAndTypes.find(filterEntry => filterEntry.articleID === entry.Article);

                return {
                    ...entry,
                    "EXCLURE": (foundFilterEntry && foundFilterEntry.isExcluded) ? "1" : "0", 
                    "TYPE": (foundFilterEntry) ? foundFilterEntry.type : ""
                };
            })
        }
        const csvString:string = Papa.unparse(resultExportableData, { delimiter: ";" });
        // 3. trigger CSV download
        csvExportFileToBrowser(csvString, 'articles-filter-and-type');
        isProcessing = false;
    }

    // export - carac filters
    async function onCaracsFiltersExport() {
        isProcessing = true;
        // 1. get all carcateristics and their values + get all filters (may be empty)
        const [allCaracs, allCaracFilters] = await Promise.all([
            getAllSAPCaracteristics(),
            getAllSAPCaracteristicFilters()
        ]);
        // 2. merge and convert to target format
        let resultExportableData:SAP_Carac_Filters_EXPORT_ENTRY[] = allCaracs.reduce((acc, entry) => {
            // convert all to target data with defaults (no config for filters and types case)
            return [...acc, ...entry.caracValues.map(valueEntry => ({ "Caractéristique": entry.caracID, "Valeur de la caractéristique": valueEntry.value, "EXCLURE": "0" }))];
        }, ([] as SAP_Carac_Filters_EXPORT_ENTRY[]));
        if(allCaracFilters.length > 0) {
            // filters and types already loaded in app, apply current configuration
            resultExportableData = resultExportableData.map(entry => {
                const isExcluded:boolean = !!allCaracFilters.find(filterEntry => (filterEntry.caracID === entry["Caractéristique"] && filterEntry.caracValue === entry["Valeur de la caractéristique"])) ?? false;

                return {
                    ...entry,
                    "EXCLURE": (isExcluded) ? "1" : "0"
                };
            })
        }
        const csvString:string = Papa.unparse(resultExportableData, { delimiter: ";" });
        // 3. trigger CSV download
        csvExportFileToBrowser(csvString, 'caracteristics-filter');
        isProcessing = false;
    }

    // entry builders - article filters and types
    const SAPArticleFilterAndTypeBuilder = (entry:Papa.ParseStepResult<string[]>):SAP_Article_FiltersAndTypes => {
        return {
            articleID: entry.data[0],
            isExcluded: (entry.data[2] === "1"),
            type: entry.data[3]
        }
    };

    // entry builders - carac filters
    type SAP_Carac_Filters_Extended =  SAP_Carac_Filters & { isExcluded:boolean };
    const SAPCaracFilterBuilder = (entry:Papa.ParseStepResult<string[]>):SAP_Carac_Filters_Extended => {
        return {
            caracID: entry.data[0],
            caracValue: entry.data[1],
            isExcluded: (entry.data[2] === "1")
        }
    };

    // upsert articles
    function onArticlesFiltersAndTypesUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_Article_FiltersAndTypes>(file, SAPArticleFilterAndTypeBuilder, ["Article", "Désignation article", "EXCLURE", "TYPE"])
            .then(bulkUpsertSAPArticleFiltersAndTypes)
            .catch(error => console.warn('error parsing CSV', error))
            .finally(() => { isProcessing = false; });
    }

    // upsert articles
    function onCaracsFiltersUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_Carac_Filters_Extended>(file, SAPCaracFilterBuilder, ["Caractéristique", "Valeur de la caractéristique", "EXCLURE"])
            .then(results => results.filter(entry => entry.isExcluded).map(entry => ({ caracID: entry.caracID, caracValue: entry.caracValue }))) // only keeps excluded values
            .then(bulkUpsertSAPCaracFilters)
            .catch(error => console.warn('error parsing CSV', error))
            .finally(() => { isProcessing = false; });
    }

    let isProcessing:boolean = false;
</script>
<svelte:head>
	<title>CONFCOM - Filtrage & typage des données</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Filtres d'exclusion, et types d'articles des données SAP</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/CONFCOM">Accueil</a></li>
                        <li class="breadcrumb-item active">Filtres & types</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <ol>
                        <li>Marquer les articles à exclure</li>
                        <li>Assigner un type à tous les articles conservés</li>
                        <li>Marquer les valeurs de caractéristiques à excure (les valeurs exclus seront ignorées, une caractéristiques sans valeurs sera ignorée)</li>
                    </ol>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-6">
                    <UploadFile title="Typage et filtrage d'articles" label="Mise à jour de la configuration d'articles" hasExportBtn isLoading={ isProcessing } on:import={ evt => { onArticlesFiltersAndTypesUpload(evt.detail) } } on:export={ onArticlesFiltersAndTypesExport } />
                </div>
                <div class="col-lg-6">
                    <p>Mettre à jour la configuration des filtres d'exclusion et types assignés sur l'inventaire d'articles SAP. Seules les deux colonnes décrites ci-dessous sont à modifier, les autres informations servent à identifier les articles mentionnés.</p>
                    <ul>
                        <li>Colonne <span class="badge badge-secondary">EXCLURE</span> : 0 = conserver (par défaut) ou 1 = exclure</li>
                        <li>Colonne <span class="badge badge-secondary">TYPE</span> : profil de fond, escalier, échelle, banc immergé, liner, local technique, média filtrant, traitement, électrolyseur, régulateur PH, couvertures, pitons, enrouleur motorisé, enrouleur, margelle, éclairage, accessoire, prestation, produit racine</li>
                    </ul>
                    <p class="text-muted">Attention importer une nouvelle configuration écrase la précédente version</p>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-lg-6">
                    <UploadFile title="Filtrage des valeurs de caractéristiques" label="Mise à jour de la configuration de caractéristiques" hasExportBtn isLoading={ isProcessing } on:import={ evt => { onCaracsFiltersUpload(evt.detail) } } on:export={ onCaracsFiltersExport } />
                </div>
                <div class="col-lg-6">
                    <p>Mettre à jour la configuration des filtres d'exclusion de valeurs de caractéristiques. Seule la colonne <span class="badge badge-secondary badge-sm">EXCLURE</span> est à modifier, les autres informations servent à identifier les caractéristiques et valeurs mentionnées.</p>
                    <p>Une caractéristique ayant toutes ses valeurs exclues sera elle-même exclus</p>
                    <ul>
                        <li>Colonne <span class="badge badge-secondary">EXCLURE</span> : 0 = conserver (par défaut) ou 1 = exclure</li>
                    </ul>
                    <p class="text-muted">Attention importer une nouvelle configuration écrase la précédente version</p>
                </div>
            </div>
        </div>
    </div>
</div>
