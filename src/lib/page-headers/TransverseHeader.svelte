<script lang="ts">
    import { Popover, PopoverButton, PopoverPanel } from "@rgossiaux/svelte-headlessui";
    import { CircleUserRound } from "lucide-svelte";
    import { goto } from '$app/navigation';
</script>

<nav id="MainHeader" class="main-header navbar navbar-expand navbar-white navbar-light">
    <span class="NavMenuSpacer"></span>
    <button class="PerspectiveBtn PerspectiveBtn-CC" on:click={ () => goto('/CONFCOM') }>CONFCOM</button>
    <button class="PerspectiveBtn PerspectiveBtn-NW" on:click={ () => goto('/NEWWATBOOK') }>NEW WATBOOK</button>
    <Popover style="position: relative;">
        <PopoverButton><CircleUserRound /><span class="ml-2">Sylvie Nolenti</span></PopoverButton>
        <PopoverPanel style="position: absolute; z-index: 10;">
            <a href="/profile" class="dropdown-item"><i class="fas fa-id-card mr-2"></i>Afficher mon profil</a>
            <a href="/" class="dropdown-item"><i class="fas fa-power-off mr-2"></i>Se déconnecter</a>
        </PopoverPanel>
    </Popover>
</nav>

<style lang="scss">
    #MainHeader {
        margin-inline-start: 0;
        display:flex;
        gap:0.5rem;
        
        .NavMenuSpacer { flex: 1 1 auto; }
    }
    .NavMenuToggleBtn, .PerspectiveBtn {
        border:none;
        background: transparent;
        padding: 0.5rem 1rem;
    }

    .PerspectiveBtn {
        opacity:0.25;
        border-radius: 5px;
        transition: all 0.3s;

        &.PerspectiveBtn-CC {
            color: var(--cc-dark);
            &:hover, &:focus, &:active, &:disabled {
                opacity:1;
                color: white;
                background-color: var(--cc-light);
            }
        }
        &.PerspectiveBtn-NW {
            color: var(--nw-dark);

            &:hover, &:focus, &:active, &:disabled {
                opacity:1;
                color: white;
                background-color: var(--nw-light);
            }
        }
    }
</style>