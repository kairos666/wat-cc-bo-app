<script lang="ts">
    import { bccModelizeAction, getLoadedBcc, type BccMetaData } from "../../../../stores/bcc-store";
    import { goto } from "$app/navigation";

    let isExecutionInProgress:boolean = false;
    function onModelize() {
        const loadedBCC:BccMetaData|null = $getLoadedBcc ?? null;
        if(!loadedBCC) return;

        isExecutionInProgress = true;
        new Promise(resolve => setTimeout(resolve, 2000)) // mock delay to simulate computing time
            .then(() => { bccModelizeAction(loadedBCC.id) }) // really execute action
            .then(() => { isExecutionInProgress = false })
            .then(() => { goto("/CONFCOM/bcc-report"), { replaceState: true } }) // securely finish to report view (always available in any state)
            .catch(() => { isExecutionInProgress = false });
    }
</script>

<svelte:head>
	<title>CONFCOM - Modéliser BCC</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Modélisation BCC</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/CONFCOM">Accueil</a></li>
                        <li class="breadcrumb-item active">Modélisation BCC</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <p>Déclencher le processus de modélisation du catalogue et des caractéristiques au format cible BCC. Prise en compte des filtres et types défini précédemment.</p>
                    <p>En cas de succès : le bcc passe à l'état modélisé (on ne peut pas revenir en arrière)</p>
                    <p>En cas d'échec : le bcc reste à l'état nettoyé et typé, avec un rapport statistique de l'état de prise en compte des données SAP. Vous pouvez affiner les filtres et types pour retenter une modélisation  réussie.</p>
                    <div class="alert alert-warning" role="alert">A spécifier TODO</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="info-box">
                        <span class="info-box-icon bg-info"><i class="fas fa-cogs"></span>
                        <div class="info-box-content">
                            <h2>Modéliser</h2>
                            <p>Transformer les données SAP en données CONFCOM. <br/>Les filtres d'exclusion et types assignés aux articles sont pris en compte.</p>
                            <button class="btn btn-lg btn-secondary" on:click={ onModelize } disabled={ !$getLoadedBcc || isExecutionInProgress }>Exécuter l'action</button>
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
