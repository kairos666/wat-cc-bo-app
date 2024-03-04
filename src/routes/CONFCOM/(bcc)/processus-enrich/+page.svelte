<script lang="ts">
    import { bccEnrichAction, getLoadedBcc, type BccMetaData } from "../../../../stores/bcc-store";
    import { goto } from "$app/navigation";

    let isExecutionInProgress:boolean = false;
    function onEnrichmentCheck() {
        const loadedBCC:BccMetaData|null = $getLoadedBcc ?? null;
        if(!loadedBCC) return;

        isExecutionInProgress = true;
        new Promise(resolve => setTimeout(resolve, 2000)) // mock delay to simulate computing time
            .then(() => { bccEnrichAction(loadedBCC.id) }) // really execute action
            .then(() => { isExecutionInProgress = false })
            .then(() => { goto("/CONFCOM/bcc-report"), { replaceState: true } }) // securely finish to report view (always available in any state)
            .catch(() => { isExecutionInProgress = false });
    }
</script>

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
            <div class="row">
                <div class="col-lg-6">
                    <div class="info-box">
                        <span class="info-box-icon bg-info"><i class="fas fa-cogs"></span>
                        <div class="info-box-content">
                          <h2>Valider BCC</h2>
                          <p>Passer le BCC à l'état prêt si c'est techniquement possible. <br/>Les vérifications sont techniques et non pas métier. Pensez à faire des tests d'un BCC prêt afin de confirmer celui-ci avant de le passer à l'état actif.</p>
                          <button class="btn btn-lg btn-secondary" on:click={ onEnrichmentCheck } disabled={ !$getLoadedBcc || isExecutionInProgress }>Exécuter l'action</button>
                        </div>
                        {#if isExecutionInProgress}
                            <div class="overlay">
                                <i class="fas fa-2x fa-sync-alt fa-spin"></i>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
