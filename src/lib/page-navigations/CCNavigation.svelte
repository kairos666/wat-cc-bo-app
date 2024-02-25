<script lang="ts">
    import smallLogo from "$lib/images/business-model.png";
    import NavItem from "./NavItem.svelte";
    import NavItemWithSubitems from "./NavItemWithSubitems.svelte";

    type NavItemObj = {
        type: 'simple-link'
        href:string
        label:string
        faIcon:string[]
    }

    type GroupWithSubitemsObj = {
        type: 'group-with-subitems'
        label:string
        faIcon:string[]
        children: NavItemObj[]
    }

    const navTree:(GroupWithSubitemsObj|NavItemObj)[] = [
        { type: 'simple-link', href: "/CONFCOM", label: "Accueil", faIcon: ["fas", "fa-home"] },
        { type: 'simple-link', href: "/CONFCOM/tdv", label: "Parcours TDV", faIcon: ["fas", "fa-handshake"] },
        { type: 'simple-link', href: "/CONFCOM/bundle-cc", label: "Bundle CC", faIcon: ["fas", "fa-digital-tachograph"] },
        { type: 'group-with-subitems', label: "Contexte", faIcon: ["fas", "fa-atlas"], children: [
            { type: 'simple-link', href: "/CONFCOM/country", label: "Pays", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/language", label: "Langues", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/currency", label: "Devises", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/delivery-cost", label: "Frais de livraison", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/delivery-delay", label: "Délais de livraison", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/product-line", label: "Lignes d'équipement", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/tva", label: "TVAs", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/promotion", label: "Promotions et cross sell", faIcon: ["fas", "fa-circle"] }
        ] },
    ]
</script>

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index3.html" class="brand-link">
        <img src={ smallLogo } alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">CONFCOM</span>
    </a>
    <div class="sidebar os-host-scrollbar-horizontal-hidden">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {#each navTree as navItem}
                    {#if navItem.type === "simple-link"}
                        <NavItem href={ navItem.href } label={ navItem.label } faIcon={ navItem.faIcon } />
                    {:else}
                        <NavItemWithSubitems label={ navItem.label } faIcon={ navItem.faIcon } childrenURL={ navItem.children.map(child => child.href) }>
                            {#each navItem.children as subNavItem}
                                <NavItem href={ subNavItem.href } label={ subNavItem.label } faIcon={ subNavItem.faIcon } />
                            {/each}
                        </NavItemWithSubitems>
                    {/if}
                {/each}
            </ul>
        </nav>
    </div>
</aside>