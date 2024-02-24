<div class="card-footer d-flex  justify-content-between">
    <div class="flex-grow-1 mt-2">
        <p role="status" style="display:inline-block;" class="flex-grow-1 mb-0 mr-5" aria-live="polite">Affichage de 1 à 7 sur 7 entrées</p>
        <label for="itemsShown" class="col-form-label mr-2">Items affichés</label>
        <select id="itemsShown" aria-controls="table" style="max-width:200px;" class="custom-select form-control">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
    </div>
    <ul class="pagination mb-0">
        <li class="paginate_button page-item previous disabled" id="table_previous">
            <a aria-controls="table" aria-disabled="true" aria-role="link" data-dt-idx="previous" tabindex="0" class="page-link">Précédente</a>
        </li>
        <li class="paginate_button page-item active">
            <a href="#" aria-controls="table" aria-role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a>
        </li>
        <li class="paginate_button page-item next disabled" id="table_next">
            <a href="#" aria-controls="table" aria-role="link" data-dt-idx="next" tabindex="0" class="page-link">Suivante</a>
        </li>
    </ul>
</div>