<script lang="ts">
    export let name:string
    export let state:'initié'|'nettoyé & typé'|'modélisé'|'enrichi'|'validé'|'actif'|'archivé';
    export let isLoading:boolean = false;
    export let created:string
    export let extractSAP:string
    export let activated:string|null = null;

    let hasTest:boolean;
    let hasEdit:boolean;
    let hasClone:boolean;
    let hasDelete:boolean;
    let hasModel:boolean;
    let hasValidate:boolean;
    let hasActivate:boolean;
    let hasRollback:boolean;
    $: {
        switch(state) {
            case 'initié':
            hasTest = hasValidate = hasActivate = hasRollback = false;
            hasEdit = hasClone = hasModel = hasDelete = true;
            break;

            case 'nettoyé & typé':
            hasTest = hasValidate = hasActivate = hasRollback = hasClone = false;
            hasEdit = hasModel = hasDelete = true;
            break;

            case 'modélisé':
            hasTest = hasValidate = hasActivate = hasRollback = hasModel = false;
            hasEdit = hasClone = hasDelete = true;
            break;

            case 'enrichi':
            hasActivate = hasRollback = hasModel = false;
            hasValidate = hasTest = hasEdit = hasClone = hasDelete = true;
            break;

            case 'validé':
            hasValidate = hasRollback = hasModel = hasEdit = false;
            hasActivate = hasTest = hasClone = hasDelete = true;
            break;

            case 'actif':
            hasActivate = hasValidate = hasRollback = hasModel = hasEdit = hasDelete = false;
            hasTest = hasClone = true;
            break;

            case 'archivé':
            hasActivate = hasValidate = hasModel = hasEdit = hasDelete = false;
            hasRollback = hasTest = hasClone = true;
            break;
        }
    }
</script>

<div class="card" class:card-success={ state === 'actif' || state === 'validé' } class:card-outline={ state === 'validé' } class:card-secondary={ state === "archivé" }>
    <div class="card-header">
        <h3 class="card-title">{ name }</h3>
        <div class="card-tools">
            <span class={ (state === "nettoyé & typé" && !isLoading) ? "badge badge-warning" : "badge badge-light" }>{ state }</span>
        </div>
    </div>
    <div class="card-body">
        <dl style:font-size="0.9em">
            <dt>Date de création</dt><dd>{ created }</dd>
            <dt>Date d'extraction SAP</dt><dd>{ extractSAP }</dd>
            {#if activated}<dt>Date d'activation CONFCOM</dt><dd>{ activated }</dd>{/if}
        </dl>
        {#if (state === "nettoyé & typé" && !isLoading)}<p class="alert alert-warning" role="alert">Une erreur s'est produite lors de la modélisation.<br />Vérifiez les filtres et types et réessayez de modéliser.</p>{/if}
    </div>
    {#if !isLoading}
    <div class="card-footer">
        {#if hasModel}<button type="button" class="btn btn-outline-success btn-sm">Modéliser</button>{/if}
        {#if hasValidate}<button type="button" class="btn btn-outline-success btn-sm">Valider</button>{/if}
        {#if hasActivate}<button type="button" class="btn btn-outline-success btn-sm">Remplacer actif</button>{/if}
        {#if hasRollback}<button type="button" class="btn btn-outline-warning btn-sm">Rollback</button>{/if}
        {#if hasEdit}<a href="/#" class="btn btn-light btn-sm" role="button">Modifier</a>{/if}
        {#if hasTest}<a href="/#" class="btn btn-light btn-sm" role="button">Tester</a>{/if}
        {#if hasClone}<button type="button" class="btn btn-light btn-sm">Cloner</button>{/if}
        {#if hasDelete}<button type="button" class="btn btn-outline-danger btn-sm">Supprimer</button>{/if}
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