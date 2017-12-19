<template>
	<div class="container">
		<img src="../assets/img/home/hongbaobg.png" class="hongbaoBottom" />
		<img src="../assets/img/home/kuangkuang.png" class="kuangkuang" />
		<img @click="isShowGZ=true" src="../assets/img/home/huodongguize.png" class="guize" />
		<img src="../assets/img/home/title.png" class="title" />
		<img src="../assets/img/home/meihua.png" class="meihua" />
		<img src="../assets/img/home/ji.png" class="jixiangwu" />
		<img @click="gotoNwePage()" src="../assets/img/home/xuyuanbtn.png" class="xuyuanbtn" />
		<img @click="gotoABSPage()" src="../assets/img/home/logo.png" class="absBottom" />

		<!--规则  开始-->
		<div :class="{'show':isShowGZ}" class="xuancolor">
			<div class="bg"></div>
			<div class="xuankp">
				<img class="homeImage" src="../assets/img/wish/guizebg.png" />
				<div class="xuankpdiv">
					<img @click="isShowGZ=false" src="../assets/img/wish/guanbi.png" class="guanbi" />
				</div>
			</div>
		</div>
		<!--规则  结束-->
	</div>
</template>
<script>
	import $ from 'zepto'
	//import html2canvas from 'html2canvas'
	//import StackBlur from 'stackblur-canvas' 

	export default {
		route: {
			data() {
				return this.$http.jsonp('tasks.json')
					.then(({
						data: {
							code,
							message,
							data
						}
					}) => {
						this.$set('tasks', data)
					})
				self.setXuanKPHeight()
			}
		},
		methods: {
			gotoNwePage() {
				this.$route.router.go({
					path: '/wish',
					replace: false
				})
			},
			gotoABSPage() {
				window.location.href = 'https://www.asb.co.nz/'
			},
			setXuanKPHeight() {
				$(".xuancolor .xuankp").each(function() {
					$(this).css("margin-top", -($(this).height() / 2) + "px");
				})
			}
		},
		ready() {
			let self = this
			self.setXuanKPHeight()
			setTimeout(function() {
				self.setXuanKPHeight()
			}, 500);
		},
		data() {
			return {
				isShowGZ: false,
				banner: [],
				tasks: []
			}
		}
	}
</script>

<style>
	.homeImage {
		position: relative;
		z-index: 8;
	}
	
	.container {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
		-webkit-overflow-scrolling: touch;
		background: url(../assets/img/home/bg.jpg) no-repeat center center;
		background-size: 100% 100%;
	}
	
	.hongbaoBottom {
		position: absolute;
		height: auto;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 1;
	}
	
	.kuangkuang {
		position: absolute;
		height: 100%;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 2;
	}
	
	.absBottom {
		position: fixed;
		height: auto;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 9;
	}
	
	.guize {
		position: absolute;
		height: auto;
		width: 80%;
		top: 13%;
		margin-left: -40%;
		left: 50%;
		z-index: 3;
	}
	
	.title {
		position: absolute;
		height: auto;
		width: 96%;
		top: 3%;
		margin-left: -48%;
		left: 50%;
		z-index: 4;
	}
	
	.meihua {
		position: absolute;
		height: auto;
		width: 100%;
		top: 0;
		z-index: 5;
	}
	
	.jixiangwu {
		position: absolute;
		top: 21%;
		width: 44%;
		left: 50%;
		margin-left: -22%;
		z-index: 6;
	}
	
	.xuyuanbtn {
		position: absolute;
		width: 74%;
		height: auto;
		left: 50%;
		bottom: 11%;
		margin-left: -37%;
		z-index: 8;
		-webkit-animation: tiaodong .5s linear infinite;
		animation: tiaodong .5s linear infinite;
	}
	
	@keyframes tiaodong {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}
	
	@-webkit-keyframes tiaodong {
		0% {
			-webkit-transform:  scale(1);
		}
		50% {
			-webkit-transform:  scale(1.05);
		}
		100% {
			-webkit-transform:  scale(1);
		}
	}
	
	.xuancolor {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		visibility: hidden;
	}
	
	.xuancolor .bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: #000000;
		opacity: 0.8;
	}
	
	.xuankp {
		position: relative;
		display: table;
		margin: auto;
		width: 92%;
		z-index: 100;
		top: 50%;
		margin-top: -176px;
		overflow: auto;
	}
	
	.show {
		visibility: visible;
	}
	
	.xuankpdiv .guanbi {
		position: absolute;
		top: -58px;
		z-index: 100;
		width: 48px;
		height: 48px;
		right: 0;
	}
	
	.xuankpdiv {
		position: absolute;
		top: 0;
		bottom: 0;
		padding: 24px;
		left: 0;
		right: 0;
		text-align: center;
		font-size: 16px;
		color: #231815;
	}
</style>