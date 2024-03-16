import { readable } from 'svelte/store';
import { browser } from '$app/environment';
import { combineLatest, map, Observable } from 'rxjs';
import { sapArticles, sapArticlesFilterAndTypes, sapCaracFilters, sapCaracs, sapObjects, sapPrices } from './sap-store';

export type ReportData = {
    articles: {
        zmatCount: number
        t800Count: number
        totalCount: number
        filterCount: number
        typesCount: number
        groupedByTypeCount: { type:string, count:number }[]
        keptCount: number
        percFiltererd: number
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
}

// db live query report pipe
const modelizeReportObservable = function():Observable<ReportData> {
    return combineLatest([sapArticles, sapObjects, sapCaracs, sapPrices, sapArticlesFilterAndTypes, sapCaracFilters]).pipe(
        map(([articles, objects, caracs, prices, aFiltersTypes, cFilters]) => {
            // articles
            const zmatCount:number = articles.filter(entry => entry.tyar === "ZMAT").length;
            const t800Count:number = articles.filter(entry => entry.tyar === "T800").length;
            const totalCount:number = articles.length;
            const afilterCount:number = aFiltersTypes.filter(entry => entry.isExcluded).length;
            const typesCount:number = aFiltersTypes.filter(entry => entry.type !== "").length;
            const keptCount:number = totalCount - afilterCount;
            const percFiltererd:number = (totalCount > 0)
                ? Math.round(10000 * (keptCount / totalCount)) / 100
                : 0;

            // caracteristics
            const caracCount:number = caracs.length;
            const caracValueCount:number = caracs.reduce((count, curr) => count + curr.caracValues.length, 0);
            const cfilterCount:number = cFilters.length;
            const keptCaracCount:number = 0;
            const keptCaracValueCount:number = caracValueCount - cfilterCount;
            const percFilteredCarac:number = 0;
            const percFilteredCaracValue:number = 0;

            // objects
            const objectCount:number = objects.length;

            // prices
            const priceCount:number = prices.length;

            return {
                articles: {
                    zmatCount,
                    t800Count,
                    totalCount,
                    filterCount: afilterCount,
                    typesCount,
                    groupedByTypeCount: [],
                    keptCount,
                    percFiltererd
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
            groupedByTypeCount: [],
            keptCount: 0,
            percFiltererd: 0
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
        }
    }

    const store =  readable(initialReportStore, (set, update) => {
        // leave early if no access to DB
        if(!browser) return;
        
        modelizeReportObservable().subscribe({
            next: state => update(() => state) 
        })
    });

    return store;
}

export const reportStore = initReportStore();