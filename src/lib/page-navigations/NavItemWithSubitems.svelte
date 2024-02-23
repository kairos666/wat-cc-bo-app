<script lang="ts">
    export let href:string
    export let label:string
    export let faIconString:string[]
    let isOpen:boolean = false;

    function onMenuToggle(evt:Event) {
        evt.preventDefault();

        isOpen = !isOpen;
    }
</script>

<li class="nav-item" class:menu-is-opening={ isOpen } class:menu-open={ isOpen }>
    <a href={ href } role="button" on:click={ onMenuToggle } class="nav-link">
        <i class={ ["nav-icon", ...faIconString].join(" ") }></i>
        <p>{ label }<i class="right fas fa-angle-left right"></i></p>
    </a>
    <ul class="nav nav-treeview" style:display={ (isOpen) ? 'block' : 'none' }>
        <slot />
    </ul>
</li>