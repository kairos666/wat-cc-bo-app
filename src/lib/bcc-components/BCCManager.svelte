<script lang="ts">
    import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@rgossiaux/svelte-headlessui";
    import { bccDelete, bccDuplicate, bccEnrichAction, bccModelizeAction, getAllBccs, getActiveBcc, getLoadedBcc, type BccMetaData } from "../../stores/bcc-store";
    import DialogCreateBcc from "$lib/bcc-components/DialogCreateBCC.svelte";
    import { format } from "date-fns";

    let createBccDialog:any;
    let activeBCC:BccMetaData|null = null;
    let loadedBCC:BccMetaData|null = null;
    let allNonArchived:BccMetaData[] = [];
    let allArchived:BccMetaData[] = [];

    $: if($getActiveBcc) { activeBCC = $getActiveBcc ?? null }
    $: if($getLoadedBcc) { loadedBCC = $getLoadedBcc ?? null }
    $: if($getAllBccs) { 
        allNonArchived = $getAllBccs.filter(bcc => bcc.state !== "archivé").sort((a, b) => (a.created > b.created) ? -1 : (a.created < b.created) ? 1 : 0);
        allArchived = $getAllBccs.filter(bcc => bcc.state === "archivé").sort((a, b) => (a.created > b.created) ? -1 : (a.created < b.created) ? 1 : 0);
    }
</script>

<article id="BCCManager" class="mb-4">
    <section id="BCCManager_LoadedBCC">
        <h2 class="mb-3">BCC chargé</h2>
        {#if loadedBCC}
        <div class="info-box bg-info">
            <span class="info-box-icon"><i class="fas fa-download"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">{ loadedBCC.name } (#{ loadedBCC.id })</span>
                <span class="info-box-number">créé le { loadedBCC.created }</span>
                <span class="info-box-number">données SAP { loadedBCC.extractedSapData }</span>
            </div>
        </div>
        {:else}
        <figure class="emptyBccContainer rounded bg-white p-3 mb-0">
            <figcaption>Aucun BCC chargé dans CONFCOM</figcaption>
        </figure>
        {/if}
    </section>
    <section id="BCCManager_ActiveBCC">
        <h2 class="mb-3">BCC actif</h2>
        {#if activeBCC}
        <div class="info-box bg-success">
            <span class="info-box-icon"><i class="fab fa-creative-commons"></i></span>
            <div class="info-box-content">
                <span class="info-box-text">{ activeBCC.name } (#{ activeBCC.id })</span>
                <span class="info-box-number">créé le { format(new Date(activeBCC.created), "dd/MM/yyyy HH:mm") }</span>
                <span class="info-box-number">données SAP { format(new Date(activeBCC.extractedSapData), "dd/MM/yyyy HH:mm") }</span>
                {#if activeBCC.activated}<span class="info-box-number">activé le { format(new Date(activeBCC.activated), "dd/MM/yyyy HH:mm") }</span>{/if}
            </div>
        </div>
        {:else}
        <figure class="emptyBccContainer rounded bg-white p-3 mb-0">
            <figcaption>Aucun BCC actif dans NEW WATBOOK</figcaption>
        </figure>
        {/if}
    </section>
    <section id="BCCManager_AllBCC">
        <TabGroup class="TabGroup">
            <TabList class="TabList px-3 pb-3">
                <Tab class={ ({selected}) => selected ? "btn btn-primary" : "btn btn-outline-primary" }>Liste des BCC disponibles</Tab>
                <Tab class={ ({selected}) => selected ? "btn btn-primary" : "btn btn-outline-primary" }>Liste des BCC archivés</Tab>
            </TabList>
            <TabPanels class="TabPanels rounded bg-white p-3">
                <TabPanel>
                    {#if allNonArchived.length === 0}
                    <div class="alert alert-light mb-0" role="alert">
                        <h4 class="alert-heading">Aucun BCC</h4>
                        <p>Commencez par créer un nouveau jeu de données.</p>
                        <hr>
                        <button class="btn btn-secondary" on:click={ () => createBccDialog.triggerOpenDialog() }><i class="fas fa-plus pr-2"></i>Créer un nouveau BCC (extraction SAP)</button>
                    </div>
                    {:else}
                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom du BCC</th>
                                <th scope="col">Statut</th>
                                <th scope="col">Crée le</th>
                                <th scope="col">données SAP</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each allNonArchived as bcc}
                            <tr>
                                <th scope="row">{ bcc.id }</th>
                                <td>{ bcc.name }</td>
                                <td>{#if bcc.state === "actif"}<span class="badge badge-success">{ bcc.state }</span>{:else}<span class="badge badge-light">{ bcc.state }</span>{/if} {#if bcc.isWorkingInstance}<span class="badge badge-info">Chargé</span>{/if}</td>
                                <td>{ format(new Date(bcc.created), "dd/MM/yyyy HH:mm") }</td>
                                <td>{ format(new Date(bcc.extractedSapData), "dd/MM/yyyy HH:mm") }</td>
                                <td>
                                    <menu class="BCCRowActions">
                                        <button class="btn btn-danger btn-sm" on:click={ () => bccDelete(bcc.id) }>Supprimer</button>
                                        <button class="btn btn-light btn-sm" on:click={ () => bccDuplicate(`clone de ${ bcc.name }`, bcc.id) }>Dupliquer</button>
                                        <button class="btn btn-success btn-sm" on:click={ () => bccModelizeAction(bcc.id) }>Modéliser</button>
                                        <button class="btn btn-success btn-sm" on:click={ () => bccEnrichAction(bcc.id) }>Enrichir</button>
                                    </menu>
                                </td>
                            </tr>
                            {/each}
                        </tbody>
                    </table>
                    {/if}
                </TabPanel>
                <TabPanel>
                    {#if allArchived.length === 0}
                    <div class="alert alert-light mb-0" role="alert">
                        <h4 class="alert-heading">Aucun BCC archivé</h4>
                    </div>
                    {:else}
                    <table class="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom du BCC</th>
                                <th scope="col">Statut</th>
                                <th scope="col">Crée le</th>
                                <th scope="col">données SAP</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each allArchived as bcc}
                            <tr>
                                <th scope="row">{ bcc.id }</th>
                                <td>{ bcc.name }</td>
                                <td><span class="badge badge-dark">{ bcc.state }</span></td>
                                <td>{ format(new Date(bcc.created), "dd/MM/yyyy HH:mm") }</td>
                                <td>{ format(new Date(bcc.extractedSapData), "dd/MM/yyyy HH:mm") }</td>
                                <td>
                                    <menu class="BCCRowActions">
                                        <button class="btn btn-warning btn-sm">Sortir de l'archive</button>
                                    </menu>
                                </td>
                            </tr>
                            {/each}
                        </tbody>
                    </table>
                    {/if}
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </section>
    <footer id="BCCManager_Footer">
        <button class="btn btn-outline-success btn-lg" on:click={ () => createBccDialog.triggerOpenDialog() }><i class="fas fa-plus pr-2"></i>Créer un nouveau BCC (extraction SAP)</button>
    </footer>
</article>
<DialogCreateBcc bind:this={ createBccDialog } />

<style lang="scss">
    #BCCManager {
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: 
            "loaded-bcc active-bcc"
            "all-bcc all-bcc"
            ". actions-bcc";
        gap: 1rem;
        align-content: stretch;

        #BCCManager_LoadedBCC { grid-area: loaded-bcc; }
        #BCCManager_ActiveBCC { grid-area: active-bcc; }
        #BCCManager_AllBCC { grid-area: all-bcc; }
        #BCCManager_Footer { grid-area: actions-bcc; justify-self: end; }
    }

    .emptyBccContainer {
        display: flex;
        justify-content: center;
        align-items: center;

        figcaption {
            text-align: center;
            width:80%;
            min-width:300px;
        }
    }

    .BCCRowActions {
        display: flex;
        gap:0.5rem;
        margin-block: 0;
        padding-inline-start: 0;
    }

    .table > tbody > tr > td {
        vertical-align: middle;
    }
</style>