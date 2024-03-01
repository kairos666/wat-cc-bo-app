<script lang="ts">
    import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@rgossiaux/svelte-headlessui";
    import { bccEnrichAction, bccModelizeAction, getAllBccs, getActiveBcc, getLoadedBcc, type BccMetaData } from "../../stores/bcc-store";
    import DialogCreateBcc from "$lib/bcc-components/DialogCreateBCC.svelte";
    import { format } from "date-fns";
    import DialogDuplicateBcc from "$lib/bcc-components/DialogDuplicateBCC.svelte";
    import DialogDeleteConfirmBcc from "$lib/bcc-components/DialogDeleteConfirmBCC.svelte";
    import DialogArchiveConfirmBcc from "$lib/bcc-components/DialogArchiveConfirmBCC.svelte";
    import DialogUnarchiveConfirmBcc from "$lib/bcc-components/DialogUnarchiveConfirmBCC.svelte";
    import DialogLoadConfirmBcc from "$lib/bcc-components/DialogLoadConfirmBCC.svelte";
    import DialogActivateConfirmBcc from "$lib/bcc-components/DialogActivateConfirmBCC.svelte";
    import BCCActionsMenu from "$lib/bcc-components/BCCActionsMenu.svelte";
    import type { BccActions } from "../../utils/casl-abilities";

    let createBccDialog:any;
    let duplicateBccDialog:any;
    let deleteBccDialog:any;
    let archiveBccDialog:any;
    let unarchiveBccDialog:any;
    let loadBccDialog:any;
    let activateBccDialog:any;
    let activeBCC:BccMetaData|null = null;
    let loadedBCC:BccMetaData|null = null;
    let allNonArchived:BccMetaData[] = [];
    let allArchived:BccMetaData[] = [];
    const allActions:{ action:BccActions, cb: (targetBcc:BccMetaData) => void }[] = [
        { action: 'delete', cb: (targetBcc) => { deleteBccDialog.triggerOpenDialog(targetBcc.id, targetBcc.name) } },
        { action: 'clone', cb: (targetBcc) => { duplicateBccDialog.triggerOpenDialog(targetBcc.id, targetBcc.name) } },
        { action: 'filter & type', cb: (targetBcc) => { console.log('TODO link to filter & type IHM', targetBcc) } },
        { action: 'enrich', cb: (targetBcc) => { console.log('TODO link to enrichir IHM (MOCK for now)', targetBcc); bccEnrichAction(targetBcc.id) } },
        { action: 'test', cb: (targetBcc) => { console.log('TODO link to test IHM', targetBcc) } },
        { action: 'modelize', cb: (targetBcc) => { bccModelizeAction(targetBcc.id) } },
        { action: 'archive', cb: (targetBcc) => { archiveBccDialog.triggerOpenDialog(targetBcc.id, targetBcc.name) } },
        { action: 'unarchive', cb: (targetBcc) => { unarchiveBccDialog.triggerOpenDialog(targetBcc.id, targetBcc.name) } },
        { action: 'load', cb: (targetBcc) => { loadBccDialog.triggerOpenDialog(targetBcc.id, targetBcc.name) } },
        { action: 'activate', cb: (targetBcc) => { activateBccDialog.triggerOpenDialog(targetBcc.id, targetBcc.name) } }
    ];
    const restrictedActions = allActions.filter(actionObj => !['clone', 'enrich', 'filter & type', 'modelize', 'test', 'activate'].includes(actionObj.action));

    $: if($getActiveBcc) { activeBCC = $getActiveBcc ?? null; }
    $: if($getLoadedBcc) { loadedBCC = $getLoadedBcc ?? null; }
    $: if($getAllBccs) { 
        allNonArchived = $getAllBccs.filter(bcc => !bcc.isArchived).sort((a, b) => (a.created > b.created) ? -1 : (a.created < b.created) ? 1 : 0);
        allArchived = $getAllBccs.filter(bcc => bcc.isArchived).sort((a, b) => (a.created > b.created) ? -1 : (a.created < b.created) ? 1 : 0);
    }
</script>

<article id="BCCManager" class="mb-4">
    <section id="BCCManager_LoadedBCC">
        <h2 class="mb-3">BCC chargé</h2>
        {#if loadedBCC}
        <div class="info-box bg-info mb-1">
            <span class="info-box-icon"><i class="fas fa-tools"></i></span>
            <div class="info-box-content">
                <span class="info-box-number">{ loadedBCC.name } (#{ loadedBCC.id }) <span class="badge badge-light">{ loadedBCC.state }</span></span>
                <span class="info-box-text"><i>créé le :</i> { format(new Date(loadedBCC.created), "dd/MM/yyyy HH:mm") }</span>
                <span class="info-box-text"><i>données SAP :</i> { format(new Date(loadedBCC.extractedSapData), "dd/MM/yyyy HH:mm") }</span>
            </div>
        </div>
        <div class="rounded border border-info p-2">
            <BCCActionsMenu targetBCC={ loadedBCC } allActions={ allActions } />
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
        <div class="info-box bg-success mb-1">
            <span class="info-box-icon"><i class="fab fa-creative-commons"></i></span>
            <div class="info-box-content">
                <span class="info-box-number">{ activeBCC.name } (#{ activeBCC.id })</span>
                <span class="info-box-text"><i>créé le :</i> { format(new Date(activeBCC.created), "dd/MM/yyyy HH:mm") }</span>
                <span class="info-box-text"><i>données SAP :</i> { format(new Date(activeBCC.extractedSapData), "dd/MM/yyyy HH:mm") }</span>
                {#if activeBCC.activated}<span class="info-box-number">activé le { format(new Date(activeBCC.activated), "dd/MM/yyyy HH:mm") }</span>{/if}
            </div>
        </div>
        <div class="rounded border border-success p-2">
            <BCCActionsMenu targetBCC={ activeBCC } allActions={ allActions } />
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
                                    <BCCActionsMenu targetBCC={ bcc } allActions={ restrictedActions } />
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
                                <td><span class="badge badge-light">{ bcc.state }</span><span class="badge badge-dark">archivé</span></td>
                                <td>{ format(new Date(bcc.created), "dd/MM/yyyy HH:mm") }</td>
                                <td>{ format(new Date(bcc.extractedSapData), "dd/MM/yyyy HH:mm") }</td>
                                <td>
                                    <BCCActionsMenu targetBCC={ bcc } allActions={ restrictedActions } />
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
        <button class="btn btn-success btn-lg" on:click={ () => createBccDialog.triggerOpenDialog() }><i class="fas fa-plus pr-2"></i>Créer un nouveau BCC (extraction SAP)</button>
    </footer>
</article>
<DialogCreateBcc bind:this={ createBccDialog } />
<DialogDuplicateBcc bind:this={ duplicateBccDialog } />
<DialogDeleteConfirmBcc bind:this={ deleteBccDialog } />
<DialogArchiveConfirmBcc bind:this={ archiveBccDialog }/>
<DialogUnarchiveConfirmBcc bind:this={ unarchiveBccDialog }/>
<DialogLoadConfirmBcc bind:this={ loadBccDialog } />
<DialogActivateConfirmBcc bind:this={ activateBccDialog } />

<style lang="scss">
    #BCCManager {
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: 
            "loaded-bcc active-bcc"
            "all-bcc all-bcc"
            ". actions-bcc";
        gap: 3rem 1.5rem;
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

    .table > tbody > tr > td {
        vertical-align: middle;
    }
</style>