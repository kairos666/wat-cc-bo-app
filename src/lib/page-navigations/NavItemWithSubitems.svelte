<script lang="ts">
    import { page } from "$app/stores";

    export let label:string
    export let faIcon:string[]
    export let childrenURL:string[] = [];
    let isOpen:boolean = false;

    function onMenuToggle(evt:Event) {
        evt.preventDefault();

        isOpen = !isOpen;
    }
</script>

    <li class="nav-item" class:menu-is-opening={ isOpen } class:menu-open={ isOpen }>
        <a href="#top" on:click={ onMenuToggle } class="nav-link" class:active={ childrenURL.some(childURL => $page.url.pathname === childURL) }>
            <i class={ ["nav-icon", ...faIcon].join(" ") }></i>
            <p>{ label }<i class="fas fa-angle-left right"></i></p>
        </a>
        <ul class="nav nav-treeview" style:display={ (isOpen) ? 'block' : 'none' }>
            <slot />
        </ul>
    </li>