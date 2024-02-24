<div class="card card-light">
    <div class="card-body">
        <form class="btn-toolbar d-flex justify-content-between" style="gap:1rem;" aria-label="Toolbar with button groups">
            <div class="btn-group" style="max-width:300px;" role="group" aria-label="recherche">
                <label for="searchTable" class="col-form-label pr-2"><i class="fas fa-search pr-2"></i><span class="sr-only">Recherche</span></label>
                <input type="search" class="form-control" id="searchTable">
                <button type="button" class="btn btn-outline-secondary">Filtrer</button>
            </div>
            <div class="btn-group flex-grow-1" role="group" aria-label="selection"></div>
            <div class="btn-group" role="group" aria-label="items affichés">
                <button type="button" class="btn btn-outline-success"><i class="fas fa-plus pr-2"></i>Ajouter TVA</button>
            </div>
            <div class="btn-group" role="group" aria-label="Third group">
                <button id="massActionTrigger" disabled class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" style="height:38px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-tasks pr-2"></i>Actions de masse</button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="actionButton-2">
                    <button type="button" data-toggle="modal" data-target="#multi-row-delete" class="dropdown-item"><i class="fas fa-trash pr-2"></i>Supprimer les éléments sélectionnés</button>
                </div>
            </div>
            <div class="btn-group" role="group" aria-label="Third group">
                <button type="button" class="btn btn-outline-secondary"><i class="fas fa-download pr-2"></i>Export CSV</button>
                <button type="button" class="btn btn-outline-secondary"><i class="fas fa-upload pr-2"></i>Import CSV</button>
            </div>
        </form>
    </div>
</div>