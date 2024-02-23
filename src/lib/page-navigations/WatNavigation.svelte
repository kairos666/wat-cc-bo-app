<script lang="ts">
    import smallLogo from "$lib/images/AdminLTELogo.webp";
    import NavItem from "./NavItem.svelte";
    import NavItemWithSubitems from "./NavItemWithSubitems.svelte";

    type NavItemObj = {
        href:string
        label:string
        faIconString:string[]
        children: NavItemObj[]
    }

    const navTree:NavItemObj[] = [
        { href: "/", label: "Accueil", faIconString: ["fas", "fa-home"], children: [] },
        { href: "/", label: "Parcours TDV", faIconString: ["fas", "fa-handshake"], children: [] },
        { href: "/", label: "Documents", faIconString: ["fas", "fa-folder-open"], children: [] },
        { href: "/", label: "Produits", faIconString: ["fas", "fa-swimming-pool"], children: [
            { href: "/", label: "Catégories", faIconString: ["fas", "fa-sitemap"], children: [] },
            { href: "/", label: "Catalogue", faIconString: ["fas", "fa-list"], children: [] },
            { href: "/", label: "Prix de vente conseillé", faIconString: ["fas", "fa-euro-sign"], children: [] },
            { href: "/", label: "Prix de vente", faIconString: ["fas", "fa-euro-sign"], children: [] },
            { href: "/", label: "Conversion devises", faIconString: ["fas", "fa-money-bill"], children: [] }
        ] },
        { href: "/", label: "Configuration", faIconString: ["fas", "fa-th"], children: [
            { href: "/", label: "Partenaires", faIconString: ["fas", "fa-circle"], children: [] },
            { href: "/", label: "Pays", faIconString: ["fas", "fa-circle"], children: [] },
            { href: "/", label: "Langues", faIconString: ["fas", "fa-circle"], children: [] },
            { href: "/", label: "TVA", faIconString: ["fas", "fa-circle"], children: [] },
            { href: "/", label: "Devises", faIconString: ["fas", "fa-circle"], children: [] },
            { href: "/", label: "Délais de livraison", faIconString: ["fas", "fa-circle"], children: [] },
            { href: "/", label: "Conditions de paiement", faIconString: ["fas", "fa-circle"], children: [] },
            { href: "/", label: "Traductions", faIconString: ["fas", "fa-circle"], children: [] },
            { href: "/", label: "Applications tierces", faIconString: ["fas", "fa-circle"], children: [] }
        ] },
        { href: "/", label: "Astuces", faIconString: ["fas", "fa-comment"], children: [] },
        { href: "/", label: "Administration", faIconString: ["fas", "fa-cog"], children: [] }
    ]
</script>

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index3.html" class="brand-link">
        <img src={ smallLogo } alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">WATBOOK</span>
    </a>
    <div class="sidebar os-host-scrollbar-horizontal-hidden">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {#each navTree as navItem}
                    {#if navItem.children.length === 0}
                        <NavItem {...navItem} />
                    {:else}
                        <NavItemWithSubitems {...navItem}>
                            {#each navItem.children as subNavItem}
                                <NavItem {...subNavItem} />
                            {/each}
                        </NavItemWithSubitems>
                    {/if}
                {/each}
            </ul>
        </nav>
    </div>
</aside>