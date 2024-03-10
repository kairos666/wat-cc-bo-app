<script lang="ts">
    import UploadFile from "$lib/utilitary-widget/UploadFile.svelte";
    import { parseCSV } from '$lib/scripts/csv-extractors';
    import type { SAP_RAW_Article, SAP_Article } from '$lib/types/sap-types';
    import _ from "lodash";
    import { bulkUpsertSAPArticle } from "../../../stores/sap-store";
    
    // entry builders
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

    // upsert articles
    function onArticleUpload(file:File) {
        isProcessing = true;
        parseCSV<SAP_RAW_Article>(file, SAPRawArticleBuilder)
            .then(ArticleCollectionBuilder)
            .then(bulkUpsertSAPArticle)
            .then(() => {
                isProcessing = false;
            })
            .catch(error => console.warn('error parsing CSV', error));
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
                        <p>Cette page n'exsite pas dans le BO cible. Il s'agit ici seulement de permettre à mettre à jour les données VSC SAP pour simuler une mise à jour de l'extraction.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 mt-4">
                    <UploadFile title="ART VC T800 ou ZMAT" label="Mise à jour articles" isLoading={ isProcessing } on:import={ evt => { onArticleUpload(evt.detail) } } />
                </div>
                <div class="col-lg-6 mt-4">
                    <UploadFile title="ART OBJ" label="Mise à jour Objets" isLoading={ isProcessing } on:import={ evt => { onArticleUpload(evt.detail) } } />
                </div>
            </div>
        </div>
    </div>
</div>
