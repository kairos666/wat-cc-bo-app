<script lang="ts">
    import { Dialog, DialogDescription, DialogOverlay, DialogTitle } from "@rgossiaux/svelte-headlessui";
    import { bccDelete } from "../../stores/bcc-store";

    export function triggerOpenDialog(deleteTargetId:number, deleteTargetName:string) {
        targetBccName = deleteTargetName;
        targetBccId = deleteTargetId;
        isOpen = true 
    };
    let isOpen:boolean = false;
    let targetBccName:string = "";
    let targetBccId:number = NaN;

    function onSubmit(evt:SubmitEvent) {
        evt.preventDefault();
        bccDelete(targetBccId);
        isOpen = false;
    }
</script>
<Dialog open={ isOpen } class={ isOpen ? "dialog-is-open" : "dialog-is-closed" }>
    <DialogOverlay class="dlg-Overlay" />
    <div class="modal-dialog">
        <div class="modal-content">
            <form on:submit={ onSubmit }>
                <div class="modal-header">
                    <DialogTitle class="modal-title"><i class="fas fa-digital-tachograph"></i> Supprimer un BCC</DialogTitle>
                </div>
                <div class="modal-body">
                    <DialogDescription>Supprimer le BCC <b>{ targetBccName } (#{ targetBccId })</b>, attention cette action est définitive</DialogDescription>
                    <p>Confirmez ou annulez cette action.</p>
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn btn-secondary" on:click={ () => isOpen = false }>Annuler</button>
                    <button type="submit" class="btn btn-danger">Confirmer la suppression définitive</button>
                </div>
            </form>
        </div>
    </div>
</Dialog>