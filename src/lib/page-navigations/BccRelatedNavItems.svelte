<script lang="ts">
    import type { BccMetaData } from "../../stores/bcc-store";
    import { page } from "$app/stores";

    export let bccMetaData:BccMetaData;
    export let childrenURL:string[] = [];
    let isOpen:boolean = false;
    function onMenuToggle(evt:Event) {
        evt.preventDefault();

        isOpen = !isOpen;
    }
</script>

<li class="nav-item" class:menu-is-opening={ isOpen } class:menu-open={ isOpen }>
    <a href="#top" on:click={ onMenuToggle } class="nav-link" class:active={ childrenURL.some(childURL => $page.url.pathname === childURL) }>
        <i class="nav-icon fas fa-tools"></i>
        <p>BCC : { bccMetaData.name }<i class="fas fa-angle-left right"></i></p>
    </a>
    <ul class="nav nav-treeview" style:display={ (isOpen) ? 'block' : 'none' }>
        <slot />
    </ul>
</li>

<style lang="scss">
    .nav-item {
        border-radius: 0.25rem;
        border:1px solid transparent;
        overflow: hidden;

        &.menu-open { 
            margin-block-end: 0.2rem;
            border:1px solid var(--info);
        }
        .nav-treeview {
            margin-block-end: -0.2rem;
        }
    }
    .nav-link {
        border-radius: 0;
        margin-block-end: 0;
        .menu-open & {
            margin-block-end: 0.2rem;
        }

        &.active.active {
            background-color: var(--info);
        }
    }
</style>