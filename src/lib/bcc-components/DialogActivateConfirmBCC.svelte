<script lang="ts">
    import { Dialog, DialogDescription, DialogOverlay, DialogTitle } from "@rgossiaux/svelte-headlessui";
    import { bccActivateAction } from "../../stores/bcc-store";

    export function triggerOpenDialog(activateTargetId:number, activateTargetName:string) {
        targetBccName = activateTargetName;
        targetBccId = activateTargetId;
        isOpen = true 
    };
    let isOpen:boolean = false;
    let targetBccName:string = "";
    let targetBccId:number = NaN;

    function onSubmit(evt:SubmitEvent) {
        evt.preventDefault();
        bccActivateAction(targetBccId);
        isOpen = false;
    }
</script>
<Dialog open={ isOpen } class={ isOpen ? "dialog-is-open" : "dialog-is-closed" }>
    <DialogOverlay class="dlg-Overlay" />
    <div class="modal-dialog">
        <div class="modal-content">
            <form on:submit={ onSubmit }>
                <div class="modal-header">
                    <DialogTitle class="modal-title"><i class="fas fa-digital-tachograph"></i> Activer un BCC</DialogTitle>
                </div>
                <div class="modal-body">
                    <DialogDescription>Activer le BCC <b>{ targetBccName } (#{ targetBccId })</b> comme version de référence pour le canal de vente NEW WATBOOK</DialogDescription>
                    <p>Confirmez ou annulez cette action.</p>
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn btn-secondary" on:click={ () => isOpen = false }>Annuler</button>
                    <button type="submit" class="btn btn-success">Confirmer l'activation</button>
                </div>
            </form>
        </div>
    </div>
</Dialog>