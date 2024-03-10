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
export type SAP_RAW_Carac = {
    objID: string // Objet, index: 1
    caracID: string // Caractéristique, index: 2
    caracValue: string // Valeur de la caractéristique, index: 12
}

export type SAP_Carac = {
    caracID: string
    caracValues: { value: string, objLinks: string[] }[]
}

// entry types for prices
export type SAP_Prices = {
    articleID: string // article, index: 0
    priceGroup: string // groupe article, index: 5
    price: number // prix base, index: 7
}