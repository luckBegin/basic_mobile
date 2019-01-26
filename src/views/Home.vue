<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
	</div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import {HTTP, HttpHeaders, HttpParams} from "@/service/BasicHttp.class";
import { RESPONSE } from '@/model';
import { JsBridgeService  , JsCallService } from '@/service/device';
@Component({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {
    created() : void {
        HTTP.setHeader("Accept-Language" ,"en-us")

		const header = new HttpHeaders()
			.set("Content-type" , "application/xml") ;

        const para = new HttpParams()
			.set("a" , "1") ;

		HTTP.get("http://10.0.40.106:8302/recommend/list" , {
		    headers : header ,
			params : para
		})
			.subscribe( ( res : RESPONSE ) => {
			    console.log(res) ;
			})

		JsBridgeService.getNum() ;
	}
}
</script>
