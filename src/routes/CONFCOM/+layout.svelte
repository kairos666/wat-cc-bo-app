<script>
    import CcHeader from "$lib/page-headers/CCHeader.svelte";
    import CcNavigation from "$lib/page-navigations/CCNavigation.svelte";
</script>

<CcHeader />
<CcNavigation />
<main>
    <slot />
</main>
<footer class="main-footer text-sm">
    <span>CONFCOM by WATERAIR</span>
    <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
    </div>
</footer>