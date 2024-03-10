import type { SAP_Article, SAP_Object, SAP_Carac, SAP_Prices } from '$lib/types/sap-types';
import Dexie, { type Table } from 'dexie';

// INDEXDB handler class
class DexieBCCs extends Dexie {
    articles!: Table<SAP_Article>;
    objects!: Table<SAP_Object>;
    caracs!: Table<SAP_Carac>;
    prices!: Table<SAP_Prices>;

    constructor() {
        super('sap-data');
        this.version(1).stores({ 
            articles: '++articleID',
            objects: '++articleID, objID',
            caracs: '++caracID',
            prices: '++articleID'
        });
    }
}
const db = new DexieBCCs();

export async function clearAllSAPTables() {
    try {
        await Promise.all([
            db.articles.clear(),
            db.objects.clear(),
            db.caracs.clear(),
            db.prices.clear()
        ]);

        return;
    } catch (error) {
        throw new Error(`Failed to perform clear SAP DB TABLES : ${ error }`);
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

export async function bulkUpsertSAPObject(entries:SAP_Object[]) {
    try {
        await db.objects.bulkPut(entries);

        return;
    } catch (error) {
        throw new Error(`Failed to perform action on SAP DB Objects BULK UPSERT ${ entries.map(entry => entry.articleID).join(', ') } : ${ error }`);
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

export async function bulkUpsertSAPPrices(entries:SAP_Prices[]) {
    try {
        await db.prices.bulkPut(entries);

        return;
    } catch (error) {
        throw new Error(`Failed to perform action on SAP DB Objects Caracs links BULK UPSERT ${ entries.map(entry => entry.articleID).join(', ') } : ${ error }`);
    }
}