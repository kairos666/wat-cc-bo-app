<script lang="ts">
    import { Dialog, DialogOverlay, DialogTitle } from "@rgossiaux/svelte-headlessui";
    import { bccCreate } from "../../stores/bcc-store";

    export function triggerOpenDialog() { isOpen = true };
    let isOpen:boolean = false;
    let bccName:string = "";

    function onSubmit(evt:SubmitEvent) {
        evt.preventDefault();
        bccCreate(bccName);
        isOpen = false;
    }
</script>
<Dialog open={ isOpen } class={ isOpen ? "dialog-is-open" : "dialog-is-closed" }>
    <DialogOverlay class="dlg-Overlay" />
    <div class="modal-dialog">
        <div class="modal-content">
            <form on:submit={ onSubmit }>
                <div class="modal-header">
                    <DialogTitle class="modal-title"><i class="fas fa-digital-tachograph"></i> Créer un nouveau BCC</DialogTitle>
                </div>
                <div class="modal-body">
                    <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">Extraction SAP</h4>
                        <p>La dernière extraction SAP mise à disposition est prise en compte dans le BCC résultant.</p>
                    </div>
                    <div class="form-group">
                        <label for="bcc-label">Nom du BCC</label>
                        <input type="text" id="bcc-label" class="form-control" name="bcc-label" placeholder="Nom du BCC" bind:value={ bccName } on:change={ evt => bccName = evt.currentTarget.value } required />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="reset" class="btn btn-secondary" on:click={ () => isOpen = false }>Annuler</button>
                    <button type="submit" class="btn btn-primary">Créer le BCC</button>
                </div>
            </form>
        </div>
    </div>
</Dialog>