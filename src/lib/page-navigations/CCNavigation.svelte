<script lang="ts">
    import smallLogo from "$lib/images/business-model.png";
    import { getLoadedBcc, type BccMetaData, type BccState } from "../../stores/bcc-store";
    import BccRelatedNavItems from "./BccRelatedNavItems.svelte";
    import NavItem from "./NavItem.svelte";
    import NavItemWithSubitems from "./NavItemWithSubitems.svelte";

    type NavItemObj = {
        type: 'simple-link'
        href:string
        label:string
        faIcon:string[]
    }

    type ContextualizedNavItemObj = {
        type: 'contextualized-link'
        href:string
        label:string
        faIcon:string[]
        relevantStates:BccState[]
    }

    type GroupWithSubitemsObj = {
        type: 'group-with-subitems'
        label:string
        faIcon:string[]
        children: NavItemObj[]
    }

    const bccContextualizedNavTree:ContextualizedNavItemObj[] = [
        { type: 'contextualized-link', relevantStates: ['initié', 'nettoyé & typé'], href: "/CONFCOM/sap-filters", label: "Filtres d'exclusion", faIcon: ["fas", "fa-filter"] },
        { type: 'contextualized-link', relevantStates: ['initié', 'nettoyé & typé'], href: "/CONFCOM/sap-types", label: "Typage articles", faIcon: ["fas", "fa-cubes"] },
        { type: 'contextualized-link', relevantStates: ['initié', 'nettoyé & typé'], href: "/CONFCOM/processus-modelize", label: "Modéliser BCC", faIcon: ["fas", "fa-clipboard-check"] },
        { type: 'contextualized-link', relevantStates: ['modélisé', 'prêt'], href: "/CONFCOM/caracteristics", label: "Caractéristiques", faIcon: ["fas", "fa-ruler-combined"] },
        { type: 'contextualized-link', relevantStates: ['modélisé', 'prêt'], href: "/CONFCOM/catalog", label: "Catalogue d'articles", faIcon: ["fas", "fa-shopping-cart"] },
        { type: 'contextualized-link', relevantStates: ['modélisé', 'prêt'], href: "/CONFCOM/product-availability", label: "Disponibilité par pays", faIcon: ["fas", "fa-globe-europe"] },
        { type: 'contextualized-link', relevantStates: ['modélisé', 'prêt'], href: "/CONFCOM/product-compatibility", label: "Compatibilités articles", faIcon: ["fas", "fa-not-equal"] },
        { type: 'contextualized-link', relevantStates: ['modélisé', 'prêt'], href: "/CONFCOM/tdv", label: "TDV Configurateur", faIcon: ["fas", "fa-handshake"] },
        { type: 'contextualized-link', relevantStates: ['modélisé'], href: "/CONFCOM/processus-enrich", label: "Valider enrichissement", faIcon: ["fas", "fa-clipboard-check"] },
        { type: 'contextualized-link', relevantStates: ['prêt', 'actif'], href: "/CONFCOM/bcc-test", label: "Tester", faIcon: ["fas", "fa-flask"] },
        { type: 'contextualized-link', relevantStates: ['initié', 'nettoyé & typé', 'modélisé', 'prêt', 'actif'], href: "/CONFCOM/bcc-report", label: "Rapport", faIcon: ["fas", "fa-clipboard-list"] },
    ];

    const transverseNavTree:(GroupWithSubitemsObj|NavItemObj)[] = [
        { type: 'group-with-subitems', label: "Contexte partagé", faIcon: ["fas", "fa-atlas"], children: [
            { type: 'simple-link', href: "/CONFCOM/country", label: "Pays", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/language", label: "Langues", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/currency", label: "Devises", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/delivery-cost", label: "Frais de livraison", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/delivery-delay", label: "Délais de livraison", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/product-line", label: "Lignes d'équipement", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/product-hierarchy", label: "Arborescence", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/tva", label: "TVAs", faIcon: ["fas", "fa-circle"] },
            { type: 'simple-link', href: "/CONFCOM/promotion", label: "Promotions et cross sell", faIcon: ["fas", "fa-circle"] }
        ] },
        { type: 'simple-link', href: "/CONFCOM/ged", label: "Documents & médias", faIcon: ["fas", "fa-folder-open"] },
    ];
    let loadedBCC:BccMetaData|null = null;
    let filteredBccContextualizedNavTree:ContextualizedNavItemObj[] = [];
    $: if($getLoadedBcc) { 
        loadedBCC = $getLoadedBcc ?? null;
        filteredBccContextualizedNavTree = (loadedBCC !== null) ? bccContextualizedNavTree.filter(linkObj => linkObj.relevantStates.includes((loadedBCC as BccMetaData).state)) : [];
    }
</script>

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index3.html" class="brand-link">
        <img src={ smallLogo } alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">CONFCOM</span>
    </a>
    <div class="sidebar os-host-scrollbar-horizontal-hidden">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <NavItem href="/CONFCOM" label="Accueil" faIcon={ ["fas", "fa-home"] } />
                {#if loadedBCC}
                    <BccRelatedNavItems bccMetaData={ loadedBCC } childrenURL={ filteredBccContextualizedNavTree.map(child => child.href) }>
                        {#each filteredBccContextualizedNavTree as navItem}
                            <NavItem href={ navItem.href } label={ navItem.label } faIcon={ navItem.faIcon } />
                        {/each}
                    </BccRelatedNavItems>
                {/if}
                {#each transverseNavTree as navItem}
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

<style lang="scss">
    .nav-separator {
        height:1px;
        background-color: var(--gray);
        margin-block: 1rem;
    }
</style>