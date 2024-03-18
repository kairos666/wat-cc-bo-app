<script lang="ts">
    import { reportStore } from "../../stores/bcc-report-modelization";

    let allKeptArticlesAreTypes:boolean = false;
    let oneAndOnlyOneRootProduct:boolean = false;
    let rootProduct:any|null = null;

    $: if($reportStore) {
        allKeptArticlesAreTypes = ($reportStore.articles.typesCount === $reportStore.articles.keptCount);
        const foundRootProducts = $reportStore.articles.groupedByType.find(entry => entry.type === "produit racine");
        oneAndOnlyOneRootProduct = (foundRootProducts !== undefined && foundRootProducts.count === 1);
        rootProduct = (oneAndOnlyOneRootProduct)
            ? foundRootProducts?.articles[0]
            : null;
    }
</script>
 
{#if $reportStore}
<div class="row">
    <div class="col-lg-6">
        <div class="card card-secondary">
            <div class="card-header">
                <h2 class="card-title"><i class="fas fa-shopping-cart mr-3"></i><span class="badge badge-pill badge-light mr-3">x { $reportStore.articles.keptCount }</span> Articles</h2>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>x { $reportStore.articles.zmatCount }</b> ZMAT (extraction brute SAP)</li>
                    <li class="list-group-item"><b>x { $reportStore.articles.t800Count }</b> T800 (extraction brute SAP)</li>
                    <li class="list-group-item"><b>x { $reportStore.articles.filterCount }</b> filtres articles définis</li>
                    <li class="list-group-item"><b>x { $reportStore.articles.typesCount }</b> types articles définis</li>
                </ul>
            </div>
            <details class="card-footer">
                <summary class="text-muted">Distribution des articles par types</summary>
                <ul class="list-group list-group-flush">
                    {#each $reportStore.articles.groupedByType ?? [] as typeEntry}
                        {#if typeEntry.type !== "null"}
                        <li class="list-group-item bg-transparent"><b>x { typeEntry.count }</b> { typeEntry.type }</li>
                        {:else}
                        <li class="list-group-item bg-transparent"><span class="badge badge-pill badge-danger mr-1">x { typeEntry.count }</span><i>non typé</i></li>
                        {/if}
                    {/each}
                </ul>
            </details>
        </div>
    </div>
    <div class="col-lg-6">
        <h2>Modélisation BCC</h2>
        <div class="info-box">
            <span class="info-box-icon bg-info"><i class="fas fa-shopping-cart"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">Articles retenus</span>
                <div class="progress"><div class="progress-bar bg-info" style={ `width: ${ $reportStore.articles.percFiltererd }%` }></div></div>
                <span class="progress-description text-muted">{ $reportStore.articles.percFiltererd }% des articles retenus</span>
            </div>
        </div>
        <div class="info-box">
            <span class="info-box-icon" class:bg-success={ oneAndOnlyOneRootProduct }  class:bg-danger={ !oneAndOnlyOneRootProduct }><i class="fas fa-star"></i></span>
            <!-- color change when 0 or more than 1 -->
            <div class="info-box-content">
                <span class="info-box-text">Produit racine</span>
                {#if (rootProduct !== null)}
                <span class="info-box-number">Article { rootProduct.articleID }</span>
                {:else}
                <span class="info-box-number">Article racine, non unique ou non trouvé</span>
                {/if}
            </div>
        </div>
        <div class="info-box">
            <!-- color change when 100% -->
            <span class="info-box-icon" class:bg-success={ allKeptArticlesAreTypes }  class:bg-danger={ !allKeptArticlesAreTypes }><i class="fas fa-layer-group"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">Typage des articles retenus</span>
                <div class="progress"><div class="progress-bar" class:bg-success={ allKeptArticlesAreTypes }  class:bg-danger={ !allKeptArticlesAreTypes } style={ `width: ${ $reportStore.articles.percTyped }%` }></div></div>
                <span class="progress-description text-muted">{ $reportStore.articles.percTyped }% des articles retenus typés</span>
            </div>
        </div>
    </div>
</div>
<div class="row mt-5">
    <div class="col-lg-6">
        <div class="card card-secondary">
            <div class="card-header">
                <h2 class="card-title"><i class="fas fa-th mr-3"></i><span class="badge badge-pill badge-light mr-3">x { $reportStore.caracteristics.caracCount }</span> Caractéristiques<span class="badge badge-pill badge-light ml-5 mr-3">x { $reportStore.caracteristics.caracValueCount }</span> Valeurs</h2>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>x { $reportStore.caracteristics.caracCount }</b> caractéristiques (extraction brute SAP)</li>
                    <li class="list-group-item"><b>x { $reportStore.caracteristics.caracValueCount }</b> valeurs (extraction brute SAP)</li>
                    <li class="list-group-item"><b>x { $reportStore.caracteristics.filterCount }</b> filtres de valeurs définis</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <h2>Modélisation BCC</h2>
        <div class="info-box">
            <span class="info-box-icon bg-info"><i class="fas fa-th"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">Caractéristiques retenues</span>
                <div class="progress"><div class="progress-bar bg-info" style={ `width: ${ $reportStore.caracteristics.percFilteredCarac }%` }></div></div>
                <span class="progress-description text-muted">{ $reportStore.caracteristics.percFilteredCarac }% des caractéristiques retenus (x{ $reportStore.caracteristics.caracCount - $reportStore.caracteristics.keptCaracCount } exclus)</span>
            </div>
        </div>
        <div class="info-box">
            <span class="info-box-icon bg-info"><i class="fas fa-th"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">Valeurs de caractéristiques retenues</span>
                <div class="progress"><div class="progress-bar bg-info" style={ `width: ${ $reportStore.caracteristics.percFilteredCaracValue }%` }></div></div>
                <span class="progress-description text-muted">{ $reportStore.caracteristics.percFilteredCaracValue }% des valeurs de caractéristiques retenues (x{ $reportStore.caracteristics.caracValueCount - $reportStore.caracteristics.keptCaracValueCount } exclus)</span>
            </div>
        </div>
    </div>
</div>
<div class="row mt-5">
    <div class="col-lg-12">
        <h2>Autres extractions SAP</h2>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <div class="info-box bg-secondary">
            <span class="info-box-icon"><i class="fas fa-link"></i></span>
            <div class="info-box-content">
                <span class="info-box-text"><span class="badge badge-pill badge-light mr-3">x { $reportStore.objects.objectCount }</span> Objets SAP</span>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="info-box bg-secondary">
            <span class="info-box-icon"><i class="fas fa-euro-sign"></i></span>
            <div class="info-box-content">
                <span class="info-box-text"><span class="badge badge-pill badge-light mr-3">x { $reportStore.prices.priceCount }</span> Tarifs SAP</span>
            </div>
        </div>
    </div>
</div>
<div class="row mt-5">
    <div class="col-lg-12">
        <h2>Analyse relationnelle</h2>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <div class="card" class:card-danger={ $reportStore.analytics.linkedCaracValueCount === 0 } class:card-success={ $reportStore.analytics.linkedCaracValueCount > 0 }>
            <div class="card-header">
                <h2 class="card-title"><i class="fas fa-shopping-cart"></i><i class="fas fa-arrows-alt-h mx-2"></i><i class="fas fa-link"></i><i class="fas fa-arrows-alt-h mx-2"></i><i class="fas fa-th mr-3"></i> Liaisons complètes</h2>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>x { $reportStore.analytics.linkedZmatCount }</b> Articles ZMAT</li>
                    <li class="list-group-item"><b>x { $reportStore.analytics.linkedT800Count }</b> Articles T800</li>
                    <li class="list-group-item"><b>x { $reportStore.analytics.linkedObjectCount }</b> Objets</li>
                    <li class="list-group-item"><b>x { $reportStore.analytics.linkedCaracValueCount }</b> Valeurs de caractéristiques ({ $reportStore.analytics.linkedCaracCount } caractéristiques différentes)</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <p><b>Les articles, caractéristiques et valeurs de caractéristiques filtrées sont ignorés</b> dans les évaluations ci-contre. Faites attention à ne pas casser des liaisons utiles en filtrant les éléments.</p>
        <p><b>Les tarifs ne sont pas pris en compte</b>, même si tous les articles doivent avoir un tarif, comme nous savons que tous les tarifs ne sont pas extraits de SAP, on ignore cette dimension pour l'instant. Par contre il faudra que tous les articles retenus soient enrichi pour avoir au moins un tarif simple.</p>
        <p>Attention, il y'a des caractéristiques techniques qui ne seront liées au reste du configurateur qu'après enrichissement. Les caractéristiques directement liées à un article ne sont donc pas les seules qui seront conservées pour la modélisation.</p>
        <div class="alert alert-primary" role="alert">Pour le bon fonctionnement du configurateur commercial, seuls les éléments ayant une liaison complète seront utilisés. Les articles orphelins sont ignorés pour l'étape d'enrichissement.</div>
    </div>
</div>
{:else}
<div class="row">
    <div class="col-lg-12">
        <div class="alert alert-info" role="alert">Rapport non disponible</div>
    </div>
</div>
{/if}
