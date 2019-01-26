<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { HTTP } from '../service/BasicHttp.class'
import {Observable} from 'rxjs';
import {RESPONSE} from '@/model';
@Component({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {
    created() : void {
		HTTP.get("http://10.0.40.106:8302/recommend/list")
			.subscribe( ( res : RESPONSE ) => {
			    console.log(res) ;
			})
	}
}
</script>
