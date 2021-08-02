
<template>
	<img alt="Net Health Logo" class="nh_brand_image" src="../assets/nh_brand.png" />

    <h2 v-if="ErrMessage !== ''">{{ ErrMessage }}</h2>
    <div v-else>
        <episode-list :episodes="Episodes"></episode-list>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "@vue/runtime-core";
import { HttpClient } from "../models/HttpClient";
// import { Patient } from "../models/FOTO/Patient";
import { Episode } from "../models/FOTO/Episode";
// import FHIRClient from "fhirclient";
import EpisodeList from "../components/Episode.vue";
import Client from 'fhirclient/lib/Client';
// import * as R4 from 'fhir/r4';

export default defineComponent({
	name: "App",
	components: {
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
    async created(){
        try{
            const api_key = process.env.VUE_APP_OUTBOUND_APIKEY;
            const api_base = process.env.VUE_APP_OUTBOUND_BASE;
    
            if(!api_key)
                throw new Error("The outbound api key is missing.");
    
            if(!api_base)
                throw new Error("The outbound url is missing.");
    
            this.OutboundClient = new HttpClient(api_base!, api_key);
            // this.SmartClient = await FHIRClient.oauth2.ready();
            
            // const patient = await this.SmartClient.patient.read();
            // if(!patient) 
            //     throw new Error("Patient not found in EMR.");
            
            // if(patient.birthDate === "")
            //     throw new Error("Unable to find patient birthdate. Please provide a birthdate for this patient.");

            // const locationId = this.SmartClient.getState("tokenResponse.location");
            // if(locationId === "" || locationId === undefined)
            //     throw new Error("Unbled to find location identifier on token response");
    
            // const location = await this.SmartClient.request(`Location/${locationId}`);
            // if(!location || location.alias.length == 0) 
            //     throw new Error("Location not found in EMR.");
    
            // const transformedPat = Patient.FromResource(patient as R4.Patient);
            // transformedPat.ExternalSiteID = location.alias[0];
    
            // const patCreateResponse = await this.OutboundClient.Post(transformedPat.ToJSON(), "patient2/json");

            // if(!patCreateResponse.Success)
            //     throw new Error(`Error creating or updating patient: ${patCreateResponse.Text}`);
    
            // this.Episodes = await this.OutboundClient.Get(`episode/json/${1}`);
            this.Episodes = [
                {
                    "BodyPartId": 18,
                    "BodyPartText": "Lumbar Spine",
                    "CreateDate": new Date(parseInt("/Date(1627055636747-0400)/".replace('/Date(', ''))).toLocaleString(),
                    "EpisodeId": 21152,
                    "ImpairmentId": 50,
                    "ImpairmentText": "NOC-musculo-skeletal disorder",
                    "TherapistName": "Han Solo"
                },
                {
                    "BodyPartId": 18,
                    "BodyPartText": "Lumbar Spine",
                    "CreateDate": "/Date(1627055636747-0400)/",
                    "EpisodeId": 21152,
                    "ImpairmentId": 50,
                    "ImpairmentText": "NOC-musculo-skeletal disorder",
                    "TherapistName": "Han Solo"
                },
            ] as Array<Episode>;
        }
        catch(ex){
            this.ErrMessage = (ex as Error).message;
        }
    },
    async mounted(){
    }
});
</script>

<style lang="scss">
.nh_brand_image{
    width: 25rem;
}
html{
    background-color: $nhCharcoal;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	margin-top: 60px;
}
</style>
