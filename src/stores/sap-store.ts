import type { SAP_Article } from '$lib/types/sap-types';
import Dexie, { liveQuery, type Table } from 'dexie';

// INDEXDB handler class
class DexieBCCs extends Dexie {
    articles!: Table<SAP_Article>;

    constructor() {
        super('sap-data');
        this.version(1).stores({ 
            articles: '++articleID' 
        });
    }
}
const db = new DexieBCCs();

export async function bulkUpsertSAPArticle(entries:SAP_Article[]) {
    try {
        await db.articles.bulkPut(entries);
    } catch (error) {
        throw new Error(`Failed to perform action on SAP DB BULK UPSERT ${ entries.map(entry => entry.articleID).join(', ') } : ${ error }`);
    }
}