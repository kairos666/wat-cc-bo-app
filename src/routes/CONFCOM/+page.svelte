<script lang="ts">
    import smallLogo from "$lib/images/business-model.png";
    import BccManager from "$lib/bcc-components/BCCManager.svelte";
</script>
<svelte:head>
	<title>CONFCOM - Accueil</title>
</svelte:head>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-4">
                <div class="col-sm-6">
                    <h1 class="m-0"><img src={ smallLogo } alt="logo CONFCOM" width="50" class="brand-image mr-4"> Accueil CONFCOM</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item active">Accueil</li>
                    </ol>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-sm-6">
                    <p>Pour commencer sur CONFCOM, veuillez définir le "Bundle configurateur commercial" (BCC) de travail.<br /> Toutes les actions : enrichissement des traductions, médias, documents, tarifs, TVAs, Pays, ... sont toujours liées au BCC qui leur est rattaché.</p>
                    <p><b>Pensez donc toujours à vérifier que vous travaillez dans le bon contexte.</b></p>
                </div>
                <div class="col-sm-6">
                    <p><b>BCC chargé</b> : Il s'agit du BCC que vous modifiez et faites évoluer jusqu'à ce qu'il soit prêt. Pas de risque de perturber NEW WATBOOK et les vendeurs, seules les personnes ayant accès à CONFCOM peuvent le voir.</p>
                    <p><b>BCC actif</b> : C'est le BCC actuellement utilisé pour définir le configurateur commercial de NEW WATBOOK. Remplacer ce BCC par un autre revient à mettre à jour le configurateur commercial NEW WATBOOK. Pensez à respecter la procédure pour cette action.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <BccManager />
                </div>
            </div>
        </div>
    </div>
</div>
