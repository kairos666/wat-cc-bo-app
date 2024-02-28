<script lang="ts">
    import BccCard from "$lib/bcc-components/BCCCard.svelte";

    const bccData:any[] = [
        { state:"actif", name: "BCC printemps 2024", created: "27/11/2023 11:23", extractSAP: "24/11/2023 02:01", activated: "05/01/2024 17:25", isLoading: false, isWorkInstance: true },
        { state:"initié", name:"Nouveau BCC", created: "28/02/2024 11:23", extractSAP: "24/11/2023 02:01", isLoading: false, isWorkInstance: true },
        { state:"nettoyé & typé", name:"BCC printemps 2025 bis", created: "27/01/2024 15:01", extractSAP: "24/11/2023 02:01", isLoading: true, isWorkInstance: true },
        { state:"nettoyé & typé", name:"BCC printemps 2025", created: "27/01/2024 15:01", extractSAP: "24/11/2023 02:01", isLoading: false, isWorkInstance: true },
        { state:"modélisé", name:"BCC printemps 2025 alternative", created: "02/06/2023 11:23", extractSAP: "24/02/2023 04:30", isLoading: false, isWorkInstance: true },
        { state:"prêt", name:"BCC hiver 2024", created: "02/06/2023 11:23", extractSAP: "24/02/2023 04:30", isLoading: false, isWorkInstance: true },
        // { state:"validé", name:"BCC printemps 2024 bis", created: "02/08/2023 11:23", extractSAP: "24/02/2023 04:30", isLoading: false, isWorkInstance: true },
        { state:"archivé", name:"BCC hiver 2023", created: "22/03/2023 11:23", extractSAP: "24/11/2022 02:01", isLoading: false, isWorkInstance: true },
        // { state:"actif", name: "BCC printemps 2024", created: "27/11/2023 11:23", extractSAP: "24/11/2023 02:01", activated: "05/01/2024 17:25", isLoading: false, isWorkInstance: true },
        // { state:"initié", name:"BCC printemps 2024", created: "28/02/2024 11:23", extractSAP: "24/11/2023 02:01", isLoading: false, isWorkInstance: true },
        // { state:"nettoyé & typé", name:"BCC printemps 2024", created: "27/01/2024 15:01", extractSAP: "24/11/2023 02:01", isLoading: true, isWorkInstance: true },
        // { state:"nettoyé & typé", name:"BCC printemps 2024", created: "27/01/2024 15:01", extractSAP: "24/11/2023 02:01", isLoading: false, isWorkInstance: true },
        // { state:"prêt", name:"BCC printemps 2024", created: "02/06/2023 11:23", extractSAP: "24/02/2023 04:30", isLoading: false, isWorkInstance: true },
        // { state:"enrichi", name:"BCC printemps 2024", created: "02/06/2023 11:23", extractSAP: "24/02/2023 04:30", isLoading: false, isWorkInstance: true },
        // { state:"validé", name:"BCC printemps 2024", created: "02/08/2023 11:23", extractSAP: "24/02/2023 04:30", isLoading: false, isWorkInstance: true },
        // { state:"archivé", name:"BCC printemps 2024", created: "22/03/2023 11:23", extractSAP: "24/11/2022 02:01", isLoading: false, isWorkInstance: true },
    ]
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
                    <div class="BCCMainBox">
                        <h4>BCC version active</h4>
                        {#each bccData.filter(bcc => (bcc.state === "actif")) as bcc}
                        <BccCard state={ bcc.state } name={ bcc.name } created={ bcc.created } extractSAP={ bcc.extractSAP } activated={ bcc.activated } isLoading={ bcc.isLoading } isWorkInstance={ bcc.isWorkInstance }/>
                        {/each}
                        <h4 class="mt-4">BCC version précédente</h4>
                        {#each bccData.filter(bcc => (bcc.state === "archivé")) as bcc}
                        <BccCard state={ bcc.state } name={ bcc.name } created={ bcc.created } extractSAP={ bcc.extractSAP } isLoading={ bcc.isLoading } isWorkInstance={ bcc.isWorkInstance }/>
                        {/each}
                    </div>
                </div>
                <div class="col-lg-9">
                    <h4 class="mt-2">BCC en cours d'élaboration</h4>
                    <ul class="BCCLayout">
                        {#each bccData.filter(bcc => (bcc.state !== "actif" && bcc.state !== "archivé")) as bcc}
                        <li><BccCard state={ bcc.state } name={ bcc.name } created={ bcc.created } extractSAP={ bcc.extractSAP } isLoading={ bcc.isLoading } isWorkInstance={ bcc.isWorkInstance }/></li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .BCCMainBox {
        padding:0.75rem;
        background-color: white;
        border-radius: 0.25rem;
        margin-inline-end: 1rem;
    }
    .BCCLayout {
        padding-inline-start: 0;
        margin-block-end: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(auto-fill, auto);
        align-items: stretch;
        gap: 1rem;
        > li { 
            list-style: none; 
        }
    }
</style>
