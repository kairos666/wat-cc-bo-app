<script lang="ts">
    import { Dialog, DialogDescription, DialogOverlay, DialogTitle } from "@rgossiaux/svelte-headlessui";
    import { bccArchiveAction } from "../../stores/bcc-store";

    export function triggerOpenDialog(archiveTargetId:number, archiveTargetName:string) {
        targetBccName = archiveTargetName;
        targetBccId = archiveTargetId;
        isOpen = true 
    };
    let isOpen:boolean = false;
    let targetBccName:string = "";
    let targetBccId:number = NaN;

    function onSubmit(evt:SubmitEvent) {
        evt.preventDefault();
        bccArchiveAction(targetBccId);
        isOpen = false;
    }
</script>
<Dialog open={ isOpen } class={ isOpen ? "dialog-is-open" : "dialog-is-closed" }>
    <DialogOverlay class="dlg-Overlay" />
    <div class="modal-dialog">
        <div class="modal-content">
            <form on:submit={ onSubmit }>
                <div class="modal-header">
                    <DialogTitle class="modal-title"><i class="fas fa-digital-tachograph"></i> Archiver un BCC</DialogTitle>
                </div>
                <div class="modal-body">
                    <DialogDescription>Archiver le BCC <b>{ targetBccName } (#{ targetBccId })</b></DialogDescription>
                    <p>Confirmez ou annulez cette action.</p>
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn btn-secondary" on:click={ () => isOpen = false }>Annuler</button>
                    <button type="submit" class="btn btn-dark">Confirmer l'archivage</button>
                </div>
            </form>
        </div>
    </div>
</Dialog>