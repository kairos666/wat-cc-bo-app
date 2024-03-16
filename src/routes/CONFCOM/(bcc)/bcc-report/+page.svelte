<script>
    import BccReportUnmodelized from "$lib/bcc-reports/BccReportUnmodelized.svelte";
    import { format } from "date-fns";
    import { getLoadedBcc } from "../../../../stores/bcc-store";
</script>

<svelte:head>
	<title>CONFCOM - Rapport</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Rapport</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/CONFCOM">Accueil</a></li>
                        <li class="breadcrumb-item active">Rapport BCC</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            {#if $getLoadedBcc}
            <div class="row">
                <div class="col-lg-6">
                    <div class="info-box bg-info mb-1">
                        <span class="info-box-icon"><i class="fas fa-tools"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-number">{ $getLoadedBcc.name }</span>
                            <span class="info-box-text"><i>état :</i> <span class="badge badge-light">{ $getLoadedBcc.state }</span></span>
                            <span class="info-box-text"><i>créé le :</i> { format(new Date($getLoadedBcc.created), "dd/MM/yyyy HH:mm") }</span>
                            <span class="info-box-text"><i>données SAP :</i> { format(new Date($getLoadedBcc.extractedSapData), "dd/MM/yyyy HH:mm") }</span>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
            {#if ($getLoadedBcc && ($getLoadedBcc.state === "initié" || $getLoadedBcc.state === "nettoyé & typé"))}
            <BccReportUnmodelized />
            {:else if ($getLoadedBcc && ($getLoadedBcc.state === "modélisé" || $getLoadedBcc.state === "prêt" || $getLoadedBcc.state === "actif"))}
            <div class="row">
                <div class="col-lg-12">
                    <p>Rapport BCC modélisé ou prêt ou actif</p>
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>
