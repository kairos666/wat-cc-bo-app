import Papa from 'papaparse';

// parse csv
type EntryBuilder<T> = (stepResult:Papa.ParseStepResult<string[]>) => T;
export function parseCSV<U>(file:File, objectBuilder:EntryBuilder<U>):Promise<U[]> {
    return new Promise((complete, error) => {
        let headers:U;
        const entries:U[] = [];

        Papa.parse((file as any), { 
            skipEmptyLines: true,
            worker: true,
            step: function(result:Papa.ParseStepResult<string[]>) {
                if(!headers) {
                    headers = objectBuilder(result);
                } else {
                    // entries
                    entries.push((objectBuilder(result)));
                }
            },
            complete: () => {
                console.info(`CSV headers considered: ${ Object.entries(headers).map(([prop, value]) => `${ prop } = ${ value }`).join(', ') }`);
                complete(entries);
            },
            error
        });
    });
}