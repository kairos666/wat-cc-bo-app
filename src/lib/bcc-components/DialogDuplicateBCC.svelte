<script lang="ts">
    import { Dialog, DialogDescription, DialogOverlay, DialogTitle } from "@rgossiaux/svelte-headlessui";
    import { bccDuplicate } from "../../stores/bcc-store";

    export function triggerOpenDialog(cloneTargetId:number, cloneTargetName:string) {
        clonedBccName = cloneTargetName;
        clonedBccId = cloneTargetId;
        isOpen = true 
    };
    let isOpen:boolean = false;
    let clonedBccName:string = "";
    let clonedBccId:number = NaN;
    let bccName:string = "";

    function onSubmit(evt:SubmitEvent) {
        evt.preventDefault();
        bccDuplicate(bccName, clonedBccId);
        isOpen = false;
    }
</script>
<Dialog open={ isOpen } class={ isOpen ? "dialog-is-open" : "dialog-is-closed" }>
    <DialogOverlay class="dlg-Overlay" />
    <div class="modal-dialog">
        <div class="modal-content">
            <form on:submit={ onSubmit }>
                <div class="modal-header">
                    <DialogTitle class="modal-title"><i class="fas fa-digital-tachograph"></i> Dupliquer un BCC</DialogTitle>
                </div>
                <div class="modal-body">
                    <DialogDescription>Cloner le BCC <b>{ clonedBccName } (#{ clonedBccId })</b>, attention les données SAP ne sont pas rafraîchies</DialogDescription>
                    <div class="form-group">
                        <label for="bcc-label">Nom du BCC cloné</label>
                        <input type="text" id="bcc-label" class="form-control" name="bcc-label" placeholder="Nom du BCC" bind:value={ bccName } on:change={ evt => bccName = evt.currentTarget.value } required />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn btn-secondary" on:click={ () => isOpen = false }>Annuler</button>
                    <button type="submit" class="btn btn-primary">Cloner le BCC</button>
                </div>
            </form>
        </div>
    </div>
</Dialog>