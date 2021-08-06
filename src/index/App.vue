
<template>
    <splash
        :show="true"
        :logo="logo"
        color="#F9423A"
        :size="300"
        :fixed="true">
    </splash>

    <Toast />
    
    <h2 v-if="ErrMessage !== ''">{{ ErrMessage }}</h2>
    <div v-else>
        <episode-list :episodeArr="Episodes"></episode-list>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "@vue/runtime-core";
import { HttpClient } from "../models/HttpClient";
// import { Patient } from "../models/FOTO/Patient";
import { Episode } from "../models/FOTO/Episode";
// import FHIRClient from "fhirclient";
import EpisodeList from "../components/Episode.vue";
import Splash from "../components/Splash.vue";
import Client from 'fhirclient/lib/Client';
// import * as R4 from 'fhir/r4';

export default defineComponent({
	name: "App",
	components: {
        Splash,
		EpisodeList,
	},
    data: function() {
        return {
            OutboundClient: {} as HttpClient,
            SmartClient: {} as Client,
            Episodes: new Array<Episode>(),
            ErrMessage: "",
            ExternalSiteID: "",
            ExternalPatientID: "",
            ExternalPatientAlias: "",
            EncounterID: ""
        }
	},
    computed: {
        logo() {
            return require('../assets/nh_brand.png');
        }
    },
    async created(){
        try{
            // const api_key = process.env.VUE_APP_OUTBOUND_APIKEY;
            // const api_base = process.env.VUE_APP_OUTBOUND_BASE;
    
            // if(!api_key)
            //     throw new Error("The outbound api key is missing.");
    
            // if(!api_base)
            //     throw new Error("The outbound url is missing.");
    
            // this.OutboundClient = new HttpClient(api_base!, api_key);
            // this.SmartClient = await FHIRClient.oauth2.ready();
            
            // const patient = await this.SmartClient.patient.read();
            // if(!patient) 
            //     throw new Error("Patient not found in EMR.");
            
            // if(patient.birthDate === "")
            //     throw new Error("Unable to find patient birthdate. Please provide a birthdate for this patient.");

            // const locationId = this.SmartClient.getState("tokenResponse.loginDepartment");
            // if(locationId === "" || locationId === undefined)
            //     throw new Error("Unbled to find location identifier on token response");
    
            // const location = await this.SmartClient.request(`Location/${locationId}`);
            // if(!location) 
            //     throw new Error("Location not found in EMR.");
    
            // const transformedPat = Patient.FromResource(patient as R4.Patient);
            // transformedPat.ExternalSiteID = location.name;

            // const patCreateResponse = await this.OutboundClient.Post(transformedPat.ToJSON(), "patient2/json");
            // if(!patCreateResponse.Success)
            //     throw new Error(`Error creating or updating patient: ${patCreateResponse.Text}`);
    
            this.Episodes = await this.OutboundClient.MockGetPatientEpisodes(`episode/json/${1}`);
        }
        catch(ex){
            this.ErrMessage = (ex as Error).message;
        }
    },
    async mounted(){
        this.$toast.add({severity:'success', summary: 'Success Message', detail:'Order submitted', life: 3000});
    }
});
</script>

<style lang="scss">
.nh_brand_image{
    width: 10rem;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin-top: 1rem;
}
</style>
