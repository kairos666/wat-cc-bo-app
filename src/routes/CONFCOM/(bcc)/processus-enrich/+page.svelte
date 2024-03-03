<svelte:head>
	<title>CONFCOM - Valider enrichissement BCC</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Valider enrichissement BCC</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/CONFCOM">Accueil</a></li>
                        <li class="breadcrumb-item active">Valider BCC</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <p>Déclencher le processus de validation du BCC complet. Transition de l'état "modélisé" à "prêt"</p>
                    <p>En cas de succès, le BCC est <i>techniquement</i> complet et donc prêt à passer à l'état actif, attention toute modification le fera repasser à l'état "modélisé" jusqu'à ce qu'une nouvelle validation réussie soit faite.</p>
                    <p>En cas d'échec un rapport d'erreur indique ce qui pose problème dans l'enrichissement</p>
                    <div class="alert alert-warning" role="alert">A spécifier TODO</div>
                </div>
            </div>
        </div>
    </div>
</div>
