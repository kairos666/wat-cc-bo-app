import { defineAbility, PureAbility, type AnyMongoAbility } from "@casl/ability";

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