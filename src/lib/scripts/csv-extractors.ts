import Papa from 'papaparse';

// parse csv
type EntryBuilder<T> = (stepResult:Papa.ParseStepResult<string[]>) => T;
export function parseCSV<U>(file:File, objectBuilder:EntryBuilder<U>, expectedHeaders:string[] = []):Promise<U[]> {
    return new Promise((complete, error) => {
        let headers:U;
        const entries:U[] = [];

        Papa.parse((file as any), { 
            skipEmptyLines: true,
            worker: true,
            step: function(result:Papa.ParseStepResult<string[]>) {
                if(!headers) {
                    headers = objectBuilder(result);

                    // check format (if expectedHeaders provided)
                    switch(true) {
                        case (expectedHeaders.length === 0): /* no check necessary */ break;
                        case (expectedHeaders.length !== result.data.length): error('CSV format has wrong number of columns'); break;
                        case (!result.data.every((header, index) => (header === expectedHeaders[index]))): error('CSV format has wrong columns (name or placement)'); break;
                    }
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