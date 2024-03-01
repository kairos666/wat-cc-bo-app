<script lang="ts">
    import AbilityTruthChecker from "$lib/test/AbilityTruthChecker.svelte";
</script>

<svelte:head>
	<title>CONFCOM - BCC</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Bundle configurateur commercial - test des permissions</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/CONFCOM">Accueil</a></li>
                        <li class="breadcrumb-item active">Bundle CC</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content pb-4">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <p>Cette page est a retirer, c'est l'accueil CONFCOM qui sert à gérer les BCC</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <AbilityTruthChecker />
                </div>
            </div>
        </div>
    </div>
</div>

