<script lang="ts">
    import CollectionFooter from "./CollectionFooter.svelte";

</script>

<div class="card">
    <div class="card-body">
        <table class="table dataTable">
            <thead>
                <tr>
                    <th rowspan="1" colspan="1" aria-sort="ascending" scope="col" style="width:20px;" class="m-0 pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBoxAll" value="selectAll">
                            <label class="form-check-label sr-only" for="selectBoxAll">Tout sélectionner</label>
                        </div>    
                    </th>
                    <th class="sorting sorting_asc" tabindex="0" rowspan="1" colspan="1" aria-sort="ascending" scope="col">ID</th>
                    <th scope="col" tabindex="0" rowspan="1" colspan="1" >Nom</th>
                    <th class="sorting sorting_desc" tabindex="0" rowspan="1" colspan="1" aria-sort="descending" scope="col">Pourcentage</th>
                    <th scope="col" tabindex="0" rowspan="1" colspan="1" style="width:150px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBox1" value="select1">
                            <label class="form-check-label sr-only" for="selectBox1"><span class="sr-only">Sélectionner</span></label>
                        </div>    
                    </td>
                    <th>1</th>
                    <td>TVA N°1</td>
                    <td>10</td>
                    <td>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-eye"></i><span class="sr-only"> Voir fiche détaillée</span></button>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pen"></i><span class="sr-only"> Éditer</span></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i><span class="sr-only"> Supprimer</span></button>
                    </td>
                </tr>
                <tr>
                    <td class="pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBox2" value="select2">
                            <label class="form-check-label sr-only" for="selectBox2"><span class="sr-only">Sélectionner</span></label>
                        </div>    
                    </td>
                    <th>2</th>
                    <td>TVA N°2</td>
                    <td>20,6</td>
                    <td>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-eye"></i><span class="sr-only"> Voir fiche détaillée</span></button>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pen"></i><span class="sr-only"> Éditer</span></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i><span class="sr-only"> Supprimer</span></button>
                    </td>
                </tr>
                <tr>
                    <td class="pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBox3" value="select3">
                            <label class="form-check-label sr-only" for="selectBox3"><span class="sr-only">Sélectionner</span></label>
                        </div>    
                    </td>
                    <th>3</th>
                    <td>TVA N°3</td>
                    <td>15,7</td>
                    <td>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-eye"></i><span class="sr-only"> Voir fiche détaillée</span></button>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pen"></i><span class="sr-only"> Éditer</span></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i><span class="sr-only"> Supprimer</span></button>
                    </td>
                </tr>
                <tr>
                    <td class="pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBox4" value="select4">
                            <label class="form-check-label sr-only" for="selectBox4"><span class="sr-only">Sélectionner</span></label>
                        </div>    
                    </td>
                    <th>4</th>
                    <td>TVA N°4</td>
                    <td>17,68</td>
                    <td>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-eye"></i><span class="sr-only"> Voir fiche détaillée</span></button>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pen"></i><span class="sr-only"> Éditer</span></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i><span class="sr-only"> Supprimer</span></button>
                    </td>
                </tr>
                <tr>
                    <td class="pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBox5" value="select5">
                            <label class="form-check-label sr-only" for="selectBox5"><span class="sr-only">Sélectionner</span></label>
                        </div>    
                    </td>
                    <th>4</th>
                    <td>TVA N°5</td>
                    <td>32,4</td>
                    <td>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-eye"></i><span class="sr-only"> Voir fiche détaillée</span></button>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pen"></i><span class="sr-only"> Éditer</span></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i><span class="sr-only"> Supprimer</span></button>
                    </td>
                </tr>
                <tr>
                    <td class="pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBox6" value="select6">
                            <label class="form-check-label sr-only" for="selectBox6"><span class="sr-only">Sélectionner</span></label>
                        </div>    
                    </td>
                    <th>6</th>
                    <td>TVA N°6</td>
                    <td>12</td>
                    <td>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-eye"></i><span class="sr-only"> Voir fiche détaillée</span></button>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pen"></i><span class="sr-only"> Éditer</span></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i><span class="sr-only"> Supprimer</span></button>
                    </td>
                </tr>
                <tr>
                    <td class="pl-0 pr-2">
                        <div class="form-check form-check-inline m-0">
                            <input class="form-check-input m-0" type="checkbox" id="selectBox7" value="select7">
                            <label class="form-check-label sr-only" for="selectBox7"><span class="sr-only">Sélectionner</span></label>
                        </div>    
                    </td>
                    <th>7</th>
                    <td>TVA N°7</td>
                    <td>15,12</td>
                    <td>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-eye"></i><span class="sr-only"> Voir fiche détaillée</span></button>
                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pen"></i><span class="sr-only"> Éditer</span></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i><span class="sr-only"> Supprimer</span></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <CollectionFooter />
</div>