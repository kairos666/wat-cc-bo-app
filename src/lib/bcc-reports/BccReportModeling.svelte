<script lang="ts">
    import { getLoadedBcc } from "../../stores/bcc-store";
</script>
 
{#if $getLoadedBcc}
<div class="row">
    <div class="col-lg-6">
        <div class="card card-secondary">
            <div class="card-header">
                <h2 class="card-title"><i class="fas fa-shopping-cart mr-3"></i><span class="badge badge-pill badge-light mr-3">x 3190</span> Articles</h2>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>x 123</b> ZMAT (extraction brute SAP)</li>
                    <li class="list-group-item"><b>x 3256</b> T800 (extraction brute SAP)</li>
                    <li class="list-group-item"><b>x 459</b> filtres articles définis</li>
                    <li class="list-group-item"><b>x 4598</b> types articles définis</li>
                </ul>
            </div>
            <details class="card-footer">
                <summary class="text-muted">Distribution des articles par types</summary>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-transparent"><b>x 1</b> produit racine</li>
                    <li class="list-group-item bg-transparent"><b>x 450</b> liner</li>
                    <li class="list-group-item bg-transparent"><b>x 986</b> margelle</li>
                    <li class="list-group-item bg-transparent">...</li>
                    <li class="list-group-item bg-transparent"><span class="badge badge-pill badge-danger mr-1">x 1199</span><i>non typé</i></li>
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
                <div class="progress"><div class="progress-bar bg-info" style="width: 98%"></div></div>
                <span class="progress-description text-muted">98% des articles retenus (x123 exclus)</span>
            </div>
        </div>
        <div class="info-box">
            <span class="info-box-icon bg-success"><i class="fas fa-star"></i></span>
            <!-- color change when 0 or more than 1 -->
            <div class="info-box-content">
                <span class="info-box-text">Produit racine</span>
                <span class="info-box-number">Article WATERAIR / objet N° 00000455998</span>
            </div>
        </div>
        <div class="info-box">
            <!-- color change when 100% -->
            <span class="info-box-icon bg-danger"><i class="fas fa-layer-group"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">Typage des articles retenus</span>
                <div class="progress"><div class="progress-bar bg-danger" style="width: 70%"></div></div>
                <span class="progress-description text-muted">70% des articles retenus typés</span>
            </div>
        </div>
    </div>
</div>
<div class="row mt-5">
    <div class="col-lg-6">
        <div class="card card-secondary">
            <div class="card-header">
                <h2 class="card-title"><i class="fas fa-th mr-3"></i><span class="badge badge-pill badge-light mr-3">x 871</span> Caractéristiques<span class="badge badge-pill badge-light ml-5 mr-3">x 7767</span> Valeurs</h2>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>x 879</b> caractéristiques (extraction brute SAP)</li>
                    <li class="list-group-item"><b>x 7865</b> valeurs (extraction brute SAP)</li>
                    <li class="list-group-item"><b>x 123</b> filtres de valeurs définis</li>
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
                <div class="progress"><div class="progress-bar bg-info" style="width: 99%"></div></div>
                <span class="progress-description text-muted">99% des caractéristiques retenus (x8 exclus)</span>
            </div>
        </div>
        <div class="info-box">
            <span class="info-box-icon bg-info"><i class="fas fa-th"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">Valeurs de caractéristiques retenues</span>
                <div class="progress"><div class="progress-bar bg-info" style="width: 98%"></div></div>
                <span class="progress-description text-muted">98% des valeurs des caractéristiques restantes retenues (x92 exclus)</span>
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
                <span class="info-box-text"><span class="badge badge-pill badge-light mr-3">x 879</span> Objets SAP</span>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="info-box bg-secondary">
            <span class="info-box-icon"><i class="fas fa-euro-sign"></i></span>
            <div class="info-box-content">
                <span class="info-box-text"><span class="badge badge-pill badge-light mr-3">x 15800</span> Tarifs SAP</span>
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
        <div class="card card-outline card-warning">
            <div class="card-header">
                <h3 class="card-title float-none d-flex justify-content-between">
                    <span><span class="badge badge-pill badge-warning mr-1">x 5800</span>Articles orphelins</span>
                    <span><i class="fas fa-shopping-cart text-info"></i><i class="fas fa-long-arrow-alt-right text-danger mx-2"></i><i class="fas fa-link"></i></span>
                </h3>
            </div>
            <div class="card-body">
                <p class="text-muted">Tous les articles qui n'ont pas de référence d'objet SAP associée. Les articles filtrés ne sont pas pris en compte dans le calcul.</p>
                <details>
                    <summary>Liste des articles orphelins</summary>
                    <div class="bg-light rounded p-2">
                        <p>00001548, 0007778881, ACC.POMPE, ...</p>
                    </div>
                </details>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="card card-outline card-warning">
            <div class="card-header">
                <h3 class="card-title float-none d-flex justify-content-between">
                    <span><span class="badge badge-pill badge-warning mr-1">x 1245</span>Articles orphelins bis</span>
                    <span><i class="fas fa-shopping-cart text-info"></i><i class="fas fa-long-arrow-alt-right mx-2"></i><i class="fas fa-link"></i><i class="fas fa-long-arrow-alt-right text-danger mx-2"></i><i class="fas fa-th"></i></span>
                </h3>
            </div>
            <div class="card-body">
                <p class="text-muted">Tous les articles, ayant une référence objet mais qui n'ont pas de caractéristiques SAP associées. Les articles filtrés ne sont pas pris en compte dans le calcul.</p>
                <details>
                    <summary>Liste des articles orphelins</summary>
                    <div class="bg-light rounded p-2">
                        <p>00001548, 0007778881, ACC.POMPE, ...</p>
                    </div>
                </details>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <div class="card card-outline card-success">
            <div class="card-header">
                <h3 class="card-title float-none d-flex justify-content-between">
                    <span><span class="badge badge-pill badge-success mr-1">x 0</span>Objets inutiles</span>
                    <span><i class="fas fa-shopping-cart"></i><i class="fas fa-long-arrow-alt-right text-danger mx-2"></i><i class="fas fa-link text-info"></i><i class="fas fa-long-arrow-alt-left text-danger mx-2"></i><i class="fas fa-th"></i></span>
                </h3>
            </div>
            <div class="card-body">
                <p class="text-muted">Tous les obejts SAP qui ne sont ni associés à des articles, ni a des caractéristiques fournies. Tous les articles et caractéristiques sont pris en compte, les filtres ne s'appliquent pas.</p>
                <details>
                    <summary>Liste des objets inutiles</summary>
                    <div class="bg-light rounded p-2">
                        <p>00001548, 0007778881, ACC.POMPE, ...</p>
                    </div>
                </details>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="card card-outline card-info">
            <div class="card-header">
                <h3 class="card-title float-none d-flex justify-content-between">
                    <span><span class="badge badge-pill badge-info mr-1">x 72</span>Caractéristiques associées au produit racine</span>
                    <span><i class="fas fas fa-star"></i><i class="fas fa-long-arrow-alt-right mx-2"></i><i class="fas fa-link"></i><i class="fas fa-long-arrow-alt-right mx-2"></i><i class="fas fa-th text-info"></i></span>
                </h3>
            </div>
            <div class="card-body">
                <p class="text-muted">Toutes les caractéristiques, non filtrées, qui ont au moins une valeur associée au produit racine.</p>
                <details>
                    <summary>Liste des caractéristiques du produit racine</summary>
                    <div class="bg-light rounded p-2">
                        <p>00001548, 0007778881, ACC.POMPE, ...</p>
                    </div>
                </details>
            </div>
        </div>
    </div>
</div>
{:else}
<div class="row">
    <div class="col-lg-12">
        <div class="alert alert-info" role="alert">Rapport non disponible</div>
    </div>
</div>
{/if}
