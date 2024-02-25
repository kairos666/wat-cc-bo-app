<script lang="ts">
    import { navStore } from "../stores/navigation-store";

    const { connectUser } = navStore;
</script>

<svelte:head>
	<title>Authentification BO</title>
</svelte:head>

<main class="BasePageWrapper">
    <h1 class="m-0">NEW WATBOOK / CONFCOM</h1>
    <ul>
        <li><a href="/CONFCOM">Accueil CC</a></li>
        <li><a href="/NEWWATBOOK">Accueil NEW WATBOOK</a></li>
    </ul>
    <p>TODO <u>Mire d'authentification</u>, page de maintenance, ...</p>
    <button on:click={ () => connectUser('admin-tech') }>Connect admin tech</button>
    <button on:click={ () => connectUser('admin-func') }>Connect admin func</button>
    <button on:click={ () => connectUser('vendor') }>Connect vendor</button>
    <button on:click={ () => connectUser('fake-user') }>Connect fake user</button>
</main>