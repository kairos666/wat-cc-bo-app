<script lang="ts">
    export let href:string
    export let label:string
    export let faIconString:string[]
</script>

<li class="nav-item">
    <a href={ href } class="nav-link">
        <i class={ ["nav-icon", ...faIconString].join(" ") }></i>
        <p>{ label }</p>
    </a>
</li>