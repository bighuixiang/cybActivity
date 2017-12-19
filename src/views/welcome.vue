<template>
	<div class="loading">
		<div class="jindutiaowc">
			<div class="fgjindutiao">
				<div class="faguangji guodu" :style="{left: total + '%' }">
					<img src='../assets/img/welcome/qidongji.png' class="ji" />
					<img src='../assets/img/welcome/faguang.png' class="faguang" />
				</div>
				<div class="jindubg">
					<img :style="{width: total + '%' }" src="../assets/img/welcome/jindutiaoqian.png" class="jindutiao guodu" />
				</div>
				<p class="ptitle">{{total}}%正在加载中...</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		ready() {
				this.loadImage()
			},
			data() {
				return {
					progress: 0,
					interval: null
				}
			},
			computed: {
				total() {
					return parseInt(this.progress)
				}
			},
			methods: {
				loadImage() {
					this.interval = setInterval(() => {
						this.addNum()
					}, 350);
				},
				addNum() {
					this.progress += 20 * Math.random()
					this.progress = Math.min(100, this.progress)
					if(this.total === 100) {
						clearInterval(this.interval);
						setTimeout(() => {
							console.log(1231);
							this.$route.router.go({
								path: '/home',
								replace: true
							})
						}, 1000)
					}
				}
			}
	}
</script>

<style scoped>
	.loading {
		position: absolute;
		width: 100%;
		height: 100%;
		background: url(../assets/img/welcome/qidongBG.png) no-repeat center center;
		background-size: 100% 100%;
	}
	
	.jindutiaowc {
		position: absolute;
		margin-top: -50px;
		width: 100%;
		top: 50%;
	}
	
	.fgjindutiao {
		position: relative;
		width: 88%;
		left: 50%;
		margin-left: -44%;
	}
	
	.jindubg {
		position: relative;
		width: 100%;
		height: 12px;
		background: url(../assets/img/welcome/jindutiaobg.png) no-repeat center center;
		background-size: 100% 100%;
	}
	
	.jindutiao {
		width: 60%;
		height: 12px;
		border-radius: 50px;
		background-color: #fcc800;
	}
	
	.faguang {
		width: 42px;
		display: table;
		margin-left: 17px;
	}
	
	.ji {
		width: 50px;
		height: auto;
	}
	
	.faguangji {
		position: absolute;
		left: 60%;
		top: -72px;
		margin-left: -54px;
		z-index: 1;
	}
	
	.ptitle {
		color: #FDC300;
		font-size: 12px;
		margin-top: 18px;
		text-align: center;
		font-size: 18px;
	}
	
	.guodu {
		transition: all 0.2s ease-out;
		-webkit-transition: all 0.2s ease-out;
	}
</style>