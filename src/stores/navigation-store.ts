import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export type NavStore = {
    isNavOpen:boolean,
    auth: {
        isAuth:boolean
        roles: string[]
        profile: any|null
    },
    perspective:'CC'|'NW'
}

const initNavigationStore = () => {
    const initialNavigationStore:NavStore = {
        isNavOpen: true,
        auth: {
            isAuth: false,
            roles: [],
            profile: null
        },
        perspective: 'NW'
    }

    const store =  writable(initialNavigationStore);
    const { subscribe, update } = store;

    // METHODS
    function openNav() { update(state => {
        switch(state.isNavOpen) {
            case false:
                // is closed, should open
                if(browser) {
                    document.body.classList.remove('sidebar-collapse');
                }
                return { ...state, isNavOpen: true };

            default:
                return state;
        }
    })};
    function closeNav() { update(state => {
        switch(state.isNavOpen) {
            case true:
                // is opened, should close
                if(browser) {
                    document.body.classList.add('sidebar-collapse');
                }
                return { ...state, isNavOpen: false };

            default:
                return state;
        }
    })};
    function toggleNav() {
        const state:NavStore = get(store);
        if(state.isNavOpen) {
            closeNav();
        } else {
            openNav();
        }
    };
    function goToNW() { console.log('TODO go to NEW WATBOOK perspective') };
    function goTOCC() { console.log('TODO go to CC perspective') };

    return {
        subscribe,
        openNav,
        closeNav,
        toggleNav,
        goToNW,
        goTOCC
    }
}

export const navStore = initNavigationStore();