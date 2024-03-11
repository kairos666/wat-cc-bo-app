<script lang="ts">
    import UploadFile from "$lib/utilitary-widget/UploadFile.svelte";
    import { parseCSV } from '$lib/scripts/csv-extractors';
    import  { csvExportFileToBrowser } from '$lib/scripts/csv-export-to-browser';
    import type { SAP_Article_FiltersAndTypes, SAP_Carac_Filters, SAP_Article_FiltersAndTypes_EXPORT_ENTRY } from "$lib/types/sap-types";
    import { bulkUpsertSAPArticleFiltersAndTypes, bulkUpsertSAPCaracFilters, getAllSAPArticles, getAllSAPArticleFiltersAndTypes } from "../../../../stores/sap-store";
    import Papa from 'papaparse';
    import _ from "lodash";

    // export - article filters and types
    async function onArticlesFiltersAndTypesExport() {
        isProcessing = true
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
                "Désignation article (FR)": entry.label.find(labelEntry => (labelEntry.language === "FR"))?.name ?? "Manquant", 
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
    function onCaracsFiltersExport() {
        const csvString:string = Papa.unparse([
            { caracID: "carac A", caracValues: "value A1", isExcluded: "1" },
            { caracID: "carac A", caracValues: "value A2", isExcluded: "0" },
            { caracID: "carac B", caracValues: "value B1", isExcluded: "0" },
            { caracID: "carac B", caracValues: "value B2", isExcluded: "0" },
            { caracID: "carac B", caracValues: "value B3", isExcluded: "0" }
        ], { delimiter: ";" });
        csvExportFileToBrowser(csvString, 'caracteristics-filter');
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
    const SAPCaracFilterBuilder = (entry:Papa.ParseStepResult<string[]>):SAP_Carac_Filters => {
        return {
            caracID: entry.data[0],
            caracValues: entry.data[1],
            isExcluded: (entry.data[2] === "1")
        }
    };

    // upsert articles
    function onArticlesFiltersAndTypesUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_Article_FiltersAndTypes>(file, SAPArticleFilterAndTypeBuilder, ["Article", "Désignation article (FR)", "EXCLURE", "TYPE"])
            .then(bulkUpsertSAPArticleFiltersAndTypes)
            .catch(error => console.warn('error parsing CSV', error))
            .finally(() => { isProcessing = false; });
    }

    // upsert articles
    function onCaracsFiltersUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_Carac_Filters>(file, SAPCaracFilterBuilder, ["Caractéristique", "Valeur de la caractéristique", "EXCLURE"])
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
            <div class="row">
                <div class="col-lg-12 mt-4">
                    <UploadFile title="Typage et filtrage d'articles" label="Mise à jour de la configuration d'articles" hasExportBtn isLoading={ isProcessing } on:import={ evt => { onArticlesFiltersAndTypesUpload(evt.detail) } } on:export={ onArticlesFiltersAndTypesExport }>
                        <p>Mettre à jour la configuration des filtres d'exclusion et types assignés sur l'inventaire d'articles SAP. Seules les deux colonnes décrites ci-dessous sont à modifier, les autres informations servent à identifier les articles mentionnés.</p>
                        <ul>
                            <li>Colonne <span class="badge badge-secondary">EXCLURE</span> : 0 = conserver (par défaut) ou 1 = exclure</li>
                            <li>Colonne <span class="badge badge-secondary">TYPE</span> : <span class="badge badge-light">profil de fond</span>, <span class="badge badge-light">escalier</span>, <span class="badge badge-light">échelle</span>, <span class="badge badge-light">banc immergé</span>, <span class="badge badge-light">liner</span>, <span class="badge badge-light">local technique</span>, <span class="badge badge-light">média filtrant</span>, <span class="badge badge-light">traitement</span>, <span class="badge badge-light">électrolyseur</span>, <span class="badge badge-light">régulateur PH</span>, <span class="badge badge-light">couvertures</span>, <span class="badge badge-light">pitons</span>, <span class="badge badge-light">enrouleur motorisé</span>, <span class="badge badge-light">enrouleur</span>, <span class="badge badge-light">margelle</span>, <span class="badge badge-light">éclairage</span>, <span class="badge badge-light">accessoire</span>, <span class="badge badge-light">prestation</span>, <span class="badge badge-light">produit racine</span></li>
                        </ul>
                        <hr />
                    </UploadFile>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 mt-4">
                    <UploadFile title="Filtrage des valeurs de caractéristiques" label="Mise à jour de la configuration de caractéristiques" hasExportBtn isLoading={ isProcessing } on:import={ evt => { onCaracsFiltersUpload(evt.detail) } } on:export={ onCaracsFiltersExport }>
                        <p>Mettre à jour la configuration des filtres d'exclusion de valeurs de caractéristiques. Seule la colonne <span class="badge badge-secondary badge-sm">EXCLURE</span> est à modifier, les autres informations servent à identifier les caractéristiques et valeurs mentionnées.</p>
                        <p>Colonne <span class="badge badge-secondary">EXCLURE</span> : 0 = conserver (par défaut) ou 1 = exclure</p>
                        <p>Une caractéristique ayant toutes ses valeurs exclues sera elle-même exclus</p>
                        <hr />
                    </UploadFile>
                </div>
            </div>
        </div>
    </div>
</div>
