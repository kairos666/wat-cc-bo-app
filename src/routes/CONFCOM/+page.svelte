<script lang="ts">
    import DialogCreateBcc from "$lib/bcc-components/DialogCreateBCC.svelte";
    import { bccDelete, bccDuplicate, bccEnrichAction, bccModelizeAction, getAllBccs } from "../../stores/bcc-store";
    

    let createBccDialog:any;
</script>
<svelte:head>
	<title>CONFCOM - Accueil</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Accueil CONFCOM</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item active">Accueil</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <ol>
                        {#each $getAllBccs ?? [] as bcc}
                        <li>
                            <p>{ bcc.name } | { bcc.state } | { bcc.created }</p>
                            <button on:click={ () => bccDelete(bcc.id) }>supprimer</button>
                            <button on:click={ () => bccDuplicate(`clone de ${ bcc.name }`, bcc.id) }>dupliquer</button>
                            <button on:click={ () => bccModelizeAction(bcc.id) }>modéliser</button>
                            <button on:click={ () => bccEnrichAction(bcc.id) }>enrichir</button>
                        </li>
                        {:else}
                        <li>no bcc</li>                          
                        {/each}
                    </ol>
                    <button on:click={ () => createBccDialog.triggerOpenDialog() }>create BCC</button>
                </div>
            </div>
        </div>
    </div>
</div>
<DialogCreateBcc bind:this={ createBccDialog } />
