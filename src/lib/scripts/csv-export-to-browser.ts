export function csvExportFileToBrowser(fileContentString:string, fileName:string) {
    const blob = new Blob([fileContentString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ fileName }.csv`;
    a.click();
}