<script lang="ts">
    import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@rgossiaux/svelte-headlessui";
    import BccReportModeling from "./BccReportModeling.svelte";
</script>


<TabGroup id="bcc-report-tabs">
    <TabList class="tabList mt-5 mb-3">
        <Tab class={ ({selected}) => selected ? "btn btn-primary" : "btn btn-outline-primary" }>Rapport de modélisation</Tab>
        <Tab class={ ({selected}) => selected ? "btn btn-primary" : "btn btn-outline-primary" }>Rapport de validation</Tab>
    </TabList>
    <TabPanels>
        <TabPanel>
            <BccReportModeling />
        </TabPanel>
        <TabPanel>
            <div class="row">
                <div class="col-lg-12">
                    <div class="alert alert-warning" role="alert">A spécifier TODO</div>
                </div>
            </div>
        </TabPanel>
    </TabPanels>
</TabGroup>
