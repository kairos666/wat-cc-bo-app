// entry types for Articles
export type SAP_RAW_Article = {
    articleID:string // Artcile, index: 0
    tyar:string // TyAr, index: 3
    language:string // Langue, index: 4
    label:string // Désignation article, index: 5
    hierarchy:string // Hiérarch.produits, index: 9
    articleGroup:string // Désignation, index: 10
}

export type SAP_Article = {
    articleID:string
    tyar:string
    label:{ name:string, language:string }[]
    hierarchy:string
    articleGroup:string
}

// entry types for Objects
export type SAP_Object = {
    articleID:string // Objet, index: 2
    objID:string // Numéro objet, index: 3
}

// entry types for object to carac link
export type SAP_RAW_Carac_Req3 = {
    objID: string // Objet, index: 1
    caracID: string // Caractéristique, index: 2
    caracValue: string // Valeur de la caractéristique, index: 12
}

export type SAP_RAW_Carac_Req5 = {
    caracID: string // Caractéristique, index: 0
    caracGrp: string // Grp.caractér, index: 1
    caracValue: string // Valeur de la caractéristique, index: 2
}

export type SAP_Carac = {
    caracID: string
    caracGrp: string
    caracValues: { value: string, objLinks: string[] }[]
}

// entry types for prices
export type SAP_Prices = {
    articleID: string // article, index: 0
    priceGroup: string // groupe article, index: 5
    price: number // prix base, index: 7
}

// filter & types
export type SAP_Article_FiltersAndTypes = {
    articleID:string
    isExcluded: boolean
    type: string
}

export type SAP_Article_FiltersAndTypes_EXPORT_ENTRY = { 
    "Article":string, 
    "Désignation article":string, 
    "EXCLURE":string, 
    "TYPE":string 
}

export type SAP_Carac_Filters = {
    id?:number // tech, auto incremented by dexie
    caracID: string
    caracValue: string
}

export type SAP_Carac_Filters_EXPORT_ENTRY = { 
    "Caractéristique":string, 
    "Valeur de la caractéristique":string, 
    "EXCLURE":string
}