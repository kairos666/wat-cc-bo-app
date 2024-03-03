<script lang="ts">
    import type { BccState } from "../../stores/bcc-store";

    export let state:BccState; // 'initié'|'nettoyé & typé'|'modélisé'|'prêt'|'actif'
</script>

<ol class="StateWorkflow">
    <li class="StateItem StateItem-initiated" class:StateItem-current={ state === 'initié' }>initié</li>
    <li class="StateTransition"><i class="fas fa-long-arrow-alt-right"></i></li>
    <li class="StateItem StateItem-cleaned" class:StateItem-current={ state === 'nettoyé & typé' }>nettoyé & typé</li>
    <li class="StateTransition"><i class="fas fa-long-arrow-alt-right"></i></li>
    <li class="StateItem StateItem-modeled" class:StateItem-current={ state === 'modélisé' }>modélisé</li>
    <li class="StateTransition"><i class="fas fa-arrows-alt-h"></i></li>
    <li class="StateItem StateItem-ready" class:StateItem-current={ state === 'prêt' }>prêt</li>
    <li class="StateTransition"><i class="fas fa-arrows-alt-h"></i></li>
    <li class="StateItem StateItem-active" class:StateItem-current={ state === 'actif' }>actif</li>
</ol>

<style lang="scss">
    .StateWorkflow {
        margin-block-end: 0;
        padding-inline-start: 0;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;

        > li { list-style: none; }
    }

    .StateItem {
        padding:2px 5px;
        background-color: var(--light);
        border-radius:0.25rem;

        --step-bg-color: var(--secondary);
        &.StateItem-ready { --step-bg-color: var(--teal); }
        &.StateItem-active { --step-bg-color: var(--success); }
        &.StateItem-current { 
            color: var(--white);
            background-color: var(--step-bg-color);
        }
    }
</style>