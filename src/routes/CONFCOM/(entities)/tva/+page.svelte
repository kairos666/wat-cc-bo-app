<script lang="ts">
    import CollectionHeader from "$lib/page-collection/CollectionHeader.svelte";
    import CollectionTable from "$lib/page-collection/CollectionTable.svelte";

    let data = [
        { id: 1, name: "TVA N°1", value: 0.1 },
        { id: 2, name: "TVA N°2", value: 0.2 },
        { id: 3, name: "TVA N°3", value: 0.3 },
        { id: 4, name: "TVA N°4", value: 0.4 },
        { id: 5, name: "TVA N°5", value: 0.5461 },
        { id: 6, name: "TVA N°6", value: 0.6 },
        { id: 7, name: "TVA N°7", value: 0.7 },
        { id: 8, name: "TVA N°8", value: 0.8 },
        { id: 9, name: "TVA N°9", value: 0.1 },
        { id: 10, name: "TVA N°10", value: 0.2 },
        { id: 11, name: "TVA N°11", value: 0.3 },
        { id: 12, name: "TVA N°12", value: 0.4 },
        { id: 13, name: "TVA N°13", value: 0.5461 },
        { id: 14, name: "TVA N°14", value: 0.6 },
        { id: 15, name: "TVA N°15", value: 0.7 },
        { id: 16, name: "TVA N°16", value: 0.8 },
        { id: 17, name: "TVA N°17", value: 0.1 },
        { id: 18, name: "TVA N°18", value: 0.2 },
        { id: 19, name: "TVA N°19", value: 0.3 },
        { id: 20, name: "TVA N°20", value: 0.4 },
        { id: 21, name: "TVA N°21", value: 0.5461 },
        { id: 22, name: "TVA N°22", value: 0.6 },
        { id: 23, name: "TVA N°23", value: 0.7 },
        { id: 24, name: "TVA N°24", value: 0.8 },
    ]
    let columns = [{ colLabel:"ID", propertyName:"id" }, { colLabel:"Nom", propertyName:"name" }, { colLabel:"Pourcentage", propertyName:"value", valueTransformer: (item:number) => `${ item * 100 }%` }];
</script>
<svelte:head>
	<title>CONFCOM - TVAs</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">TVAs</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/CONFCOM">Accueil</a></li>
                        <li class="breadcrumb-item active">TVAs</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <CollectionHeader />
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <CollectionTable hasRowSelectors data={ data } columnsProperties={ columns } />
                </div>
            </div>
        </div>
    </div>
</div>
