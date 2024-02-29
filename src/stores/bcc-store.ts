import Dexie, { liveQuery, type Table } from 'dexie';

export type BccState = 'initié'|'nettoyé & typé'|'modélisé'|'prêt'|'actif'|'archivé';

export type BccMetaData = {
    id: number
    name: string
    state: BccState
    created: number // timestamp
    extractedSapData: number // timestamp
    activated: number|null // timestamp (null = not active)
    isWorkingInstance:boolean // loaded or not
    error: string|null
}

// INDEXDB handler class
class DexieBCCs extends Dexie {
    bccs!: Table<BccMetaData>;

    constructor() {
        super('bcc-meta-data');
        this.version(1).stores({ bccs: '++id, created' });
    }
}
const db = new DexieBCCs();

// all live queries
export const getActiveBcc = liveQuery(() => db.bccs.orderBy('created').toArray().then(bccs => bccs.find(bcc => bcc.state === 'actif')));
export const getLoadedBcc = liveQuery(() => db.bccs.orderBy('created').toArray().then(bccs => bccs.find(bcc => bcc.isWorkingInstance)));
export const getAllBccs = liveQuery(() => db.bccs.orderBy('created').toArray());

// METHODS CRUD
// read BCC
export async function getBCCByID(bccID:number) {
    try {
        const bcc:BccMetaData|undefined = await db.bccs.get(bccID);
        if(bcc === undefined) throw new Error('BCC not found in DB');

        return bcc
    } catch (error) {
        throw new Error(`Failed to get BCC with id#${ bccID } : ${ error }`);
    }
}
// add new BCC
export async function bccCreate(name:string) {
    try {
        const created:number = new Date().getTime();
        const extractedSapData:number = created - Math.random() * 1000 * 60 * 60 * 24 * 7;
        const id:number = await db.bccs.add(({ state: 'initié', name, created, extractedSapData, activated: null, isWorkingInstance: false, error: null } as BccMetaData)); // id is generated
        console.info(`BCC "${ name }" ADDED (id = ${ id })`);
    } catch (error) {
        throw new Error(`Failed to create new BCC ${ name } : ${ error }`);
    }
}
// delete BCC
export async function bccDelete(bccID:number) {
    try {
        await db.bccs.delete(bccID);
        console.info(`BCC ${ bccID } DELETED`);
    } catch (error) {
        throw new Error(`Failed to delete BCC ${ bccID } : ${ error }`);
    }
}
// duplicate BCC
export async function bccDuplicate(cloneName:string, cloneTargetId:number) {
    try {
        const targetBcc:BccMetaData = await getBCCByID(cloneTargetId);
        if(targetBcc.state === 'initié' || targetBcc.state === 'nettoyé & typé') throw new Error(`Forbidden to duplicate BCC with ${ targetBcc.state } state`);
        const cloneState:BccState = (targetBcc.state === 'actif' || targetBcc.state === 'archivé') ? 'prêt' : targetBcc.state;
        const created:number = new Date().getTime();
        const id:number = await db.bccs.add(({ state: cloneState, name: cloneName, created, extractedSapData: targetBcc.extractedSapData, activated: null, isWorkingInstance: false, error: targetBcc.error } as BccMetaData)); // id is generated
        console.info(`BCC "${ cloneName }" DUPLICATED (id = ${ id }, from id = ${ cloneTargetId })`);
    } catch (error) {
        throw new Error(`Failed to duplicate BCC ${ cloneTargetId } : ${ error }`);
    }
}

// METHODS WORKFLOW
// initié --> nettoyé & typé (manual = modéliser)
// initié --> modéliser (manual = modéliser)
// nettoyé & typé --> nettoyé & typé (manual = modéliser)
// nettoyé & typé --> modélisé (manual = modéliser)
export async function bccModelizeAction(bccID:number) {
    try {
        const targetBcc:BccMetaData = await getBCCByID(bccID);
        if(targetBcc.state !== 'initié' && targetBcc.state !== 'nettoyé & typé') throw new Error(`Forbidden to modelize BCC with ${ targetBcc.state } state`);

        const formerState:BccState = targetBcc.state;
        const isSuccess:boolean = (Math.random() <= 0.9); // 90% of success (mock process outcome)

        let newState:BccState;
        if(isSuccess) {
            newState = "modélisé";
            await db.bccs.update(bccID, { state: newState, error: null });
        } else {
            newState = "nettoyé & typé";
            await db.bccs.update(bccID, { state: newState, error: `Seuls ${ Math.floor(Math.random() * 10000) / 100 }% des données ont pu être traitées` });
        }
        
        console.info(`BCC "${ bccID }" MODELIZED (from = ${ formerState }, to = ${ newState })`);
    } catch (error) {
        throw new Error(`Failed to perform action on BCC ${ bccID } : ${ error }`);
    }
}
// modélisé --> prêt (auto)
async function bccReadyAutoTransitionCheck(bccID:number) {
    try {
        const targetBcc:BccMetaData = await getBCCByID(bccID);
        if(targetBcc.state !== 'modélisé') throw new Error(`Forbidden to mark BCC ready with ${ targetBcc.state } state`);

        const formerState:BccState = targetBcc.state;
        const isSuccess:boolean = (Math.random() <= 0.5); // 50% of success (mock process outcome)

        if(isSuccess) {
            const newState:BccState = "prêt";
            await db.bccs.update(bccID, { state: newState, error: null });
            console.info(`BCC "${ bccID }" is READY (from = ${ formerState }, to = ${ newState })`);
        } else {
            console.info(`BCC "${ bccID }" is NOT READY (stay at = ${ formerState }`);
        }
    } catch (error) {
        throw new Error(`Failed to perform action on BCC ${ bccID } : ${ error }`);
    }
}
// prêt --> modélisé (auto)
async function bccUnreadyAutoTransitionCheck(bccID:number) {
    try {
        const targetBcc:BccMetaData = await getBCCByID(bccID);
        if(targetBcc.state !== 'prêt') throw new Error(`Forbidden to mark BCC unready with ${ targetBcc.state } state`);

        const formerState:BccState = targetBcc.state;
        const isSuccess:boolean = (Math.random() <= 0.1); // 10% of success (mock process outcome)

        if(isSuccess) {
            const newState:BccState = "modélisé";
            await db.bccs.update(bccID, { state: newState, error: null });
            console.info(`BCC "${ bccID }" is NOT READY ANYMORE (from = ${ formerState }, to = ${ newState })`);
        } else {
            console.info(`BCC "${ bccID }" is STILL READY (stay at = ${ formerState }`);
        }
    } catch (error) {
        throw new Error(`Failed to perform action on BCC ${ bccID } : ${ error }`);
    }
}

export async function bccEnrichAction(bccID:number) {
    try {
        const targetBcc:BccMetaData = await getBCCByID(bccID);
        if(targetBcc.state === "modélisé") {
            await bccReadyAutoTransitionCheck(bccID);
        } else if(targetBcc.state === "prêt") {
            await bccUnreadyAutoTransitionCheck(bccID);
        }
        
        console.info(`BCC "${ bccID }" ENRICHMENT accounted for`);
    } catch (error) {
        throw new Error(`Failed to perform action on BCC ${ bccID } : ${ error }`);
    }
}
// enrichi --> actif (manuel = Activer)
//TODO
// isWorkingInstance false --> true (manuel = Charger (false tous les autres))
//TODO