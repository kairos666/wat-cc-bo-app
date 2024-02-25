<script>
    import Header from "$lib/page-headers/Header.svelte";
    import CcNavigation from "$lib/page-navigations/CCNavigation.svelte";
    import "../../../node_modules/admin-lte/dist/css/adminlte.css";
    import "../../styles/main.scss";
</script>

<Header />
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