<template>
    <div id="episode_view">
        <div class="card">
            <DataTable ref="dt" :value="episodes" v-model:selection="selectedEpisode" dataKey="EpisodeId" class="p-datatable-sm" :paginator="true" :rows="5" :filters="filters" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
                        <img alt="Net Health Logo" class="nh_brand_image" src="../assets/nh_brand.png" />
                        <h5 class="p-mb-2 p-m-md-0 p-as-md-center">Patient Episodes</h5>
                        <Button label="Create Episode" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
					</div>
                </template>

                <Column selectionMode="single" style="width: 3rem" :exportable="false"></Column>
                <Column field="BodyPartText" header="Body Part" :sortable="true" style="min-width:12rem"></Column>
                <Column field="CreateDate" header="Created On" :sortable="true" style="min-width:16rem"></Column>
                <Column field="ImpairmentText" header="Impairment" :sortable="true" style="min-width:10rem">></Column>
                <Column field="TherapistName" header="Therapist" :sortable="true" style="min-width:10rem">></Column>
            </DataTable>
            <div class="episode_details">
                <p>Test1</p>
                <p>Test2</p>
            </div>
        </div>

        <Dialog v-model:visible="episodeDialog" :style="{width:'25rem'}" header="Episode Details" :modal="true" class="p-fluid">
            <div class="p-field">
                <label for="bodypart">Body Part</label>
                <InputText id="bodypart" v-model.trim="episode.BodyPartId" required="true" autofocus :class="{'p-invalid': submitted && !episode.BodyPartId}" />
                <small class="p-error" v-if="submitted && !episode.BodyPartId">A body part is required.</small>
            </div>
            <div class="p-field">
                <label for="caretype">Care Type</label>
                <Dropdown id="caretype" v-model="episode.CareTypeId" :options="statuses" optionLabel="label" placeholder=""></Dropdown>
            </div>

            <div class="p-field">
                <label for="impairment" class="p-mb-3">Impairment</label>
                <Dropdown id="impairment" v-model="episode.Impairment" :options="statuses" optionLabel="label" placeholder=""></Dropdown>
			</div>

            <div class="p-field">
                <label class="p-mb-3">Surgery Type</label>
                <Dropdown id="impairment" v-model="episode.SurgeryType" :options="statuses" optionLabel="label"></Dropdown>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveEpisode" />
            </template>
        </Dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Episode } from "../models/FOTO/Episode";
import { FilterMatchMode } from 'primevue/api';

export default defineComponent({
    name: 'EpisodeList',
    props: {
        episodeArr: Array as PropType<Array<Episode>>,
    },
    data() {
        return {
            episodes: this.episodeArr,
            episodeDialog: false,
            episode: {} as Episode,
            selectedEpisode: this.episodeArr![0],
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            },
            submitted: false,
            statuses: [
				{label: 'INSTOCK', value: 'instock'},
				{label: 'LOWSTOCK', value: 'lowstock'},
				{label: 'OUTOFSTOCK', value: 'outofstock'}
            ]
        }
    },
    methods: {
        openNew() {
            this.episode = new Episode();
            this.submitted = false;
            this.episodeDialog = true;
        },
        hideDialog() {
            this.episodeDialog = false;
            this.submitted = false;
        },
        saveEpisode() {
            this.submitted = true;

            if(this.episode.EpisodeId){
                this.episodeDialog = false;
            }
        }
    }
});
</script>

<style scoped lang="scss">
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-field{
    margin-bottom: .5rem;
}

.episode_details{
    border-top: none;
    border-left: 1px solid #c8c8c8;
    border-right: 1px solid #c8c8c8;
    border-bottom: 1px solid #c8c8c8;
    background: #f4f4f4;
    padding: .5rem;
}
</style>
