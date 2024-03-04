<script lang="ts">
    import type { BccMetaData } from "../../stores/bcc-store";
    import { BccSubject, bccActionsAbility, type BccActions } from "../../utils/casl-abilities";

    export let targetBCC:BccMetaData|null;
    export let allActions:{ action:BccActions, cb: (targetBcc:BccMetaData) => void }[];
    const configMap = new Map<string, { classes: string, label:string }>([
        ['delete', { classes: 'btn btn-danger btn-sm', label: 'Supprimer' }],
        ['clone', { classes: 'btn btn-light btn-sm', label: 'Dupliquer' }],
        ['filter & type', { classes: 'btn btn-light btn-sm', label: 'Filtrer et typer' }],
        ['enrich', { classes: 'btn btn-outline-success btn-sm', label: 'Valider enrichissement' }],
        ['test', { classes: 'btn btn-light btn-sm', label: 'Tester' }],
        ['modelize', { classes: 'btn btn-outline-success btn-sm', label: 'Modéliser' }],
        ['archive', { classes: 'btn btn-dark btn-sm', label: 'Archiver' }],
        ['unarchive', { classes: 'btn btn-primary btn-sm', label: 'Sortir de l\'archive' }],
        ['load', { classes: 'btn btn-primary btn-sm', label: 'Charger' }],
        ['activate', { classes: 'btn btn-success btn-sm', label: 'Activer' }]
    ])
    let possibleActions:{ action:BccActions, cb:Function }[] = [];

    $: { 
        switch(true) {
            case (targetBCC !== null):
                const testedBcc:BccMetaData = targetBCC;
                possibleActions = allActions.reduce((authorizedActionsObj, actionObj) => {
                    if(bccActionsAbility.can(actionObj.action, new BccSubject(testedBcc.state, testedBcc.isWorkingInstance, testedBcc.isArchived))) {
                        return [...authorizedActionsObj, actionObj];
                    } else {
                        return authorizedActionsObj;
                    }
                }, ([] as { action:BccActions, cb:Function }[]));
                break;
            default:
                possibleActions = [];
        }
    }
</script>

{#if (possibleActions.length !== 0)}
    <menu class="BCCRowActions">
        {#each possibleActions as actionObj}
        <button class={ configMap.get(actionObj.action)?.classes } on:click={ () => actionObj.cb(targetBCC) }>{ configMap.get(actionObj.action)?.label }</button>
        {/each}
    </menu>
{/if}

<style lang="scss">
    .BCCRowActions {
        display: flex;
        gap:0.5rem;
        margin-block: 0;
        padding-inline-start: 0;
    }
</style>