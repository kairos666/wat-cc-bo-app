<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let index:number;
    export let length:number;
    export let currentPageCount:number;
    export let pageCountValues:number[];
    let startIndex:number;
    let endIndex:number;
    let maxPageIndex:number;
    let isPreviousActive:boolean;
    let isNextActive:boolean;
    let paginationArr:(number|null)[];
    $: {
        startIndex = 1 + (index * currentPageCount);
        endIndex = Math.min(currentPageCount + (index * currentPageCount), length);
        maxPageIndex = Math.ceil(length / currentPageCount);
        isPreviousActive = (index > 0);
        isNextActive = (index + 1 < maxPageIndex);

        switch(true) {
            case (maxPageIndex > 8 && index > 2 && index < maxPageIndex - 2):
                paginationArr = [0, 1, null, index - 2, index - 1, index, index + 1, index + 2, null, maxPageIndex - 1, maxPageIndex];
                break;
            case (maxPageIndex > 8 && index <= 2):
                paginationArr = [0, 1, 2, 3, 4, null, maxPageIndex - 1, maxPageIndex];
                break;
            case (maxPageIndex > 8 && index >= maxPageIndex - 2):
                paginationArr = [0, 1, null, maxPageIndex - 4, maxPageIndex - 3, maxPageIndex - 2, maxPageIndex - 1, maxPageIndex];
                break;
            default:
                paginationArr = new Array(maxPageIndex).fill(null).map((_item, pageIndex) => pageIndex);
        }
    }

    const dispatch = createEventDispatcher();
</script>

<div class="card-footer d-flex  justify-content-between">
    <div class="flex-grow-1 mt-2">
        <p role="status" style="display:inline-block;" class="flex-grow-1 mb-0 mr-5" aria-live="polite">Affichage de { startIndex } à { endIndex } sur { length } entrées</p>
        <label for="itemsShown" class="col-form-label mr-2">Items affichés</label>
        <select id="itemsShown" aria-controls="table" style="max-width:200px;" class="custom-select form-control" bind:value={ currentPageCount } on:change={ () => dispatch('pageCountChange', currentPageCount) }>
            {#each pageCountValues as pageCount}
            <option value={ pageCount }>{ pageCount }</option>
            {/each}
        </select>
    </div>
    <ul class="pagination mt-2 mb-0">
        <li class="page-item" class:disabled={ !isPreviousActive }><a class="page-link" href="/#" on:click|preventDefault={ () => dispatch('pageIndexChange', index - 1) }>Précédent</a></li>
        {#each paginationArr as paginationItem}
            {#if paginationItem !== null}
            <li class="page-item" class:active={ (paginationItem === index) }><a class="page-link" href="/#" on:click|preventDefault={ () => dispatch('pageIndexChange', paginationItem) }>{ paginationItem + 1 }</a></li>
            {:else}
            <li class="page-item"><span class="PageSeparator">...</span></li>
            {/if}
        {/each}
        <li class="page-item" class:disabled={ !isNextActive }><a class="page-link" href="/#" on:click|preventDefault={ () => dispatch('pageIndexChange', index + 1) }>Suivant</a></li>
    </ul>
</div>

<style lang="scss">
    .PageSeparator {
        margin-inline: 0.25rem;
    }
</style>