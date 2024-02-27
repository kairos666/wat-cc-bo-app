<script lang="ts">
    import { navStore } from "../stores/navigation-store";
    import bigLogo from '$lib/images/waterair-logo.svg';

    const { connectUser } = navStore;
</script>

<svelte:head>
	<title>Authentification BO</title>
</svelte:head>

<main class="LoginPageWrapper">
    {#if $navStore.profile === null}
    <article class="AuthForm">
        <header>
            <img class="Logo" alt="waterair, tout commence par le bon choix" src={ bigLogo } />
            <h1>S'identifier</h1>
            <p>Identifiez vous avec votre compte utilisateur pour accèder au fonctionnalités de gestion administratives de NEW WATBOOK & CONFCOM</p>
        </header>
        
        <form on:submit={ evt => evt.preventDefault() }>
            <div class="form-group">
                <label for="user-account-email">Adresse email du compte</label>
                <input type="email" class="form-control" id="user-account-email" name="user-account-email" autocomplete="username" />
            </div>
            <div class="form-group">
                <label for="user-account-pwd">Password</label>
                <input type="password" class="form-control" id="user-account-pwd" name="user-account-pwd" autocomplete="current-password" />
            </div>
            <button type="submit" class="btn btn-primary">S'identifier</button>
        </form>        
    </article>
    {:else}
    <article class="AccessBlock">
        <header>
            <img class="Logo" alt="waterair, tout commence par le bon choix" src={ bigLogo } />
        </header>
        {#if $navStore.hasCCAccess}
        <h2>CONFCOM</h2>
        <p>Administrer le configurateur commercial WATERAIR</p>
        <a href="/CONFCOM" class="btn btn-primary btn-lg CCBtn">aller sur CONFCOM</a>
        {/if}
        {#if $navStore.hasCCAccess && $navStore.hasNWAccess}<hr />{/if}
        {#if $navStore.hasNWAccess}
        <h2>NEW WATBOOK</h2>
        <p>Administrer NEW WATBOOK pour synchroniser ensuite les tablettes</p>
        <a href="/NEWWATBOOK" class="btn btn-primary btn-lg NWBtn">aller sur NEW WATBOOK</a>
        {/if}
    </article>
    {/if}
    <menu class="MockMenu">
        <button class="btn btn-outline-light btn-sm" on:click={ () => connectUser('admin-tech') }>Connect admin tech</button>
        <button class="btn btn-outline-light btn-sm" on:click={ () => connectUser('admin-func') }>Connect admin func</button>
        <button class="btn btn-outline-light btn-sm" on:click={ () => connectUser('vendor') }>Connect vendor</button>
        <button class="btn btn-outline-light btn-sm" on:click={ () => connectUser('fake-user') }>Connect fake user</button>
    </menu>
</main>

<style lang="scss">
    $block-bg-color: rgba(255, 255, 255, 0.6);
    $block-bradius: 0.5rem;
    $block-padding: 1rem;
    .LoginPageWrapper {
        position:relative;
        min-height:100vh;
        padding: 4rem;
        background: url('/bo-splash-image.webp') 50% 50% no-repeat;
        background-size: cover;
    }

    .Logo {
        width:100%;
        max-height:150px;
        margin-block-end: 2rem;;
    }
    .AuthForm, .AccessBlock {
        width: 30vw;
        min-width:300px;
        border:1px solid white;
        background-color: $block-bg-color;
        border-radius: $block-bradius;
        padding: $block-padding;
        backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
    }

    .MockMenu {
        position:absolute;
        bottom:4rem;
        left:4rem;
        padding-inline-start: 0;
        margin-block: 0;
        display:flex;
        gap:0.5rem;
    }

    .CCBtn {
        border-color: var(--cc-light);
        background-color: var(--cc-light);
        &:hover, &:focus, &:active {
            border-color: var(--cc-dark);
            background-color: var(--cc-dark);
        }
    }
    .NWBtn {
        border-color: var(--nw-light);
        background-color: var(--nw-light);
        &:hover, &:focus, &:active {
            border-color: var(--nw-dark);
            background-color: var(--nw-dark);
        }
    }

    .PerspectiveBtn.PerspectiveBtn-CC {
        opacity:0.25;
        border-radius: 5px;
        transition: all 0.3s;
        color: red;

        &:hover, &:focus, &:active, &:disabled {
            opacity:1;
            color: white;
            background-color: blue;
        }
    }
    
</style>