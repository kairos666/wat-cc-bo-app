<script>
    import bigLogo from '$lib/images/waterair-logo.svg';
</script>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Accueil</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item active">Accueil</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="jumbotron jumbotron-fluid bg-transparent pt-2 pb-4">
                        <div class="container">
                            <h1 class="display-1">WATBOOK <span class="h1">by</span> <img width="200" alt="waterair logo" src={ bigLogo } /></h1>
                            <p class="lead">Application back-office pour l'application support de vente WATERAIR à destination des réseaux commerciaux</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div id="tiles-grid" class="mb-4">
                        <a id="tile-parcours" href="/" class="card mb-0 text-body user-select-none custom-card-link shadow">
                            <div class="card-body">
                                <h3><i class="nav-icon fas fa-handshake"></i> Parcours de vente</h3>
                                <p class="card-text">Gérer les différents parcours en fonction du marché et du partenaire.</p>
                            </div>
                        </a>
                        <a id="tile-ged" href="/" class="card mb-0 text-body user-select-none custom-card-link shadow">
                            <div class="card-body">
                                <h3><i class="nav-icon fas fa-folder-open"></i> Documents & photothèque</h3>
                                <p class="card-text">Explorer et gérer les documents et assets associés à l'expérience WATBOOK.</p>
                            </div>
                        </a>
                        <div id="tile-catalog" class="card mb-0 shadow">
                            <div class="card-body">
                                <h3><i class="nav-icon fas fa-swimming-pool"></i> Produits</h3>
                                <p class="card-text">Gérer le catalogue produits et les tarifs.</p>
                            </div>
                            <div class="list-group list-group-flush">
                                <a href="/" class="list-group-item list-group-item-action">Catégories</a>
                                <a href="/" class="list-group-item list-group-item-action">Fiches produit</a>
                                <a href="/" class="list-group-item list-group-item-action">Prix de vente conseillé</a>
                                <a href="/" class="list-group-item list-group-item-action">Prix de vente</a>
                                <a href="/" class="list-group-item list-group-item-action">Conversion des devises</a>
                            </div>
                        </div>
                        <div id="tile-config" class="card mb-0 shadow">
                            <div class="card-body">
                                <h3><i class="nav-icon fas fa-th"></i> Configuration</h3>
                                <p class="card-text">Paramètrage de la solution de vente WATBOOK.</p>
                            </div>
                            <div class="list-group list-group-flush">
                                <a href="/" class="list-group-item list-group-item-action">Partenaires</a>
                                <a href="/" class="list-group-item list-group-item-action">Pays</a>
                                <a href="/" class="list-group-item list-group-item-action">Langues</a>
                                <a href="/" class="list-group-item list-group-item-action">TVA</a>
                                <a href="/" class="list-group-item list-group-item-action">Devises</a>
                                <a href="/" class="list-group-item list-group-item-action">Délais de livraison</a>
                                <a href="/" class="list-group-item list-group-item-action">Kits et paiement</a>
                                <a href="/" class="list-group-item list-group-item-action">Traductions IHM</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    #tiles-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto auto;
        gap: 2rem;
    }
    #tile-parcours {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }
    #tile-ged {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }
    #tile-catalog {
        grid-column: 2 / 3;
        grid-row: 1 / 3;
    }
    #tile-config {
        grid-column: 3 / 4;
        grid-row: 1 / 3;
    }

    .custom-card-link:hover,
    .custom-card-link:active {
        background-color: #f8f9fa;
    }
</style>