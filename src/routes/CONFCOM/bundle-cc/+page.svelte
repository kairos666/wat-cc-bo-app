<script>

    import BccCard from "$lib/bcc-components/BCCCard.svelte";

</script>
<svelte:head>
	<title>CONFCOM - BCC</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Bundle configurateur commercial</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/CONFCOM">Accueil</a></li>
                        <li class="breadcrumb-item active">Bundle CC</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content pb-4">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-8">
                    <p>C'est d'ici que vous pouvez piloter la mise à jour des données CONFCOM qui servent de référence pour les différents canaux de vente.<br /> Un seul BCC actif à la fois, si vous poussez une nouvelle version celle-ci devient la version de référence.</p>
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-3">
                    <button type="button" style:width="100%" class="btn btn-outline-success btn-lg"><i class="fas fa-plus pr-2"></i>Créer BCC <br/><small>avec extraction de données SAP</small></button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <h4 class="mt-4">BCC version active</h4>
                    <BccCard state="actif" name="BCC printemps 2024" />
                    <h4 class="mt-4">BCC version précédente</h4>
                    <BccCard state="archivé" name="BCC hiver 2023" />
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-8">
                    <h4 class="mt-4">BCC en cours d'élaboration</h4>
                    <ul class="BCCLayout">
                        <li><BccCard state="initié" name="Nouveau BCC" /></li>
                        <li><BccCard state="nettoyé & typé" name="BCC printemps 2025" /></li>
                        <li><BccCard state="enrichi" name="BCC hiver 2024" /></li>
                        <li><BccCard state="validé" name="BCC printemps 2024 bis" /></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .BCCLayout {
        padding-inline-start: 0;
        margin-block-end: 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(auto-fill, auto);
        gap: 1rem;
        > li { 
            list-style: none; 
        }
    }
</style>
