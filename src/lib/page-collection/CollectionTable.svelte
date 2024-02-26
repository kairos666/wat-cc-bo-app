<script lang="ts">
    import CollectionFooter from "./CollectionFooter.svelte";

    export let data:any[];
    export let columnsProperties:{ colLabel:string, propertyName:string , valueTransformer?: Function }[];
    export let hasRowSelectors:boolean = false;
    let paginatedData:any[];
    let pageCount:number = 10;
    let pageIndex:number = 0;

    $: paginatedData = data.slice(pageIndex * pageCount, pageIndex * pageCount + pageCount);
</script>

<div class="card">
    <div class="card-body">
        <table class="table dataTable">
            <thead>
                <tr>
                    {#if hasRowSelectors}
                    <th rowspan="1" colspan="1" aria-sort="ascending" scope="col" style="width:20px;" class="m-0 pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBoxAll" value="selectAll">
                            <label class="form-check-label sr-only" for="selectBoxAll">Tout sélectionner</label>
                        </div>    
                    </th>
                    {/if}
                    {#each columnsProperties as columnProperty}
                    <th scope="col" tabindex="0" rowspan="1" colspan="1" >{ columnProperty.colLabel }</th>
                    {/each}
                    <th scope="col" tabindex="0" rowspan="1" colspan="1" style="width:180px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each paginatedData as item}
                <tr>
                    {#if hasRowSelectors}
                    <td class="pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBox1" value="select1">
                            <label class="form-check-label sr-only" for="selectBox1"><span class="sr-only">Sélectionner</span></label>
                        </div>    
                    </td>
                    {/if}
                    {#each columnsProperties as columnProperty}
                    <td>{ (columnProperty?.valueTransformer) ? columnProperty?.valueTransformer(item[columnProperty.propertyName]) : item[columnProperty.propertyName] }</td>
                    {/each}
                    <td>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-eye"></i><span class="sr-only"> Voir fiche détaillée</span></button>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pen"></i><span class="sr-only"> Éditer</span></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i><span class="sr-only"> Supprimer</span></button>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <CollectionFooter 
        index={ pageIndex } 
        length={ data.length } 
        currentPageCount={ pageCount } 
        pageCountValues={ [10, 25, 50, 100] } 
        on:pageCountChange={ evt => { pageCount = evt.detail } }
        on:pageIndexChange={ evt => { pageIndex = evt.detail } }
    />
</div>