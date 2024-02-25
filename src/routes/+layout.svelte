<script lang="ts">
    import pagePermissions from "../data/page-permissions.json";
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { navStore } from "../stores/navigation-store";
    import "../../node_modules/admin-lte/dist/css/adminlte.css";
    import "../styles/main.scss";
    import { browser } from "$app/environment";

    $: {
        if(browser) {
            // Route guard - trigger at each new page
            const requiredRoles:string[] = pagePermissions.find(pagePerm => (pagePerm.url === $page.url.pathname))?.roles ?? [];
            const userRoles:string[] = $navStore.profile?.roles ?? [];
            const isGuardedRoute:boolean = (requiredRoles.length > 0);
            const hasPermission:boolean = (isGuardedRoute)
                ? requiredRoles.some(value => userRoles.includes(value))
                : true;

            // redirect when trying to access forbidden page
            if(!hasPermission) goto('/', { replaceState: true });
        }
    }
</script>

<slot />