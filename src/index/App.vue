<template>
	<img alt="Net Health Logo" class="nh_brand_image" src="../assets/nh_brand.png" />
	<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
const FHIR = require("fhirclient");
import HelloWorld from "../components/HelloWorld.vue";

export default {
	name: "App",
	components: {
		HelloWorld,
	},
	async mounted() {
		const smartClient: any = await new Promise(function (resolve: any,reject: any) {
			FHIR.oauth2.ready(function (smart: any, err: any) {
				if (err) {
					reject(err);
				}

				resolve(smart);
			});
		});

		const pat = await smartClient.patient.read();
		console.log(pat);

		const prc = await smartClient.user.read();
		console.log(prc);
	},
};
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
	// color: #2c3e50;
	margin-top: 60px;
}
</style>
