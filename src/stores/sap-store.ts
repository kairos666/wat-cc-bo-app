import type { SAP_Article, SAP_Object, SAP_Carac, SAP_Prices, SAP_Article_FiltersAndTypes, SAP_Carac_Filters } from '$lib/types/sap-types';
import Dexie, { type Table } from 'dexie';

// INDEXDB handler class
class DexieSAP extends Dexie {
    articles!: Table<SAP_Article>;
    objects!: Table<SAP_Object>;
    caracs!: Table<SAP_Carac>;
    prices!: Table<SAP_Prices>;
    articlesFilterAndTypes!: Table<SAP_Article_FiltersAndTypes>;
    caracsFilters!: Table<SAP_Carac_Filters>;

    constructor() {
        super('sap-data');
        this.version(1).stores({ 
            articles: '++articleID',
            objects: '++articleID, objID',
            caracs: '++caracID',
            prices: '++articleID',
            articlesFilterAndTypes: '++articleID',
            caracsFilters: '++id, caracID, caracValue'
        });
    }
}
const db = new DexieSAP();

export async function clearAllSAPTables() {
    try {
        await Promise.all([
            db.articles.clear(),
            db.objects.clear(),
            db.caracs.clear(),
            db.prices.clear(),
            db.articlesFilterAndTypes.clear(),
            db.caracsFilters.clear()
        ]);

        return;
    } catch (error) {
        throw new Error(`Failed to perform clear SAP DB TABLES : ${ error }`);
    }
}

/**
 * SAP ARTICLES
 */
export async function getAllSAPArticles() {
    try {
        return await db.articles.toArray();
    } catch (error) {
        throw new Error(`Failed to get ALL SAP Articles`);
    }
}

export async function bulkUpsertSAPArticle(entries:SAP_Article[]) {
    try {
        await db.articles.bulkPut(entries);

        return;
    } catch (error) {
        throw new Error(`Failed to perform action on SAP Articles DB BULK UPSERT ${ entries.map(entry => entry.articleID).join(', ') } : ${ error }`);
    }
}

/**
 * SAP OBJETS
 */
export async function bulkUpsertSAPObject(entries:SAP_Object[]) {
    try {
        await db.objects.bulkPut(entries);

        return;
    } catch (error) {
        throw new Error(`Failed to perform action on SAP DB Objects BULK UPSERT ${ entries.map(entry => entry.articleID).join(', ') } : ${ error }`);
    }
}

/**
 * SAP CARACTERISTICS
 */
 export async function getAllSAPCaracteristics() {
    try {
        return await db.caracs.toArray();
    } catch (error) {
        throw new Error(`Failed to get ALL SAP Caracteristics`);
    }
}
export async function bulkUpsertSAPCarac(entries:SAP_Carac[]) {
    try {
        await db.caracs.bulkPut(entries);

        return;
    } catch (error) {
        throw new Error(`Failed to perform action on SAP DB Objects Caracs links BULK UPSERT ${ entries.map(entry => entry.caracID).join(', ') } : ${ error }`);
    }
}

/**
 * SAP TARIFS
 */
export async function bulkUpsertSAPPrices(entries:SAP_Prices[]) {
    try {
        await db.prices.bulkPut(entries);

        return;
    } catch (error) {
        throw new Error(`Failed to perform action on SAP DB Objects Caracs links BULK UPSERT ${ entries.map(entry => entry.articleID).join(', ') } : ${ error }`);
    }
}

/**
 * SAP filtres & types ARTICLES
 */
export async function getAllSAPArticleFiltersAndTypes() {
    try {
        return await db.articlesFilterAndTypes.toArray();
    } catch (error) {
        throw new Error(`Failed to get ALL SAP Article filters and types`);
    }
}

export async function bulkUpsertSAPArticleFiltersAndTypes(entries:SAP_Article_FiltersAndTypes[]) {
    try {
        await db.articlesFilterAndTypes.clear(); // clear old before taking in new ones
        await db.articlesFilterAndTypes.bulkPut(entries);

        return;
    } catch (error) {
        throw new Error(`Failed to perform action on SAP DB article filters & types BULK UPSERT ${ entries.map(entry => entry.articleID).join(', ') } : ${ error }`);
    }
}

/**
 * SAP filtres & types CARACTERISTICS
 */
export async function getAllSAPCaracteristicFilters() {
    try {
        return await db.caracsFilters.toArray();
    } catch (error) {
        throw new Error(`Failed to get ALL SAP Caracs filters`);
    }
}

export async function bulkUpsertSAPCaracFilters(entries:SAP_Carac_Filters[]) {
    try {
        await db.caracsFilters.clear(); // clear old before taking in new ones
        await db.caracsFilters.bulkPut(entries);

        return;
    } catch (error) {
        throw new Error(`Failed to perform action on SAP DB carac filters BULK UPSERT ${ entries.map(entry => entry.caracID).join(', ') } : ${ error }`);
    }
}