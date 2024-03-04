<script lang="ts">
    import { BccSubject, bccActionsAbility } from "../../utils/casl-abilities";

    export let tests:{ action:string, state:string, isWorkingInstance:boolean, isArchived:boolean, attendu:boolean }[] = [
        { action: "delete", state: "initié", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "delete", state: "initié", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "delete", state: "initié", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "delete", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "delete", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "delete", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "delete", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "delete", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "delete", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "delete", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "delete", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "delete", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "delete", state: "actif", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "delete", state: "actif", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "delete", state: "actif", isWorkingInstance:false, isArchived: true, attendu: false },

        { action: "clone", state: "initié", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "clone", state: "initié", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "clone", state: "initié", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "clone", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "clone", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "clone", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "clone", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "clone", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "clone", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "clone", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "clone", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "clone", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "clone", state: "actif", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "clone", state: "actif", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "clone", state: "actif", isWorkingInstance:false, isArchived: true, attendu: true },

        { action: "filter & type", state: "initié", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "filter & type", state: "initié", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "filter & type", state: "initié", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "filter & type", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "filter & type", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "filter & type", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "filter & type", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "filter & type", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "filter & type", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "filter & type", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "filter & type", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "filter & type", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "filter & type", state: "actif", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "filter & type", state: "actif", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "filter & type", state: "actif", isWorkingInstance:false, isArchived: true, attendu: false },

        { action: "enrich", state: "initié", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "enrich", state: "initié", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "enrich", state: "initié", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "enrich", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "enrich", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "enrich", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "enrich", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "enrich", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "enrich", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "enrich", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "enrich", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "enrich", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "enrich", state: "actif", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "enrich", state: "actif", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "enrich", state: "actif", isWorkingInstance:false, isArchived: true, attendu: false },

        { action: "test", state: "initié", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "test", state: "initié", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "test", state: "initié", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "test", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "test", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "test", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "test", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "test", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "test", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "test", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "test", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "test", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "test", state: "actif", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "test", state: "actif", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "test", state: "actif", isWorkingInstance:false, isArchived: true, attendu: true },

        { action: "modelize", state: "initié", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "modelize", state: "initié", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "modelize", state: "initié", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "modelize", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "modelize", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "modelize", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "modelize", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "modelize", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "modelize", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "modelize", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "modelize", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "modelize", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "modelize", state: "actif", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "modelize", state: "actif", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "modelize", state: "actif", isWorkingInstance:false, isArchived: true, attendu: false },

        { action: "archive", state: "initié", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "archive", state: "initié", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "archive", state: "initié", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "archive", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "archive", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "archive", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "archive", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "archive", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "archive", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "archive", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "archive", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "archive", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "archive", state: "actif", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "archive", state: "actif", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "archive", state: "actif", isWorkingInstance:false, isArchived: true, attendu: false },

        { action: "unarchive", state: "initié", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "unarchive", state: "initié", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "unarchive", state: "initié", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "unarchive", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "unarchive", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "unarchive", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "unarchive", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "unarchive", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "unarchive", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "unarchive", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "unarchive", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "unarchive", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: true },
        { action: "unarchive", state: "actif", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "unarchive", state: "actif", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "unarchive", state: "actif", isWorkingInstance:false, isArchived: true, attendu: true },

        { action: "load", state: "initié", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "load", state: "initié", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "load", state: "initié", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "load", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "load", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "load", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "load", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "load", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "load", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "load", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: true },
        { action: "load", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "load", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "load", state: "actif", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "load", state: "actif", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "load", state: "actif", isWorkingInstance:false, isArchived: true, attendu: false },

        { action: "activate", state: "initié", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "activate", state: "initié", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "activate", state: "initié", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "activate", state: "nettoyé & typé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "activate", state: "nettoyé & typé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "activate", state: "nettoyé & typé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "activate", state: "modélisé", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "activate", state: "modélisé", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "activate", state: "modélisé", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "activate", state: "prêt", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "activate", state: "prêt", isWorkingInstance:true, isArchived: false, attendu: true },
        { action: "activate", state: "prêt", isWorkingInstance:false, isArchived: true, attendu: false },
        { action: "activate", state: "actif", isWorkingInstance:false, isArchived: false, attendu: false },
        { action: "activate", state: "actif", isWorkingInstance:true, isArchived: false, attendu: false },
        { action: "activate", state: "actif", isWorkingInstance:false, isArchived: true, attendu: false },
    ];
</script>

<h2>Test BCC ability</h2>
<table class="table table-striped">
    <thead>
        <tr>
            <th>action</th>
            <th>state</th>
            <th>isArchived</th>
            <th>isWorkingInstance</th>
            <th>attendu</th>
            <th>obtenu</th>
        </tr>
    </thead>
    <tbody>
        {#each tests as test}
        <tr>
            <td>{ test.action }</td>
            <td>{ test.state }</td>
            <td>{#if test.isArchived}<span class="badge badge-success">{ test.isArchived }</span>{:else}<span class="badge badge-danger">{ test.isArchived }</span>{/if}</td>
            <td>{#if test.isWorkingInstance}<span class="badge badge-success">{ test.isWorkingInstance }</span>{:else}<span class="badge badge-danger">{ test.isWorkingInstance }</span>{/if}</td>
            <td>{#if test.attendu}<span class="badge badge-success">{ test.attendu }</span>{:else}<span class="badge badge-danger">{ test.attendu }</span>{/if}</td>
            <td>{#if test.attendu === bccActionsAbility.can(test.action, new BccSubject(test.state, test.isWorkingInstance, test.isArchived))}<span class="badge badge-success badg-lg">MATCH OK</span>{:else}<span class="badge badge-danger badge-lg">MATCH KO</span>{/if}</td>
        </tr>
        {/each}
    </tbody>
</table>