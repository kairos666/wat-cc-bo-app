<script lang="ts">
    import smallLogo from "$lib/images/swimming-pool.png";
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
        { type: 'simple-link', href: "/NEWWATBOOK", label: "Accueil", faIcon: ["fas", "fa-home"] },
        { type: 'simple-link', href: "/", label: "Parcours TDV", faIcon: ["fas", "fa-handshake"] },
        { type: 'simple-link', href: "/", label: "Documents", faIcon: ["fas", "fa-folder-open"] },
        { type: 'group-with-subitems', label: "Produits", faIcon: ["fas", "fa-swimming-pool"], children: [
            { type: 'simple-link', href: "/", label: "Catégories", faIcon: ["fas", "fa-sitemap"] },
            { type: 'simple-link', href: "/", label: "Catalogue", faIcon: ["fas", "fa-list"] },
            { type: 'simple-link', href: "/", label: "Prix de vente conseillé", faIcon: ["fas", "fa-euro-sign"] },
            { type: 'simple-link', href: "/", label: "Prix de vente", faIcon: ["fas", "fa-euro-sign"] },
            { type: 'simple-link', href: "/", label: "Conversion devises", faIcon: ["fas", "fa-money-bill"] }
        ] },
        { type: 'group-with-subitems', label: "Configuration", faIcon: ["fas", "fa-th"], children: [
            { type: 'simple-link', href: "/", label: "Partenaires", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/", label: "Pays", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/", label: "Langues", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/", label: "TVA", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/", label: "Devises", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/", label: "Délais de livraison", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/", label: "Conditions de paiement", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/", label: "Traductions", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/", label: "Applications tierces", faIcon: ["fas", "fa-circle"] }
        ] },
        { type: 'simple-link', href: "/", label: "Astuces", faIcon: ["fas", "fa-comment"] },
        { type: 'simple-link', href: "/", label: "Administration", faIcon: ["fas", "fa-cog"] }
    ]
</script>

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index3.html" class="brand-link">
        <img src={ smallLogo } alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">NEW WATBOOK</span>
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