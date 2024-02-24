<script lang="ts">
    import { page } from "$app/stores";

    export let href:string;
    export let label:string;
    export let faIcon:string[];
</script>

<li class="nav-item">
    <a href={ href } class="nav-link" class:active={ $page.url.pathname === href }>
        <i class={ ["nav-icon", ...faIcon].join(" ") }></i>
        <p>{ label }</p>
    </a>
</li>