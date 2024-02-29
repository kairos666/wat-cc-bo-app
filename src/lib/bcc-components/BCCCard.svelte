<script lang="ts">
    import type { BccState } from "../../stores/bcc-store";

    export let name:string
    export let state:BccState;
    export let isWorkInstance:boolean = false;
    export let isLoading:boolean = false;
    export let created:string
    export let extractSAP:string
    export let activated:string|null = null;

    let hasTest:string|null;
    let hasEdit:string|null;
    let hasClone:string|null;
    let hasDelete:string|null;
    let hasModel:string|null;
    let hasActivate:string|null;
    let hasLoadAsWorkInstance:string|null;
    let badgeColorString:'badge-warning'|'badge-success'|'badge-light';
    $: {
        switch(true) {
            case (state === 'initié' && isWorkInstance):
            hasTest = hasActivate = hasClone = hasLoadAsWorkInstance = null;
            hasEdit = "Filtrer et typer";
            hasModel = "Modéliser";
            hasDelete = "Supprimer";
            break;

            case (state === 'nettoyé & typé' && isWorkInstance):
            hasTest = hasActivate = hasClone = hasLoadAsWorkInstance = null;
            hasEdit = "Filtrer et typer";
            hasModel = "Modéliser";
            hasDelete = "Supprimer";
            break;

            case (state === 'modélisé' && isWorkInstance):
            hasTest = hasActivate = hasModel = hasLoadAsWorkInstance = null;
            hasEdit = "Enrichir";
            hasClone = "Dupliquer";
            hasDelete = "Supprimer";
            break;

            case (state === 'prêt' && isWorkInstance):
            hasModel = hasLoadAsWorkInstance = null;
            hasTest = "Tester";
            hasEdit = "Enrichir";
            hasClone = "Dupliquer";
            hasDelete = "Supprimer";
            hasActivate = "Activer";
            break;

            case (state === 'actif' && isWorkInstance):
            hasActivate = hasModel = hasEdit = hasDelete = hasLoadAsWorkInstance = null;
            hasTest = "Tester";
            hasClone = "Dupliquer";
            break;

            case (state === 'archivé' && isWorkInstance):
            hasActivate = hasModel = hasEdit = hasDelete = hasLoadAsWorkInstance = null;
            hasTest = "Tester";
            hasClone = "Dupliquer";
            break;

            default:
                hasActivate = hasModel = hasEdit = hasDelete = hasTest = hasClone = null;
                hasLoadAsWorkInstance = "Charger";
        }

        switch(state) {
            case 'initié': badgeColorString = 'badge-light'; break;
            case 'nettoyé & typé': badgeColorString = (isLoading) ? 'badge-light' : 'badge-warning'; break;
            case 'modélisé': badgeColorString = 'badge-light'; break;
            case 'prêt': badgeColorString = 'badge-success'; break;
            case 'actif': badgeColorString = 'badge-light'; break;
            case 'archivé': badgeColorString = 'badge-light'; break;
        }
    }
</script>

<div class="card" class:card-success={ state === 'actif' || state === 'prêt' } class:card-outline={ state === 'prêt' } class:card-secondary={ state === "archivé" }>
    <div class="card-header">
        <h3 class="card-title">{ name }</h3>
        <div class="card-tools">
            {#if isWorkInstance}<span class="badge badge-primary">chargé</span>{/if}
            <span class={ `badge ${ badgeColorString }` }>{ state }</span>
        </div>
    </div>
    <div class="card-body">
        <dl style:font-size="0.9em">
            <dt>Date de création</dt><dd>{ created }</dd>
            <dt>Date d'extraction SAP</dt><dd>{ extractSAP }</dd>
            {#if activated}<dt>Date d'activation CONFCOM</dt><dd>{ activated }</dd>{/if}
        </dl>
        {#if (state === "nettoyé & typé" && !isLoading)}<p class="alert alert-warning" role="alert">Seuls 97% des données ont pu être traitées<br />Complétez les filtres et types et réessayez de modéliser.</p>{/if}
    </div>
    {#if !isLoading}
    <div class="card-footer">
        {#if hasLoadAsWorkInstance}<button type="button" class="btn btn-outline-primary btn-sm">{ hasLoadAsWorkInstance }</button>{/if}
        {#if hasModel}<button type="button" class="btn btn-outline-success btn-sm">{ hasModel }</button>{/if}
        {#if hasActivate}<button type="button" class="btn btn-outline-success btn-sm">{ hasActivate }</button>{/if}
        {#if hasTest}<a href="/#" class="btn btn-light btn-sm" role="button">{ hasTest }</a>{/if}
        {#if hasEdit}<a href="/#" class="btn btn-light btn-sm" role="button">{ hasEdit }</a>{/if}
        {#if hasClone}<button type="button" class="btn btn-light btn-sm">{ hasClone }</button>{/if}
        {#if hasDelete}<button type="button" class="btn btn-outline-danger btn-sm">{ hasDelete }</button>{/if}
    </div>
    {:else}
    <div class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
    {/if}
</div>

<style lang="scss">
    .card {
        margin-block-end: 0;
        height:100%;
    }

    .card-footer {
        display:flex;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        gap:0.5rem;
    }
</style>