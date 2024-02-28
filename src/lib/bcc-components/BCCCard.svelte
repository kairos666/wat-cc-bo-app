<script lang="ts">
    export let name:string
    export let state:'initié'|'nettoyé & typé'|'enrichi'|'validé'|'actif'|'archivé';

    let hasTestLink:boolean;
    let hasEditLink:boolean;
    let hasActivateBtn:boolean;
    let hasRollbackBtn:boolean;
    let hasActivationDate:boolean;
    $: {
        hasTestLink = (state === "actif" || state === "validé");
        hasEditLink = (state === "initié" || state === "nettoyé & typé" || state === "enrichi");
        hasActivateBtn = (state === "validé");
        hasRollbackBtn = (state === "archivé");
        hasActivationDate = (state === "actif");
    }
</script>

<div class="card" class:card-success={ state === 'actif' || state === 'validé' } class:card-outline={ state === 'validé' } class:card-secondary={ state === "archivé" }>
    <div class="card-header">
        <h3 class="card-title">{ name }</h3>
        <div class="card-tools">
            <span class="badge badge-light">{ state }</span>
        </div>
    </div>
    <div class="card-body">
        <dl style:font-size="0.9em">
            <dt>Date de création</dt><dd>27/11/2023 11:23</dd>
            <dt>Date d'extraction SAP</dt><dd>24/11/2023 02:01</dd>
            {#if hasActivationDate}<dt>Date d'activation CONFCOM</dt><dd>05/01/2024 17:25</dd>{/if}
        </dl>
    </div>
    <div class="card-footer">
        {#if hasActivateBtn}<button type="button" class="btn btn-outline-success btn-sm">Remplacer actif</button>{/if}
        {#if hasRollbackBtn}<button type="button" class="btn btn-outline-warning btn-sm">Rollback</button>{/if}
        {#if hasEditLink}<a href="/#" class="btn btn-light btn-sm" role="button">Modifier</a>{/if}
        {#if hasTestLink}<a href="/#" class="btn btn-light btn-sm" role="button">Tester</a>{/if}
        <button type="button" class="btn btn-light btn-sm">Cloner</button>
    </div>
</div>

<style lang="scss">
    .card {
        margin-block-end: 0;
    }

    .card-footer {
        display:flex;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        gap:0.5rem;
    }
</style>