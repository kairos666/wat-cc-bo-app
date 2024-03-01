import { defineAbility, PureAbility, type AnyMongoAbility } from "@casl/ability";
import { type BccState } from "../stores/bcc-store";

//export type PageAccessAbility = PureAbility<string> & AnyMongoAbility; // string = page route URL (AnyMongoAbility resolve type issue https://github.com/stalniy/casl/issues/525)
export type AppAccessAbility = PureAbility<'CC'|'NW'|'BO'> & AnyMongoAbility; // must keep in sync with access to routes

// export const pageAbilityBuilder = (userRoles:string[], pagePermissionsObject:{ url:string, roles:string[] }[]) => defineAbility<PageAccessAbility>((can, cannot) => {
//     pagePermissionsObject.forEach(({ url, roles }) => {
//         const hasPermission:boolean = (roles.length === 0)
//             ? true
//             : roles.some(value => userRoles.includes(value));

//         if(hasPermission) { can(url) } else { cannot(url) }
//     });
// })

export const appAbilityBuilder = (userRoles:string[]) => defineAbility<AppAccessAbility>((can, cannot) => {
    if(userRoles.includes('user')) { can("NW"); can("BO") } else { cannot("NW"); cannot("BO") }
    if(userRoles.includes('admin-tech')) { can("CC") } else { cannot("CC") }
})

/**
 * ACTIONS permissions for BCC (based on state, isWorkingInstance, isArchived)
 */
export type BccActions = 'delete'|'clone'|'filter & type'|'enrich'|'modelize'|'archive'|'unarchive'|'load'|'activate';
export class BccSubject {
    static get modelName() { return 'BCC' }
    state:string;
    isArchived:boolean;
    isWorkingInstance:boolean;

    constructor(state:string, isWorkingInstance:boolean, isArchived:boolean) {
        this.state = state;
        this.isArchived = isArchived;
        this.isWorkingInstance = isWorkingInstance
    }
}
type BccSubjectType = 'BCC';
type BccAbility = PureAbility<[BccActions, BccSubjectType]> & AnyMongoAbility;
export const bccActionsAbility = defineAbility<BccAbility>((can) => {
    // delete always BUT active or loaded BCC
    can('delete', 'BCC', { 
        state: { $nin: ['actif'] },
        isWorkingInstance: false
    });
    // clone always possible
    can('clone', 'BCC');
    // filter & type only initié or nettoyé & typé BCC, once modelized it is not necessary anymore (must be loaded)
    can('filter & type', 'BCC', { 
        state: { $in: ['initié', 'nettoyé & typé'] },
        isWorkingInstance: true
    })
    // enrich only on loaded BCC in state modélisé & prêt
    can('enrich', 'BCC', { state: 'modélisé', isWorkingInstance: true });
    can('enrich', 'BCC', { state: 'prêt', isWorkingInstance: true });
    // modelize only on loaded BCC in state initié & nettoyé & typé
    can('modelize', 'BCC', { state: 'initié', isWorkingInstance: true });
    can('modelize', 'BCC', { state: 'nettoyé & typé', isWorkingInstance: true });
    // archive always BUT loaded or active or already archived BCC
    can('archive', 'BCC', { 
        state: { $nin: ['actif'] },
        isWorkingInstance: false,
        isArchived: false
    });
    // unarchive only on archived BCC
    can('unarchive', 'BCC', { isArchived: true });
    // load any BCC that is not loaded or archived or active (is locked)
    can('load', 'BCC', { state: { $nin: ['actif'] }, isWorkingInstance: false, isArchived: false });
    // activate, only loaded BCC that is also ready
    can('activate', 'BCC', { isWorkingInstance: true, state: 'prêt' });
})