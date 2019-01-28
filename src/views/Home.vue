<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
		<form id="form">
			<input type="text" formcontrol = 'data' v-model="form.controls.data.value">
			{{ form.controls.data.value }}
			<span>
				{{ form.controls.data.valid }}
			</span>
		</form>
		<button @click="submit()"> 确定 </button>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { FormGroup } from '@/utils/form'
import { Validators } from '@/utils/form/Validator';
@Component({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {
    form : FormGroup = new FormGroup({
        data : [ ""  , [ Validators.required ] ]
	});
    created() : void {
        // HTTP.setHeader("Accept-Language" ,"en-us")
		//
		// const header = new HttpHeaders()
		// 	.set("Content-type" , "application/xml") ;
		//
        // const para = new HttpParams()
		// 	.set("a" , "1") ;
		//
		// HTTP.get("http://10.0.40.106:8302/recommend/list" , {
		//     headers : header ,
		// 	params : para
		// })
		// 	.subscribe( ( res : RESPONSE ) => {
		// 	    console.log(res) ;
		// 	})
		//
		// JsBridgeService.getNum() ;
	}

    submit() :void{
        this.form.patchValue({ data : 123 }) ;
        // console.log( this.form.value() ) ;
	}
}
</script>
