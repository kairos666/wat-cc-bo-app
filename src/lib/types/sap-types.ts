// entry types
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