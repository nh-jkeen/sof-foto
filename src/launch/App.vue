<template>
    <div></div>
</template>

<script lang="ts">
import FHIR from "fhirclient";
import { defineComponent } from "vue";

export default defineComponent({
	name: "App",
	components: {},
	async mounted() {
		FHIR.oauth2.authorize({
			client_id: "e20b94f7-9bcc-49ae-a534-4856166edd80",
			scope: "launch online_access openid fhirUser",
            completeInTarget: true
		});
	},
});
</script>

<style scoped lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
