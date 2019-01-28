<template>
	<div class="wrapper">
		<div class="container flex-row-center">
			<div class="wheelWrap">
				<div class="pointerWrap" @click='makeAward()'>
					<img src="../assets/start.png" class="img-res" style="z-index:3;position: relative;">
					<img src="../assets/point.png" alt="" class="point">
				</div>
			</div>
			<div class="shadow" v-show="toast_control">
				<div class="toast">
					<div class="toast-container">
						<div class="toast-title">
							{{toast_title}}
						</div>
						<div class="toast-btn">
							<div class="toast-cancel" @click="close_toast">关闭</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="textWrap">
			<div class="awardPeople">
				<div>
					当前中奖 :
				</div>
				<div class="animateWrap">
					<span class="awardPeople_Ani_first" v-for=" item in awardFirst ">
					  恭喜{{ item }}
					</span>
				</div>
			</div>
			<div class="rule">
				<h4>活动规则</h4>
				<div>
					<p>1.本次抽奖为春节福气抽奖。预祝大家新年快乐，满载而归。</p>
					<p>2.抽奖截止时间为农历一月十五（新历2月19日）。下期抽奖时间请留意APP内公告，或我司OA界面。</p>
					<p>3.本次抽奖，奖品均为我司承担，与其他任何机构或公司无关。</p>
					<p>4.本次活动中奖后，1至2个工作日，工作人员会与您取得联系，请确保您的通讯正常。奖品会在7至15个工作日送达。</p>
					<p>5.每位贵宾与我司工作人员均能参加三次抽奖。</p>
				</div>

				<h4 style="margin-top: 20px;">声明</h4>
				<div>
					<p>1.本次活动在法律规定的范围内我司拥有解释权。</p>
					<p>2.具体细节可在活动页面了解。有疑问的请在意见反馈页面留下您宝贵的意见。</p>
					<p>3.本次抽奖由我司独立举办，与其它组织机构或公司无关。</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {JsCallService} from "@/service/device";
import {LocalStorageService} from '@/service/storage';
function randomNum(minNum: any, maxNum: any): any {
	switch (arguments.length) {
		case 1:
			return parseInt((Math.random() * minNum + 1) as any, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}

@Component({
	components: {},
})
export default class Index extends Vue {
	toast_control = false;
	toast_title = "";
	awardFirst: any[] = [];

	created(): void {
		this.fadeNum();
		JsCallService.event$
			.subscribe( (event : any ) => {
			    // this.toast_show( event.event + "|" + event.data , true) ;
			})
	};

	close_toast() :void {
		window.location.reload();
	};

	toast_show(str: string, mark: boolean) : void {
		const _this = this;
		this.toast_title = str;
		this.toast_control = true;
	} ;

	go(i: number, msg: string) : void {
	    const count = LocalStorageService.get("count") ;

	    if(count > 3 ){
	        this.toast_show("抽奖次数耗尽" , true );
	        return ;
		};

		let el = document.querySelector(".pointerWrap") as HTMLDivElement;

		let deg = 360 * 3 + 60 * i;
		el.style.transition = "transform 3s ease";
		el.style.transform = "rotate(" + deg + "deg)";

		setTimeout(() => {
			if ( i == 4 ) {
				this.toast_show(msg, true);
			} else {
				this.toast_show(msg, false);
			}
		}, 3200);
	};

	makeAward() : void {
	    const count = LocalStorageService.get("count") || 0 ;
	    LocalStorageService.set("count" , count / 1 + 1) ;
		this.go(3, "看起来运气不太好呢,抽中了谢谢参与");
	}

	fadeNum() : void {
		for (var i = 0; i < 50; i++) {
			let fakeNumFi = "1" + randomNum(3, 9) + "*****" + randomNum(1000, 9999);
			let item = fakeNumFi + "抽中了" + ["一等奖", "二等奖", "三等奖"][randomNum(0, 2)];
			this.awardFirst.push(item);
		}
	}
}
</script>
<style>
	.wrapper {
		width: 100%;
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
		background: url('../assets/bg.png') round;
	}

	.rule {
		width: 70%;
		margin: 0 auto;
		padding: 10px 10px 10px 20px;
		background: #fff;
		border-radius: 5px;
		text-align: left;
	}

	.rule > h4 {
		margin: 0;
		padding: 0;
		color: #ff5a29;
	}

	.rule p {
		margin: 0;
		padding: 0;
		font-size: 0.8rem;
		color: #525252;
		margin: 5px 0;
	}

	.awardPeople {
		margin-left: calc(15% - 10px);
		margin-bottom: 10px;
		color: #ff5a29;
		font-weight: bold;
		font-size: 16px;
		position: relative;
		overflow: hidden;
		height: 20px;
		line-height: 20px;
		display: flex;
		flex-direction: row;
	}

	.textWrap {
		background: #fedc78;
		padding-bottom: 1rem;
	}

	.wheelWrap {
		width: 20.4375rem;
		height: 20.4375rem;
		background: url("../assets/draw_wheel.png") no-repeat center top;
		background-size: 100%;
		color: #fff;
		font-weight: 500;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		margin-top: 5rem;
		position: relative;
	}

	.img-res {
		display: block;
		width: 100%;
		height: 100%;
	}

	.pointerWrap {
		width: 7rem;
		height: 7rem;
		position: relative;
		left: 6.8rem;
	}

	.point {
		position: absolute;
		top: -2.4rem;
		left: 2.8rem;
		width: 1.2rem;
		z-index: 2;
	}

	.flex-row-center {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center
	}

	.toast-mask {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 10000;
		width: 100%;
		height: 100%;
	}

	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 20000;
		transform: translate(-50%, -50%);
		width: 15.4375rem;
		background: #fff;
		border-radius: 0.3125rem;
		padding: 0.3125rem;
		background-color: rgb(252, 244, 224);
	}

	.toast-container {
		position: relative;
		width: 100%;
		height: 100%;
		border: 1px dotted #fccc6e;
	}

	.toast-picture {
		position: absolute;
		top: -6.5rem;
		left: -1.5rem;
		width: 18.75rem;
		height: 8.5625rem;
	}

	.toast-pictrue-change {
		position: absolute;
		top: -1.5rem;
		left: -1.375rem;
		width: 17.5rem;
		height: 3.125rem;
	}

	.toast-title {
		padding: 2.8125rem 0;
		font-size: 18px;
		color: #fc7939;
		text-align: center;
	}

	.toast-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.9375rem;
	}

	.toast-btn div {
		background-image: -moz-linear-gradient(
				-18deg,
				rgb(242, 148, 85) 0%,
				rgb(252, 124, 88) 51%,
				rgb(252, 124, 88) 99%
		);

		background-image: -ms-linear-gradient(
				-18deg,
				rgb(242, 148, 85) 0%,
				rgb(252, 124, 88) 51%,
				rgb(252, 124, 88) 99%
		);
		background-image: -webkit-linear-gradient(
				-18deg,
				rgb(242, 148, 85) 0%,
				rgb(252, 124, 88) 51%,
				rgb(252, 124, 88) 99%
		);
		box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
		width: 4.6875rem;
		height: 1.875rem;
		border-radius: 1.875rem;
		text-align: center;
		line-height: 1.875rem;
		color: #fff;
	}

	.close {
		position: absolute;
		top: -0.9375rem;
		right: -0.9375rem;
		width: 2rem;
		height: 2rem;
		background-size: 100%;
	}

	.shadow {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .6);
		position: fixed;
		z-index: 999;
	}

	.animateWrap {
		-webkit-animation-timing-function: linear;
		-webkit-animation-duration: 150s;
		-webkit-animation-fill-mode: forwards;
		-webkit-animation-iteration-count: infinite;
		-webkit-animation-name: scrollFirst;
		position: relative;
	}

	.awardPeople span {
		display: block;
		margin-bottom: 10px;
		font-size: 15px;
		text-indent: 10px;
	}

	@-webkit-keyframes scrollFirst {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-1000px);
		}
	}
</style>
