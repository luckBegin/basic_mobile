<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
		<form id="form">
			<input type="text" v-model="form.controls.data.value">
			<div v-for="item in form.controls.arr.controls">
				<input type="text" v-model="item.controls.name.value">
				{{ item.controls.name.value }}
			</div>
			<span> {{ form.valid }}</span>
		</form>
		<button :disabled="!form.valid" @click="submit()"> 确定 </button>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { FormBuilder , FormGroup , Validators } from "@/utils/form";
@Component({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {
    form : FormGroup = FormBuilder.group({
        data : [ ""  , [ Validators.required ] ] ,
		arr : FormBuilder.array( [
            { name : [null , [ Validators.min(5)] ] }
        ])
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
        console.log(this.form.value()) ;
	}
}
</script>
