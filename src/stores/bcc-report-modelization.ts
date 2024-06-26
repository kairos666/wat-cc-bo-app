import { readable } from 'svelte/store';
import { browser } from '$app/environment';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { sapArticles, sapArticlesFilterAndTypes, sapCaracFilters, sapCaracs, sapObjects, sapPrices } from './sap-store';
import type { SAP_Article, SAP_Article_FiltersAndTypes, SAP_Carac, SAP_Object } from '$lib/types/sap-types';
import _ from 'lodash';

export type ReportData = {
    articles: {
        zmatCount: number
        t800Count: number
        totalCount: number
        filterCount: number
        typesCount: number
        groupedByType: { type:string, count:number, articles:TypedArticle[] }[]
        keptCount: number
        percFiltererd: number
        percTyped: number
    }
    caracteristics: {
        caracCount: number
        caracValueCount: number
        filterCount: number
        keptCaracCount: number
        keptCaracValueCount: number
        percFilteredCarac: number
        percFilteredCaracValue: number
    }
    objects: {
        objectCount: number
    }
    prices: {
        priceCount: number
    }
    analytics: {
        linkedZmatCount: number
        linkedT800Count: number
        linkedObjectCount: number
        linkedCaracCount: number
        linkedCaracValueCount: number
    }
}

type TypedArticle = SAP_Article & { type: string|null }
type LinkedArticle = { 
    articleID: string
    tyar: string
    objID: string|null
    caracLinks: { carac: string, caracValues: string[] }[]|null
}

// db live query report pipe
const modelizeReportObservable = function():Observable<ReportData> {
    return combineLatest([sapArticles, sapObjects, sapCaracs, sapPrices, sapArticlesFilterAndTypes, sapCaracFilters]).pipe(
        map(([articles, objects, caracs, prices, aFiltersTypes, cFilters]) => {
            // all articles
            const zmatCount:number = articles.filter(entry => entry.tyar === "ZMAT").length;
            const t800Count:number = articles.filter(entry => entry.tyar === "T800").length;
            const totalCount:number = articles.length;
            // only included articles
            const filteredTypedArticles:TypedArticle[] = (articles.map(entry => {
                const { articleID } = entry;
                let foundFilterTypeEntry:SAP_Article_FiltersAndTypes = aFiltersTypes.find(ftEntry => ftEntry.articleID === articleID) ?? { articleID, isExcluded: false, type: "" };
                const finalType:string|null = (foundFilterTypeEntry.type !== "")
                    ? foundFilterTypeEntry.type
                    : null;

                return (!foundFilterTypeEntry.isExcluded)
                    ? { ...entry, type: finalType }
                    : null
            }).filter(entry => entry !== null) as TypedArticle[]);
            const groupedByTypesFilteredArticles = _.groupBy(filteredTypedArticles, entry => entry.type);
            const afilterCount:number = totalCount - filteredTypedArticles.length;
            const keptCount:number = filteredTypedArticles.length;
            const percFiltererd:number = (totalCount > 0)
                ? Math.round(10000 * (keptCount / totalCount)) / 100
                : 0;
            const groupedByType:{ type:string, count:number, articles:TypedArticle[] }[] = Object.entries(groupedByTypesFilteredArticles)
                .map(([type, articles]) => ({ type, count: articles.length, articles  }))
                .sort((a, b) => (a.type === "null" && b.type === "produit racine") 
                    ? -1
                    : (a.type === "produit racine" && b.type === "null")
                    ? 1
                    : (a.type === "produit racine")
                    ? -1
                    : (a.type === "null")
                    ? -1
                    : (b.type === "produit racine")
                    ? 1
                    : (b.type === "null")
                    ? 1
                    : (a.type > b.type) 
                    ? 1 
                    : (a.type < b.type) 
                    ? -1 
                    : 0
                );
            const typesCount:number = filteredTypedArticles.filter(entry => entry.type !== null).length;
            const percTyped:number = (keptCount > 0)
                ? Math.round(10000 * (typesCount / keptCount)) / 100
                : 0;

            // all caracteristics
            const caracCount:number = caracs.length;
            const caracValueCount:number = caracs.reduce((count, curr) => count + curr.caracValues.length, 0);
            
            // only included caracteristics
            const filteredCaracs:SAP_Carac[] = (caracs.map((entry) => {
                const { caracID, caracValues } = entry;
                // remove all filtered entries from value
                const filteredCaracValues = caracValues.filter(({ value }) => !cFilters.some(filter => (filter.caracID === caracID && filter.caracValue === value)));

                return (filteredCaracValues.length > 0)
                    ? { ...entry, caracValues: filteredCaracValues }
                    : null;
            }).filter(entry => entry !== null) as SAP_Carac[]);
            const cfilterCount:number = cFilters.length;
            const keptCaracValueCount:number = filteredCaracs.reduce((count, curr) => count + curr.caracValues.length, 0);
            const keptCaracCount:number = filteredCaracs.length;
            const percFilteredCarac:number = (caracCount > 0)
                ? Math.round(10000 * (keptCaracCount / caracCount)) / 100
                : 0;
            const percFilteredCaracValue:number = (caracValueCount > 0)
                ? Math.round(10000 * (keptCaracValueCount / caracValueCount)) / 100
                : 0;

            // objects
            const objectCount:number = objects.length;

            // prices
            const priceCount:number = prices.length;

            // analytics (filters applied)
            const allLinkedArticlesArray:LinkedArticle[] = filteredTypedArticles
                .map(aEntry => ({ articleID: aEntry.articleID, tyar: aEntry.tyar }))
                .map(aEntry => {
                    const objID = objects.find(oEntry => oEntry.articleID === aEntry.articleID)?.objID ?? null;

                    return { ...aEntry, objID };
                })
                .map(aEntry => {
                    // leave early if no objID
                    if(aEntry.objID === null) return { ...aEntry, caracLinks: null };

                    const matchingCaracs = filteredCaracs.reduce((matchingCaracs, carac) => {
                        const { caracID, caracValues } = carac;
                        const matchingCaracValues:string[] = caracValues
                            .filter(cvEntry => cvEntry.objLinks.includes((aEntry.objID as string)))
                            .map(cvEntry => cvEntry.value);

                        return (matchingCaracValues.length > 0)
                            ? [...matchingCaracs, { carac: caracID, caracValues: matchingCaracValues }]
                            : matchingCaracs;
                    }, ([] as { carac: string, caracValues: string[] }[]));

                    return (matchingCaracs.length > 0)
                        ? { ...aEntry, caracLinks: matchingCaracs }
                        : { ...aEntry, caracLinks: null };
                })
            const fullyLinkedArticlesArray:LinkedArticle[] = allLinkedArticlesArray.filter(entry => (entry.objID !== null && entry.caracLinks !== null));
            const caracLinks:{ carac: string, caracValues: string[] }[] = (fullyLinkedArticlesArray.map(entry => entry.caracLinks) as { carac: string, caracValues: string[] }[][]).reduce((caracs, entry) => [...caracs, ...entry], ([] as { carac: string, caracValues: string[] }[]));
            const linkedZmatCount:number = fullyLinkedArticlesArray.filter(entry => (entry.tyar === "ZMAT")).length;
            const linkedT800Count:number = fullyLinkedArticlesArray.filter(entry => entry.tyar === "T800").length;
            const linkedObjectCount:number = new Set(...fullyLinkedArticlesArray.map(entry => entry.objID)).size;
            const linkedCaracCount:number = new Set(...caracLinks.map(entry => entry.carac)).size;
            const linkedCaracValueCount:number = caracLinks.reduce((valuesCount, entry) => valuesCount + entry.caracValues.length, 0);

            return {
                articles: {
                    zmatCount,
                    t800Count,
                    totalCount,
                    filterCount: afilterCount,
                    typesCount,
                    groupedByType,
                    keptCount,
                    percFiltererd,
                    percTyped
                },
                caracteristics: {
                    caracCount,
                    caracValueCount,
                    filterCount: cfilterCount,
                    keptCaracCount,
                    keptCaracValueCount,
                    percFilteredCarac,
                    percFilteredCaracValue
                },
                objects: {
                    objectCount
                },
                prices: {
                    priceCount
                },
                analytics: {
                    linkedZmatCount,
                    linkedT800Count,
                    linkedObjectCount,
                    linkedCaracCount,
                    linkedCaracValueCount
                }
            }
        })
    )
}

const initReportStore = () => {
    const initialReportStore:ReportData = {
        articles: {
            zmatCount: 0,
            t800Count: 0,
            totalCount: 0,
            filterCount: 0,
            typesCount: 0,
            groupedByType: [],
            keptCount: 0,
            percFiltererd: 0,
            percTyped: 0
        },
        caracteristics: {
            caracCount: 0,
            caracValueCount: 0,
            filterCount: 0,
            keptCaracCount: 0,
            keptCaracValueCount: 0,
            percFilteredCarac: 0,
            percFilteredCaracValue: 0
        },
        objects: {
            objectCount: 0
        },
        prices: {
            priceCount: 0
        },
        analytics: {
            linkedZmatCount: 0,
            linkedT800Count: 0,
            linkedObjectCount: 0,
            linkedCaracCount: 0,
            linkedCaracValueCount: 0
        }
    }

    const store =  readable(initialReportStore, (set, update) => {
        // leave early if no access to DB
        if(!browser) return;
        
        const subscription:Subscription = modelizeReportObservable().subscribe({
            next: state => update(() => state) 
        })

        return () => subscription.unsubscribe();
    });

    return store;
}

export const reportStore = initReportStore();