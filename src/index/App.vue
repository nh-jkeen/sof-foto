<template>
	<img alt="Net Health Logo" class="nh_brand_image" src="../assets/nh_brand.png" />
	<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">

import { defineComponent } from "@vue/runtime-core";
import { HttpClient } from "../models/HttpClient";
import { FotoPatient } from "../models/FotoPatient";
import FHIRClient from "fhirclient";
import HelloWorld from "../components/HelloWorld.vue";
import Client from 'fhirclient/lib/Client';
import * as R4 from 'fhir/r4';

export default defineComponent({
	name: "App",
	components: {
		HelloWorld,
	},
    data: function() {
        return {
            ErrMessage: "",
            InternalPatientID: null,
            OutboundClient: {} as HttpClient,
            FHIRPatient: {} as R4.Patient,
            FHIREncounter: {} as R4.Encounter,
            FHIRPractitioner: {} as R4.Practitioner,
            FHIRLocation: {} as R4.Location,
            SmartClient: {} as Client
        }
	},
    methods: {
        setError: function(message: string){
            this.ErrMessage = message;
            throw Error(message);
        }
    },
    created(){
        const api_key = process.env.VUE_APP_OUTBOUND_APIKEY;
        const api_base = process.env.VUE_APP_OUTBOUND_BASE;

        if(!api_key)
            this.setError("The outbound api key is missing.");

        if(!api_base)
            this.setError("The outbound url is missing.");

        this.OutboundClient = new HttpClient(api_base!, api_key);
    },
    async mounted(){
        await FHIRClient.oauth2.ready()
        .then(
            client => {
                const locationId = client.getState("tokenResponse.location");

                if(locationId === "" || locationId === undefined)
                    this.setError("Unbled to find location identifier on token response");

                this.SmartClient = client as Client;

                return Promise.all([
                    client.patient.read(),
                    client.user.read(),
                    client.encounter.read(),
                    client.request(`Location/${locationId}`)
                ])
            }
        )
        .then(
            async ([patient, practitioner, encounter, location]) => {
                if(!patient) this.setError("Patient not found in EMR.");
                if(!practitioner) this.setError("Practitioner not found in EMR.");
                if(!encounter) this.setError("Encounter not found in EMR.");
                if(!location) this.setError("Location not found in EMR.");
                if(location.alias.length == 0) this.setError("Location alias not found in location response.");

                this.FHIRPatient = patient as R4.Patient;
                this.FHIRPractitioner = practitioner as R4.Practitioner;
                this.FHIREncounter = encounter as R4.Encounter;
                this.FHIRLocation = location as R4.Location;

                const transformedPat = FotoPatient.FromResource(this.FHIRPatient);
                transformedPat.ExternalSiteID = location.alias[0];

                await this.OutboundClient.Post(transformedPat.ToJSON(), "patient2/json")
                .then( 
                    internalPat => {
                        console.log(internalPat);
                        this.InternalPatientID = internalPat.MessageID;
                    }
                )
            },
            err => {
                this.setError(err.error || err);
            }
        )

        console.log(this.InternalPatientID);
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
