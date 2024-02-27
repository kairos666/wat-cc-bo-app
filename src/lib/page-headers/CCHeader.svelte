<script lang="ts">
    import { Popover, PopoverButton, PopoverPanel } from "@rgossiaux/svelte-headlessui";
    import { CircleUserRound, Menu } from "lucide-svelte";
    import { navStore } from "../../stores/navigation-store";
    import { goto } from '$app/navigation';
    
    const { toggleNav, disconnectUser } = navStore;
</script>

<nav id="MainHeader" class="main-header navbar navbar-expand navbar-white navbar-light">
    <button class="NavMenuToggleBtn" on:click={ toggleNav }><Menu /></button>
    <span class="NavMenuSpacer"></span>
    {#if $navStore.hasCCAccess}<button class="PerspectiveBtn PerspectiveBtn-CC" on:click={ () => goto('/CONFCOM') }>CONFCOM</button>{/if}
    {#if $navStore.hasNWAccess}<button class="PerspectiveBtn PerspectiveBtn-NW" on:click={ () => goto('/NEWWATBOOK') }>NEW WATBOOK</button>{/if}
    <Popover style="position: relative;">
        <PopoverButton><CircleUserRound /><span class="ml-2">{ $navStore.profile?.firstName } { $navStore.profile?.lastName }</span></PopoverButton>
        <PopoverPanel style="position: absolute; z-index: 10;">
            <a href="/profile" class="dropdown-item"><i class="fas fa-id-card mr-2"></i>Afficher mon profil</a>
            <a href="/" on:click={ disconnectUser } class="dropdown-item"><i class="fas fa-power-off mr-2"></i>Se déconnecter</a>
        </PopoverPanel>
    </Popover>
</nav>

<style lang="scss">
    @import "../../styles/mixins";
    .PerspectiveBtn.PerspectiveBtn-CC {
        @include perspective-button(var(--cc-dark), var(--cc-light));
    }
    .PerspectiveBtn.PerspectiveBtn-NW {
        @include perspective-button(var(--nw-dark), var(--nw-light));
    }
    #MainHeader {
        display:flex;
        gap:0.5rem;
        
        .NavMenuSpacer { flex: 1 1 auto; }
    }
    .NavMenuToggleBtn, .PerspectiveBtn {
        border:none;
        background: transparent;
        padding: 0.5rem 1rem;
    }
</style>