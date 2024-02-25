<script>
    import NwHeader from "$lib/page-headers/NWHeader.svelte";
    import NwNavigation from "$lib/page-navigations/NWNavigation.svelte";
</script>

<NwHeader />
<NwNavigation />
<main>
    <slot />
</main>
<footer class="main-footer text-sm">
    <span>WATBOOK by WATERAIR</span>
    <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.0.0
    </div>
</footer>