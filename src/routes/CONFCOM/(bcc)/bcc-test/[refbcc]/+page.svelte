<script lang="ts">
	import type { PageData } from './$types';
	
	export let data:PageData;
</script>

<svelte:head>
	<title>CONFCOM - Tester BCC</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Test BCC - simulateur de configuration commerciale { data.refbcc }</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/CONFCOM">Accueil</a></li>
                        <li class="breadcrumb-item active">Simulation BCC</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <p>Simule un canal de vente. Permet d'évaluer la complétude et l'exactitude d'un BCC avant de le promouvoir à l'état actif. Ou rapidement tester un BCC en production (état actif)</p>
                    <div class="alert alert-warning" role="alert">A spécifier TODO</div>
                </div>
            </div>
        </div>
    </div>
</div>
