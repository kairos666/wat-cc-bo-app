<script>

    import CollectionHeader from "$lib/page-collection/CollectionHeader.svelte";
    import CollectionTable from "$lib/page-collection/CollectionTable.svelte";

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
                    <CollectionTable />
                </div>
            </div>
        </div>
    </div>
</div>
