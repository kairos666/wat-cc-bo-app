<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { navStore } from "../stores/navigation-store";
    import { browser } from "$app/environment";
    import "../../node_modules/admin-lte/dist/css/adminlte.css";
    import "../styles/main.scss";

    $: {
        if(browser) {
            // Route guard - trigger at each new page
            const newRoute:string = $page.url.pathname;

            switch(true) {
                case (newRoute === "/"): // auth page always accessible
                case (newRoute.startsWith('/CONFCOM') && $navStore.hasCCAccess): // all CC routes
                case (newRoute.startsWith('/NEWWATBOOK') && $navStore.hasNWAccess): // all NW routes
                case (!newRoute.startsWith('/CONFCOM') && !newRoute.startsWith('/NEWWATBOOK') && $navStore.hasBOAccess): // all transverse BO routes
                break;

                default:
                    // otherwise redirect to auth page
                    goto('/', { replaceState: true });
            }
        }
    }
</script>

<slot />