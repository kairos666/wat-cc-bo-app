<script lang="ts">
    import UploadFile from "$lib/utilitary-widget/UploadFile.svelte";
    import { parseCSV } from '$lib/scripts/csv-extractors';
    import type { SAP_RAW_Article, SAP_Article, SAP_Object, SAP_RAW_Carac, SAP_Carac, SAP_Prices } from '$lib/types/sap-types';
    import { bulkUpsertSAPArticle, bulkUpsertSAPObject, bulkUpsertSAPCarac, bulkUpsertSAPPrices, clearAllSAPTables } from "../../../stores/sap-store";
    import _ from "lodash";
    
    // entry builders - Article
    const SAPRawArticleBuilder = (entry:Papa.ParseStepResult<string[]>):SAP_RAW_Article => {
        return {
            articleID: entry.data[0],
            tyar: entry.data[3],
            language: entry.data[4],
            label: entry.data[5],
            hierarchy: entry.data[9],
            articleGroup: entry.data[10]
        }
    };

    // entry builders - Object
    const SAPObjectBuilder = (entry:Papa.ParseStepResult<string[]>):SAP_Object => {
        return {
            articleID: entry.data[2],
            objID: entry.data[3]
        }
    };

    // entry builders - Object Carac link
    const SAPObjToCaracLinkBuilder = (entry:Papa.ParseStepResult<string[]>):SAP_RAW_Carac => {
        return {
            objID: entry.data[1],
            caracID: entry.data[2],
            caracValue: entry.data[12]
        }
    };

    // entry builders - price link (simple prices only, uncomplete)
    const SAPPricesBuilder = (entry:Papa.ParseStepResult<string[]>):SAP_Prices => {
        return {
            articleID: entry.data[0],
            priceGroup: entry.data[5],
            price: parseFloat(entry.data[7].replace(',', '.')) // parseFloat only considers dots
        }
    };

    // merge translations for articles (avoid duplicated article entries)
    const ArticleCollectionBuilder = (rawEntries:SAP_RAW_Article[]):SAP_Article[] => {
        return  Object.values(_.groupBy(rawEntries, (entry:SAP_RAW_Article) => entry.articleID)).map((sameLanguageEntries:SAP_RAW_Article[]) => {
            const baseArticle:SAP_Article = {
                articleID: sameLanguageEntries[0].articleID,
                tyar: sameLanguageEntries[0].tyar,
                label: [],
                hierarchy: sameLanguageEntries[0].hierarchy,
                articleGroup: sameLanguageEntries[0].articleGroup,
            }

            // construct translations for article
            baseArticle.label = sameLanguageEntries.reduce((acc, curr) => {
                acc.push({ name: curr.label, language: curr.language });

                return acc;
            }, ([] as { name:string, language:string }[]));

            return baseArticle;
        }) 
    }

    // merge caracs and possible values (avoid duplicated carac entries)
    const CaracCollectionBuilder = (rawEntries:SAP_RAW_Carac[]):SAP_Carac[] => {
        return  Object.values(_.groupBy(rawEntries, (entry:SAP_RAW_Carac) => entry.caracID)).map((caracValueEntries:SAP_RAW_Carac[]) => {
            return {
                caracID: caracValueEntries[0].caracID,
                caracValues: Object.values(_.groupBy(caracValueEntries, (entry:SAP_RAW_Carac) => entry.caracValue)).map((objectEntries:SAP_RAW_Carac[]) => {
                    return { value: objectEntries[0].caracValue, objLinks: [...new Set(objectEntries.map(entry => entry.objID))] }
                })
            }
        }) 
    };

    // upsert articles
    function onArticlesUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_RAW_Article>(file, SAPRawArticleBuilder)
            .then(ArticleCollectionBuilder)
            .then(bulkUpsertSAPArticle)
            .then(() => {
                isProcessing = false;
            })
            .catch(error => console.warn('error parsing CSV', error));
    }

    // upsert articles
    function onObjectsUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_Object>(file, SAPObjectBuilder)
            .then(bulkUpsertSAPObject)
            .then(() => {
                isProcessing = false;
            })
            .catch(error => console.warn('error parsing CSV', error));
    }

    // upsert caracs
    function onCaracsUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_RAW_Carac>(file, SAPObjToCaracLinkBuilder)
            .then(CaracCollectionBuilder)
            .then(bulkUpsertSAPCarac)
            .then(() => {
                isProcessing = false;
            })
            .catch(error => console.warn('error parsing CSV', error));
    }

    // upsert caracs
    function onPricesUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_Prices>(file, SAPPricesBuilder)
            .then(results => results.filter(result => (result.articleID !== ""))) // ignore all entries without articleID (ZMAT, done manually)
            .then(bulkUpsertSAPPrices)
            .then(() => {
                isProcessing = false;
            })
            .catch(error => console.warn('error parsing CSV', error));
    }

    // clean all SAP tables
    function onSAPEntitiesClearing() {
        isProcessing = true;
        clearAllSAPTables()
            .then(() => { isProcessing = false })
            .catch(error => { isProcessing = false; console.warn('clearing error', error) })
    }

    let isProcessing:boolean = false;
</script>
<svelte:head>
	<title>CONFCOM - TECH</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-12">
                    <h1>TECH page, update SAP version</h1>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="alert alert-warning" role="alert">
                        <h4 class="alert-heading">PROTOTYPE only!</h4>
                        <p>Cette page n'existe pas dans le BO cible. Il s'agit ici seulement de permettre la mise à jour les données VSC SAP pour simuler une mise à jour de l'extraction.</p>
                        <hr />
                        <button type="button" class="btn btn-danger btn-lg" on:click={ onSAPEntitiesClearing }>Nettoyer toutes les données SAP</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 mt-4">
                    <UploadFile title="ART VC T800 ou ZMAT" label="Mise à jour articles" isLoading={ isProcessing } on:import={ evt => { onArticlesUpload(evt.detail) } } />
                    <p class="text-muted">Plusieurs fichiers peuvent être injectés à la suite</p>
                </div>
                <div class="col-lg-6 mt-4">
                    <UploadFile title="ART OBJ" label="Mise à jour Objets" isLoading={ isProcessing } on:import={ evt => { onObjectsUpload(evt.detail) } } />
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 mt-4">
                    <UploadFile title="OBJ CLASS CARAC" label="Mise à jour des Caractéristiques" isLoading={ isProcessing } on:import={ evt => { onCaracsUpload(evt.detail) } } />
                </div>
                <div class="col-lg-6 mt-4">
                    <UploadFile title="TARIFS" label="Mise à jour des tarifs" isLoading={ isProcessing } on:import={ evt => { onPricesUpload(evt.detail) } } />
                </div>
            </div>
        </div>
    </div>
</div>
