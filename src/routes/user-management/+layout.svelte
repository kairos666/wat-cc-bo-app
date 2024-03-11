<script>
    import TransverseHeader from "$lib/page-headers/TransverseHeader.svelte";
</script>

<TransverseHeader />
<main class="BasePageWrapper BasePageWrapper-offset-for-header">
    <slot />
</main>
<footer class="main-footer text-sm"></footer>