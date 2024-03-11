import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import userProfilesData from '../data/user-profiles.json';
import { browser } from '$app/environment';
import { type AppAccessAbility, appAbilityBuilder } from '../utils/casl-abilities';

const userProfileLocaleStorageTag:string = 'user-profile';

export function getLocallyStoredUserProfile() {
    if(browser) {
        const profileString:string|null = localStorage.getItem(userProfileLocaleStorageTag);
        if(profileString !== null) {
            try {
                const userProfile:UserProfile = JSON.parse(profileString);
                return userProfile;
            } catch(error) {
                console.warn('Couldn\'t read user profile');
                return null;
            }
        } else {
            return null;
        }
    }

    return null;
}

export type UserProfile = {
    roles: string[]
    firstName: string
    lastName: string
}

export type NavStore = {
    isNavOpen:boolean
    profile: UserProfile|null
    hasCCAccess:boolean
    hasNWAccess:boolean
    hasBOAccess:boolean
    hasBOAdminAccess:boolean
}

const initNavigationStore = () => {
    const initialProfile:UserProfile|null = getLocallyStoredUserProfile();
    let appAccess:AppAccessAbility = appAbilityBuilder(initialProfile?.roles ?? []);

    const initialNavigationStore:NavStore = {
        isNavOpen: true,
        profile: initialProfile,
        hasCCAccess: appAccess.can('CC'),
        hasNWAccess: appAccess.can('NW'),
        hasBOAccess: appAccess.can('BO'),
        hasBOAdminAccess : appAccess.can('ADMIN-BO')
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
    function connectUser(userID:string) {
        // get user profile
        const userProfile:UserProfile|null = (userProfilesData as any)[userID] ?? null;

        if(userProfile !== null) {
            // update abilities
            appAccess = appAbilityBuilder(userProfile?.roles ?? []);

            // update state
            update(state => ({ 
                ...state, 
                profile: { ...userProfile },
                hasCCAccess: appAccess.can('CC'),
                hasNWAccess: appAccess.can('NW'),
                hasBOAccess: appAccess.can('BO'),
                hasBOAdminAccess : appAccess.can('ADMIN-BO')
            }));

            // update local storage
            if(browser) localStorage.setItem(userProfileLocaleStorageTag, JSON.stringify(userProfile));
        } else {
            disconnectUser();
        }
    }
    function disconnectUser() {
        // update abilities
        appAccess = appAbilityBuilder([]);

        // update state
        update(state => ({ 
            ...state, 
            profile: null,
            hasCCAccess: appAccess.can('CC'),
            hasNWAccess: appAccess.can('NW'),
            hasBOAccess: appAccess.can('BO'),
            hasBOAdminAccess : appAccess.can('ADMIN-BO')
        }));

        // update local storage
        if(browser) localStorage.setItem(userProfileLocaleStorageTag, "");
    }

    return {
        subscribe,
        openNav,
        closeNav,
        toggleNav,
        connectUser,
        disconnectUser
    }
}

export const navStore = initNavigationStore();