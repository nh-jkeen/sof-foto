<script lang="ts">
const FHIR = require("fhirclient");
import { defineComponent } from "vue";

export default defineComponent({
	name: "App",
	components: {},
	async mounted() {
		FHIR.oauth2.authorize({
			client_id: "2324c9fc-e12e-4c55-afa8-4fe046c50949",
			scope: "launch patient/*.read online_access openid fhirUser",
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
