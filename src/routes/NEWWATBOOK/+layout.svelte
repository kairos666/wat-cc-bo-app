<script>
    import Header from "$lib/page-headers/Header.svelte";
    import NwNavigation from "$lib/page-navigations/NWNavigation.svelte";
</script>

<Header />
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