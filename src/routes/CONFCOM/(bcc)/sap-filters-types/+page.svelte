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
                    <div class="card card-outline card-warning">
                        <div class="card-header">
                            <h2 class="card-title mt-1"><b>Typage et filtrage d'articles</b></h2>
                            <div class="card-tools">
                                <button type="button" class="btn btn-info btn-sm">Exporter CSV</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>Mettre à jour la configuration des filtres d'exclusion et types assignés sur l'inventaire d'articles SAP. Seules les deux colonnes décrites ci-dessous sont à modifier, les autres informations servent à identifier les articles mentionnés.</p>
                            <ul>
                                <li>Colonne <span class="badge badge-secondary">EXCLURE</span> : 0 = conserver (par défaut) ou 1 = exclure</li>
                                <li>Colonne <span class="badge badge-secondary">TYPE</span> : <span class="badge badge-light">profil de fond</span>, <span class="badge badge-light">escalier</span>, <span class="badge badge-light">échelle</span>, <span class="badge badge-light">banc immergé</span>, <span class="badge badge-light">liner</span>, <span class="badge badge-light">local technique</span>, <span class="badge badge-light">média filtrant</span>, <span class="badge badge-light">traitement</span>, <span class="badge badge-light">électrolyseur</span>, <span class="badge badge-light">régulateur PH</span>, <span class="badge badge-light">couvertures</span>, <span class="badge badge-light">pitons</span>, <span class="badge badge-light">enrouleur motorisé</span>, <span class="badge badge-light">enrouleur</span>, <span class="badge badge-light">margelle</span>, <span class="badge badge-light">éclairage</span>, <span class="badge badge-light">accessoire</span>, <span class="badge badge-light">prestation</span>, <span class="badge badge-light">produit racine</span></li>
                            </ul>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <label for="updated-articles-inventory-config">Mise à jour de la configuration d'articles</label>
                                    <input type="file" class="form-control-file" id="updated-articles-inventory-config" accept=".csv" />
                                </div>
                                <button disabled type="submit" class="btn btn-warning">Importer CSV</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 mt-4">
                    <div class="card card-outline card-warning">
                        <div class="card-header">
                            <h2 class="card-title mt-1"><b>Filtrage des valeurs de caractéristiques</b></h2>
                            <div class="card-tools">
                                <button type="button" class="btn btn-info btn-sm">Exporter CSV</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>Mettre à jour la configuration des filtres d'exclusion de valeurs de caractéristiques. Seule la colonne <span class="badge badge-secondary badge-sm">EXCLURE</span> est à modifier, les autres informations servent à identifier les caractéristiques et valeurs mentionnées.</p>
                            <p>Colonne <span class="badge badge-secondary">EXCLURE</span> : 0 = conserver (par défaut) ou 1 = exclure</p>
                            <p>Une caractéristique ayant toutes ses valeurs exclues sera elle-même exclus</p>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <label for="updated-caracs-inventory-config">Mise à jour de la configuration d'articles</label>
                                    <input type="file" class="form-control-file" id="updated-caracs-inventory-config" accept=".csv" />
                                </div>
                                <button disabled type="submit" class="btn btn-warning">Importer CSV</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
