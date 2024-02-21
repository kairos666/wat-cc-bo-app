<script>
    import Header from "$lib/page-headers/Header.svelte";
    import WatNavigation from "$lib/page-navigations/WatNavigation.svelte";
    import "../../node_modules/admin-lte/dist/css/adminlte.css";
</script>

<Header />
<WatNavigation />
<main>
    <slot />
</main>
<footer class="main-footer text-sm">
    <span>WATBOOK by <a href="https://adminlte.io/themes/v3/index3.html">WATERAIR</a></span>
    <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.0.0
    </div>
</footer>