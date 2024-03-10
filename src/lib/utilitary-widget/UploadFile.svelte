<script lang="ts">
    import { browser } from '$app/environment';
    import { createEventDispatcher, onMount } from 'svelte';

    export let title:string;
    export let label:string;
    export let hasExportBtn:boolean = false;
    export let isLoading:boolean = false;
    let file:File|null;
    let uuid:string = String(Math.random());
    
    const dispatch = createEventDispatcher();

    function onExport() {
        dispatch('export');
    }

    function onImport(evt:SubmitEvent) {
        evt.preventDefault();
        if(!file) return;

        dispatch('import', file);
    }

    function onFileInInputChange(evt:Event) {
        const files:FileList|null = (evt.currentTarget as HTMLInputElement).files;
        file = (files && files.length === 1) ? files[0] : null;
    }

    onMount(() => {
        if(browser && self.crypto && self.crypto.randomUUID) uuid = self.crypto.randomUUID();
    })
</script>

<div class="card card-outline card-warning">
    <div class="card-header">
        <h2 class="card-title mt-1"><b>{ title }</b></h2>
        {#if hasExportBtn}
        <div class="card-tools">
            <button type="button" on:click={ onExport } class="btn btn-info btn-sm">Exporter CSV</button>
        </div>
        {/if}
    </div>
    <div class="card-body">
        <form on:submit={ onImport }>
            <div class="form-group">
                <label for={ `upload-csv-file-${ uuid }` }>{ label }</label>
                <input type="file" class="form-control-file" id={ `upload-csv-file-${ uuid }` } accept=".csv"  on:change={ onFileInInputChange } />
            </div>
            <button disabled={ !file } type="submit" class="btn btn-warning">Importer CSV</button>
        </form>
    </div>
    {#if isLoading}
    <div class="overlay dark">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
    {/if}
</div>