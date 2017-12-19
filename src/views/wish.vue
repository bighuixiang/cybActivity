<template>
	<div :style="{'padding-top':'60px','padding-bottom':'94px'}" class="container1" :class="{pdb60px:isShowSFZF}">
		<div v-show="isMe" class="herder">
			<p>当前累计愿望:</p>
			<ul>
				<li v-for="(index,value) in XYSumNum" track-by="$index">
					<div>
						{{value}}
					</div>
				</li>
			</ul>
			<div v-show="!isShowklhbNum" class="zhezhao">
				<div class="bg"></div>
				<div class="zi">
					许愿领新年红包>邀请好友送祝福>祝福每积累3次再领红包
				</div>
			</div>
			<div v-show="isShowklhbNum" class="zhezhao">
				<div class="bg"></div>
				<div class="zi">您已经收集到{{zfList.num}}个好友祝福<span style="color: #f03329;">(可领取{{klhbNum}}个红包)</span></div>
			</div>
		</div>
		<div v-show="!isMe" class="herder herder2">
			<img @click="woyeyaoxuyuan" class="xuyuanlinghongbao" src="../assets/img/wish/xuyuanlinghongbao.png" />
			<div class="userInfo">
				<span>你很菜额</span>
				<img src="../../dist/static/img/1.5558801.jpg" />
			</div>
		</div>
		<div class="content" :style="{'padding-top':'36px'}">
			<div class="kapian kapian-huang" :style="{'background-color': backGroundBg}">
				<img src="../assets/img/wish/kpbg.png" />
				<div class="kpcontent">
					<img class="userImg" :src="headimgurl" />
					<p>{{nick_name}}</p>
					<div>{{yuanwangyu}}</div>
				</div>
				<img src="../assets/img/wish/kapianji.png" class="kapian-ji" />
			</div>
			<div v-show="!isShowSFYXY&&isMe" class="searchWish">
				<div class="bg"></div>
				<div @click="isShowOuthYW=true" class="wishcontent">
					不知道许什么愿望，先看看别人的愿望吧
				</div>
			</div>
			<div v-show="isShowSFYXY || !isMe" class="woshoudaodezhufu">
				<img v-show="isMe" class="woshoudaodezhufu-img" src="../assets/img/wish/woshoudaodezhufu.png" />
				<img v-show="!isMe" class="woshoudaodezhufu-img" src="../assets/img/wish/tashoudaodezhufu.png" />
				<div class="zhufulist">
					<ul>
						<li v-for="item in zfList.data" track-by="$index">
							<div class="ullioutdiv">
								<div class="bg"></div>
								<div>
									<img :src="item.headimgurl" />
									<p>{{item.bless_word}}</p>
								</div>
							</div>
						</li>
					</ul>
					<div v-show="isMe && zfList.num<=0" class="not-data">
						<div class="bg"></div>
						<div class="content">您还没有收到祝福哦，喊上好友为您集祝福领红包吧！</div>
					</div>

					<div v-show="!isMe && zfList.num<=0" class="not-data">
						<div class="bg"></div>
						<div class="content">TA还没有收到祝福哦，快送上你的祝福吧！</div>
					</div>
				</div>
			</div>
		</div>
		<!--底部 开始-->
		<div v-show="isMe">
			<div v-show="!isShowSFYXY" class="footer">
				<div>
					<input v-model='xinyuan' :value="xinyuan" type="text" maxlength="50" placeholder="许下心愿就能拿红包哟" />
				</div>
				<img @click="xuyuan" src="../assets/img/wish/btn.png" />
			</div>
			<div v-show="isShowSFYXY" class="footer1">
				<ul>
					<li @click="linghongbao">
						<div>
							<span v-show="isShowklhbNum">{{klhbNum}}</span>
							<img v-show="isShowklhbNum" src="../assets/img/wish/lingquhongbao.png" />
							<img v-show="!isShowklhbNum" src="../assets/img/wish/bukelingquhongbao.png" />
						</div>
					</li>
					<li @click="share">
						<div>
							<img src="../assets/img/wish/jizhufu.png" />
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div v-show="!isMe">
			<div v-show="!isShowSFZF" class="footer">
				<div>
					<input v-model='zhufutext' type="text" maxlength="50" placeholder="给好友送祝福,助TA拿红包" />
				</div>
				<img @click="zhufu" src="../assets/img/wish/zhufubtn.png" />
			</div> 
			<img v-show="isShowSFZF" @click="gotoABSPage()" src="../assets/img/home/logo.png" class="absBottom" />
		</div>
		<!--底部 结束-->
		<div :class="{'show':isShowXC}" class="xuancolor">
			<div class="bg"></div>
			<div class="xuankp">
				<img src="../assets/img/wish/tcbg.png" />
				<div class="xuankpdiv">
					<img @click="isShowXC=false" src="../assets/img/wish/guanbi.png" class="guanbi" />
					<p class="sbxxxxx">给你的愿望卡选个颜色吧</p>
					<ul>
						<li v-for="(index,item) in kpbgList">
							<div>
								<span @click="xuanyanse(index)" :style="{'background-color': item.color}" :class="{'cur':item.isCur}"></span>
							</div>
						</li>
					</ul>
					<img @click="queding" src="../assets/img/wish/queding.png" class="queding" />
				</div>
			</div>
		</div>
		<div :class="{'show':isShowOuthYW}" class="xuancolor">
			<div class="bg"></div>
			<img @click="gotoABSPage()" src="../assets/img/home/logo.png" class="absBottom" />
			<div class="xuankp">
				<div :style="{'width': guanbiwd +'px'}" class="guanbidiv">
					<img @click="isShowOuthYW=false" src="../assets/img/wish/guanbi.png" class="guanbi" />
				</div>
				<div class="swiper-container" id="viewSwiper">
					<div class="swiper-wrapper" style="margin-left: 18px;">
						<div v-for="item in trywList" class="swiper-slide">
							<div class="kapian" :style="{'background-color' : item.wish_back,'width':'100%'}">
								<img src="../assets/img/wish/kpbg.png" />
								<div class="kpcontent">
									<img class="userImg" :src="item.headimgurl" />
									<p>{{item.nick_name}}</p>
									<div>{{item.wish}}</div>
								</div>
								<img src="../assets/img/wish/kapianji.png" class="kapian-ji" />
							</div>
						</div>
					</div>
				</div>
				<div :style="{'width': guanbiwd +'px','margin-top':'32px'}" class="guanbidiv">
					<div class="zuoyoubtn">
						<img @click="shangyiye" style="margin-right: 128px;" src="../assets/img/wish/shang.png" />
						<img @click="xiayiye" src="../assets/img/wish/xia.png" />
					</div>
				</div>
			</div>
		</div>
		<div :class="{'show':isShowXYCG}" class="xuancolor">
			<div class="bg"></div>
			<div class="xuankp">
				<img src="../assets/img/wish/hongbao.png" />
				<div class="xuankpdiv">
					<img @click="isShowXYCG=false" src="../assets/img/wish/guanbi.png" class="guanbi" />
					<div class="tishi">
						<p>恭喜您许愿成功</p>
						<p>获得一个红包</p>
					</div>
					<img @click="kaihongbao" src="../assets/img/wish/kai.png" class="kaihongbao" />
				</div>
			</div>
		</div>
		<!--红包中奖了 开始-->
		<div :class="{'show':isShowHBZJ}" class="xuancolor">
			<div class="overauto">
				<img src="../assets/img/wish/choujiangbg.png" class="choujkiangbg" />
				<img src="../assets/img/wish/erweima.png" class="erweima" />
				<img @click="gotoABSPage()" src="../assets/img/home/logo.png" class="absBottom" />
				<div class="zhongjiangxinxi">
					<img class="xuanzhuan" src="../assets/img/wish/guangzhao.png" />
					<div class="centerDiv">
						<h1>恭喜您中奖啦</h1>
						<img class="xingxingbg" src="../assets/img/wish/xingxing.png" />
						<img class="zhongjiangxinxi-img" src="../../dist/static/img/1.jpg" style="position: relative;z-index: 2;" />
						<div class="titile">
							恭喜您幸运儿，你抽中了由ASB赞助的奖品：
						</div>
						<div class="jpname">
							《iPad Pro 一台》
						</div>
					</div>
				</div>
				<img @click="lingquliwu()" class="lingquliwu" src="../assets/img/wish/lingquliwu.png" />
				<p class="yaoqinghaoyou">邀请好友为你送祝福每集齐3个可再抽一次</p>
			</div>
		</div>
		<!--红包中奖了 结束-->
		<!--红包未中奖 开始-->
		<div :class="{'show':isShowHBWZJ}" class="xuancolor">
			<div class="overauto">
				<img src="../assets/img/wish/choujiangbg.png" class="choujkiangbg" />
				<img src="../assets/img/wish/erweima.png" class="erweima" />
				<img @click="gotoABSPage()" src="../assets/img/home/logo.png" class="absBottom" />
				<div class="zhongjiangxinxi">
					<img class="xuanzhuan" src="../assets/img/wish/guangzhao.png" />
					<div class="centerDiv">
						<h1>未中奖</h1>
						<img class="xingxingbg" src="../assets/img/wish/xingxing.png" />
						<img class="zhongjiangxinxi-img zhongjiangxinxi-img1" src="../assets/img/home/ji.png" />
						<div class="titile">
							<p>别灰心，大奖擦肩而过</p>
							<p>但ASB已为你</p>
							<p>许下最美的愿望</p>
						</div>
					</div>
				</div>
				<img @click="zaichouyici()" class="lingquliwu" src="../assets/img/wish/zaichouyici.png" />
				<p class="yaoqinghaoyou">邀请好友为你送祝福每集齐3个可再抽一次</p>
			</div>
		</div>
		<!--红包未中奖 结束-->
		<!--红包中奖 填写地址信息  开始-->
		<div :class="{'show':isShowTXZJXX}" class="xuancolor">
			<div class="bg"></div>
			<div class="xuankp">
				<img src="../assets/img/wish/zhongjiangdizhi.png" />
				<div class="xuankpdiv">
					<img @click="isShowTXZJXX=false" src="../assets/img/wish/guanbi.png" class="guanbi" />
					<p class="zhongjiangtitle">恭喜您幸运儿快补全领奖信息吧</p>
					<div class="inputs">
						<div class="input">
							<div>姓名</div>
							<div>
								<input v-model='userName' type="text" maxlength="35" placeholder="请输入您的姓名" />
							</div>
						</div>
						<div class="input">
							<div>电话</div>
							<div>
								<input v-model='phone' type="tel" maxlength="35" placeholder="请输入您的电话" />
							</div>
						</div>
						<div class="input">
							<div>收货地址</div>
							<div>
								<input v-model='address' type="text" maxlength="128" placeholder="请输入您的收货地址" />
							</div>
						</div>
					</div>
					<img @click="tijiaozhongjiang" src="../assets/img/wish/tijiao.png" class="kaihongbao" style="width: 50%;margin-left: -25%;" />
				</div>
			</div>
		</div>
		<!--红包中奖 填写地址信息  结束-->
		<!--领取成功提示 开始-->
		<div :class="{'show':isShowTXZJXXCG}" class="xuancolor">
			<div class="bg"></div>
			<div class="xuankp">
				<img class="lingquchenggong" src="../assets/img/wish/lingquchenggongtishi.png" />
				<img @click="zaichouyici()" class="lingquliwu" src="../assets/img/wish/zaichouyici.png" />
				<p class="yaoqinghaoyou">邀请好友为你送祝福每集齐3个可再抽一次</p>
			</div>
			<img @click="gotoABSPage()" src="../assets/img/home/logo.png" class="absBottom" />
		</div>
		<!--领取成功提示 结束-->
		<!--分享 开始-->
		<div :class="{'show':isShowShare}" class="xuancolor" @click="isShowShare=false">
			<div class="bg"></div>
			<img class="shareimg" src="../assets/img/wish/fenxiang.png" />
			<img @click="gotoABSPage()" src="../assets/img/home/logo.png" class="absBottom" />
		</div>
		<!--分享 结束-->

		<!--祝福成功  开始-->
		<div :class="{'show':isShowSFZFCG}" class="xuancolor">
			<div class="bg"></div>
			<div class="xuankp">
				<img src="../assets/img/wish/zhufuchenggongbeijing.png" />
				<div class="xuankpdiv">
					<img @click="isShowSFZFCG=false" src="../assets/img/wish/guanbi.png" class="guanbi" />
					<p class="zhongjiangtitle" style="font-size: 20px;top: 14%;color: #fcc800;">祝福成功</p>
					<div class="dajiba">
						<img src="../assets/img/wish/tongyongji.png" />
						<p>只要许愿就能领红包哟</p>
					</div>
					<img @click="woyeyaoxuyuan" src="../assets/img/wish/woyaoxuyuan.png" class="kaihongbao" style="width: 64%;margin-left: -32%;bottom: 20px;" />
				</div>
			</div>
		</div>
		<!--祝福成功  结束-->

	</div>
</template>
<script>
	import $ from 'zepto'
	import Swiper from 'swiper'
	import {
		WishApi,
		QueryRedCountApi,
		OpenRedApi,
		QueryWishStateApi,
		UpdateAddressApi,
		QueryTotalWishApi,
		QueryOtherWishApi,
		QueryBlessApi,
		BlessApi,
		QueryBlessStateApi
	} from '../api'
	//import html2canvas from 'html2canvas'
	//import StackBlur from 'stackblur-canvas' 

	export default {
		route: {
			data() {
				let self = this
				let wd = Math.min($(window).width(), window.screen.width) - 36
				self.$nextTick(() => {
					// DOM 现在更新了，调用轮播组件。 
				})
				self.setXuanKPHeight()
			}
		},
		computed: {
			isShowklhbNum() {
				return this.klhbNum > 0
			},
			isMe() {
				let shareId = this.queryString('shareId')
				if(shareId == null || shareId == this.uid || shareId == '') {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			gotoNwePage() {
				this.$route.router.go({
					path: '/wish',
					replace: true
				})
			},
			searchMyZf() {
				//查看我的祝福
				this.$http.jsonp(QueryBlessApi + '&uid=' + this.uid).then(function(response) {
					if(response.data.code == 200) {
						this.zfList = response.data
						if(this.zfList.data.length > 0) {
							this.zfList.data.forEach((x, i) => {
								this.zfList.data[i].bless_word = decodeURI(x.bless_word)
							})
						}
					} else {
						$.toast('网络连接失败，请重新试试吧！', 2000, 'success top');
					}
				})
			},
			searchShareZf() {
				//查看分享者的祝福
				this.$http.jsonp(QueryBlessApi + '&uid=' + this.queryString('shareId')).then(function(response) {
					if(response.data.code == 200) {
						this.zfList = response.data
						if(this.zfList.data.length > 0) {
							this.zfList.data.forEach((x, i) => {
								this.zfList.data[i].bless_word = decodeURI(x.bless_word)
							})
						}
						console.log(this.zfList.data);
					} else {
						$.toast('网络连接失败，请重新试试吧！', 2000, 'success top');
					}
				})
			},
			searchXYSum() {
				//查看许愿总数 
				this.$http.jsonp(QueryTotalWishApi + '&uid=' + this.uid).then(function(response) {
					if(response.data.code == 200) {
						this.XYSumNum = this.XYSunNumString(response.data.num)
					} else {
						$.toast('网络连接失败，请重新试试吧！', 2000, 'success top');
					}
				})
			},
			XYSunNumString(num) {
				let tempNum = num + ''
				let ary = [0, 0, 0, 0, 0, 0]
				let j = 5
				for(let i = tempNum.length - 1; i >= 0; i--) {
					if(i <= 5) {
						ary[j] = tempNum[i] - 0;
						j--
					}
				}
				return ary;
			},
			searchIsXy() {
				//查看是否已许愿
				this.$http.jsonp(QueryWishStateApi + '&uid=' + this.uid).then(function(response) {
					if(response.data.code == 200) {
						if(response.data.wish_state == 1) {
							//已许愿
							this.yuanwangyu = decodeURI(response.data.wish)
							this.backGroundBg = this.kpbgList[response.data.wish_back].color
							this.nick_name = response.data.nick_name
							this.headimgurl = response.data.headimgurl

							this.isShowSFYXY = true
							this.$http.jsonp(QueryRedCountApi + '&uid=' + this.uid).then(function(response) {
								if(response.data.code == 200) {
									this.klhbNum = response.data.num
								}
							})
						} else {
							//未许愿
							this.isShowSFYXY = false
							this.klhbNum = 0
						}
					} else {
						$.toast('网络连接失败，请重新试试吧！', 2000, 'success top');
					}
				})
			},
			searchShareIsXy() {
				//查看分享者是否已许愿
				this.$http.jsonp(QueryWishStateApi + '&uid=' + this.queryString('shareId')).then(function(response) {
					if(response.data.code == 200) {
						if(response.data.wish_state == 1) {
							//已许愿
							this.yuanwangyu = decodeURI(response.data.wish)
							this.backGroundBg = this.kpbgList[response.data.wish_back].color
							this.nick_name = response.data.nick_name
							this.headimgurl = response.data.headimgurl
						}
					} else {
						$.toast('网络连接失败，请重新试试吧！', 2000, 'success top');
					}
				})
			},
			xuyuan() {
				//弹出选颜色界面  
				if(this.xinyuan.trim() == '') {
					$.toast('您还没有许下任何愿望哦！', 2000, 'success top');
					return false;
				}
				this.isShowXC = true
				this.setXuanKPHeight()
			},
			xuanyanse(index) {
				//切换颜色
				this.kpbgList.forEach(
					(x) => {
						if(x.isCur) {
							x.isCur = false
							return
						}
					}
				)
				this.kpbgList[index].isCur = true
			},
			queding() {
				//确定许愿   
				let color = 0;
				this.kpbgList.forEach((x, i) => {
					if(x.isCur)
						color = i
				})
				$.showPreloader('许愿中,请稍候...');
				this.$http.jsonp(WishApi + '&uid=' + this.uid + '&wish_back=' + color + "&wish=" + this.xinyuan.trim()).then(function(response) {
					$.hidePreloader();
					if(response.data.code == 200) {
						this.isShowXC = false //关闭选择卡片背景色确定许愿界面
						this.isShowXYCG = true //打开开红包界面 
						this.setXuanKPHeight()
						this.searchIsXy()
					} else {
						$.toast('许愿失败了呢，重新试试吧！', 2000, 'success top');
					}
				})
			},
			shangyiye() {
				//上一页
				this.swiper.slidePrev();
			},
			xiayiye() {
				//下一页
				this.swiper.slideNext();
			},
			kaihongbao() {
				//开红包
				$.showPreloader('抽奖中,请稍候...');
				this.$http.jsonp(QueryRedCountApi + '&uid=' + this.uid).then(function(response) {
					$.hidePreloader();
					if(response.data.code == 200) {
						if(response.data.num > 0) {
							this.$http.jsonp(OpenRedApi + '&uid=' + this.uid).then(function(response) {
								if(response.data.code == 200) {
									this.searchIsXy()
									this.isShowXYCG = false
									if(response.data.award_state == 1) {
										this.isShowHBZJ = true
									} else {
										this.isShowHBWZJ = true
									}
								} else {
									$.toast('打开红包失败了呢，重新试试吧！', 2000, 'success top');
								}
							})
						} else {
							$.toast('可开红包个数不足，快去完成任务吧！', 2000, 'success top');
							this.isShowXYCG = false //许愿成功
							this.isShowHBZJ = false //打开红包 中奖
							this.isShowHBWZJ = false //打开红包 未中奖
							this.isShowTXZJXX = false //填写中奖信息
							this.isShowTXZJXXCG = false
						}
					} else {
						$.toast('打开红包失败了呢，重新试试吧！', 2000, 'success top');
					}
				})
			},
			linghongbao() {
				//开红包
				this.kaihongbao()
			},
			share() {
				this.isShowShare = true
			},
			setXuanKPHeight() {
				$(".xuancolor .xuankp").each(function() {
					$(this).css("margin-top", -($(this).height() / 2) + "px");
				})
			},
			gotoABSPage() {
				window.location.href = 'https://www.asb.co.nz/'
			},
			lingquliwu() {
				//领取礼物
				this.isShowHBZJ = false
				this.isShowTXZJXX = true
			},
			zaichouyici() {
				//再抽一次 
				this.isShowXYCG = false //许愿成功
				this.isShowHBZJ = false //打开红包 中奖
				this.isShowHBWZJ = false //打开红包 未中奖
				this.isShowTXZJXX = false //填写中奖信息
				this.isShowTXZJXXCG = false
				this.kaihongbao()
			},
			tijiaozhongjiang() {
				//提交中奖信息
				if(this.userName.trim() == '') {
					$.toast('请输入您的姓名！', 2000, 'success top');
					return false
				}
				if(this.phone.trim() == '') {
					$.toast('请输入您的电话！', 2000, 'success top');
					return false
				}
				if(this.address.trim() == '') {
					$.toast('请输入您的收货地址！', 2000, 'success top');
					return false
				}
				$.showPreloader('提交中,请稍候...');
				this.$http.jsonp(UpdateAddressApi + '&uid=' + this.uid + '&name=' + this.userName.trim() + "&phone=" + this.phone.trim() + "&address=" + this.address.trim()).then(function(response) {
					$.hidePreloader();
					if(response.data.code == 200) {
						this.isShowTXZJXX = false
						this.isShowTXZJXXCG = true
					} else {
						$.toast('信息填写失败了呢，重新试试吧！', 2000, 'success top');
					}
				})
			},
			zhufu() {
				//好友送祝福
				if(this.zhufutext.trim() == '') {
					$.toast('您还没有填写给好友送祝福哦！', 2000, 'success top');
					return false;
				}
				$.showPreloader('提交中,请稍候...');
				this.$http.jsonp(BlessApi + '&uid=' + this.uid + '&share_id=' + this.queryString('shareId') + "&bless_word=" + this.zhufutext.trim()).then(function(response) {
					$.hidePreloader();
					if(response.data.code == 200) {
						this.isShowSFZFCG = true //显示祝福成功
						this.isShowSFZF = true //是否祝福
						self.searchShareZf() //查询分享者的祝福
						self.searchISShrareZf() //查看是否祝福过分享者 
					} else {
						$.toast('提交失败了呢，重新试试吧！', 2000, 'success top');
					}
				})
			},
			woyeyaoxuyuan() {
				//我也要许愿
				this.$route.router.go({
					path: '/welcome?uid=' + this.uid,
					replace: false
				})
			},
			searchTRYW() {
				//查看他人愿望
				this.$http.jsonp(QueryOtherWishApi + '&uid=' + this.uid).then(function(response) {
					if(response.data.code == 200) {
						let newList = [];
						response.data.data.forEach((x) => {
							x.wish = decodeURI(x.wish)
							x.wish_back = this.kpbgList[x.wish_back].color
							newList.push(x)
						})
						this.trywList = newList
						setTimeout(() => {
							let wd = Math.min($(window).width(), window.screen.width) - 36
							this.swiper = new Swiper('#viewSwiper', {
								//						autoplay: 5000, //可选选项，自动滑动
								width: wd, //你的slide宽度
								//loop: true,
								paginationClickable: true,
								spaceBetween: 12,
								onSlideChangeEnd: (_this) => {
									//self.saveleft(_this.activeIndex)
								}
							})
						}, 1000);
					} else {
						$.toast('网络连接失败了呢，重新试试吧！', 2000, 'success top');
					}
				})
			},
			searchISShrareZf() {
				//查看是否已给祝福者许愿
				this.$http.jsonp(QueryBlessStateApi + '&uid=' + this.uid + '&share_id=' + this.queryString('shareId')).then(function(response) {
					if(response.data.code == 200) {
						console.log(response.data)
						if(response.data.bless_state == 0) {
							this.isShowSFZF = false
						} else {
							this.isShowSFZF = true
						}
					} else {
						$.toast('网络连接失败了呢，重新试试吧！', 2000, 'success top');
					}
				})
			},
			queryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
		},
		ready() {
			let self = this
			self.searchXYSum(); //查询许愿总数
			if(this.isMe) {
				self.searchIsXy(); //查询是否已许愿
				self.searchTRYW(); //查看他人愿望
				self.searchMyZf() //查询我的祝福
			} else {
				self.searchShareZf() //查询分享者的祝福
				self.searchShareIsXy() //查看分享者是否已许愿
				self.searchISShrareZf() //查看是否祝福过分享者 
			}
			self.setXuanKPHeight() // 设置弹窗高度
			setTimeout(function() {
				self.setXuanKPHeight()
			}, 500);
		},
		data() {
			return {
				uid: this.queryString('uid'), //当前用户id
				shareId: '', //分享者id
				xinyuan: '', //我的心愿
				zhufutext: '', //祝福语
				XYSumNum: [0, 0, 0, 0, 0, 0], //当前许愿总数
				//isMe　: false, //是否自己的心愿
				klhbNum: 0, //可领取红包个数
				isShowXC: false, //选择卡片颜色
				isShowOuthYW: false, //查看他人愿望
				isShowXYCG: false, //许愿成功
				isShowHBZJ: false, //打开红包 中奖
				isShowHBWZJ: false, //打开红包 未中奖
				isShowTXZJXX: false, //填写中奖信息
				isShowTXZJXXCG: false, //填写中奖信息成功 
				isShowSFYXY: false, //是否已许愿
				isShowSFZF: false, //是否祝福
				isShowShare: false, //是否显示分享
				isShowSFZFCG: false, //是否显示祝福成功界面
				userName: '', //中奖信息   收货人姓名
				phone: '', //中奖信息   收货人联系方式
				address: '', //中奖信息   收货人地址
				yuanwangyu: '你还没有许下愿望哟！赶紧许个新年愿望吧！', //心愿语   我和他 公用
				backGroundBg: '#fdc300', //心愿语背景色  我和他 公用
				nick_name: '', //愿望昵称
				headimgurl: '', //愿望头像地址
				trywList: [], //查看他人愿望List
				zfList: [], //我的祝福  List
				guanbiwd: Math.min($(window).width(), window.screen.width),
				kpbgList: [{
					"color": "#fdc300",
					"isCur": true
				}, {
					"color": "#a43da8",
					"isCur": false
				}, {
					"color": "#148b9d",
					"isCur": false
				}, {
					"color": "#498c50",
					"isCur": false
				}, {
					"color": "#ed322e",
					"isCur": false
				}]
			}
		}
	}
</script>

<style>
	/*@import '../assets/css/sm.css';*/
	
	@import '../assets/css/swiper.min.css';
	.kapian-ji {
		width: 16%;
		position: absolute;
		bottom: 9%;
		left: 50%;
		margin-left: -8%;
	}
	
	.dajiba {
		color: #FFFFFF;
		position: absolute;
		top: 30%;
		left: 0;
		right: 0;
	}
	
	.dajiba img {
		width: 30%;
		display: table;
		margin: auto;
		margin-bottom: 22px;
	}
	
	.dajiba p {
		opacity: 0.8;
	}
	
	.shareimg {
		position: absolute;
		z-index: 1;
		top: 10px;
		width: 92%;
		left: 50%;
		margin-left: -46%;
	}
	
	.zhufulist {
		padding-top: 20px;
	}
	
	.zhufulist ul {
		position: relative;
		overflow: auto;
	}
	
	.zhufulist ul li {
		float: left;
		width: 33.3333%;
		position: relative;
	}
	
	.ullioutdiv {
		position: relative;
		padding-left: 3px;
		padding-right: 3px;
		padding-bottom: 6px;
		overflow: hidden;
	}
	
	.ullioutdiv .bg {
		position: absolute;
		top: 0;
		right: 3px;
		bottom: 6px;
		left: 3px;
		background-color: #FFFFFF;
		opacity: 0.24;
		border-radius: 6px;
	}
	
	.ullioutdiv div:last-child {
		position: relative;
		border: 1px solid #7a2702;
		border-radius: 6px;
		padding: 24px 6px;
	}
	
	.ullioutdiv div:last-child img {
		display: table;
		border: 1px solid #7a2702;
		border-radius: 50%;
		width: 32px;
		height: 32px;
		margin: auto;
		margin-bottom: 12px;
	}
	
	.ullioutdiv div:last-child p {
		color: #FFFFFF;
		word-break: break-all;
		word-wrap: break-word;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		height: 58px;
	}
	
	.zhufulist .not-data {
		position: relative;
		text-align: center;
		color: #FFFFFF;
		padding: 6px 12px;
		overflow: hidden;
		border-radius: 3px;
		font-size: 12px;
		width: 84%;
		margin: auto;
	}
	
	.zhufulist .not-data .bg {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		opacity: 0.14;
		border-radius: 3px;
	}
	
	.zhufulist .not-data .content {
		position: relative;
		height: 100%;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		opacity: 0.36;
	}
	
	.woshoudaodezhufu {
		padding: 24px 12px;
	}
	
	.woshoudaodezhufu-img {
		width: 92%;
		margin: auto;
	}
	
	.footer1 {
		position: fixed;
		height: 60px;
		left: 0;
		bottom: 0;
		right: 0;
		background: url(../assets/img/wish/bottombg.png) no-repeat center center;
		background-size: 100% 100%;
		z-index: 1;
		padding: 0 12px;
		line-height: 60px;
	}
	
	.footer1 ul {
		position: relative;
		overflow: auto;
	}
	
	.footer1 ul li {
		position: relative;
		float: left;
		width: 50%;
	}
	
	.footer1 ul li div {
		position: relative;
		height: 60px;
		line-height: 60px;
	}
	
	.footer1 ul li:first-child div {
		padding-right: 4%;
	}
	
	.footer1 ul li:last-child div {
		padding-left: 4%;
	}
	
	.footer1 ul li:first-child div span {
		position: absolute;
		width: 22px;
		height: 22px;
		line-height: 22px;
		font-size: 12px;
		background-color: #F52D01;
		left: 111px;
		text-align: center;
		color: #FFFFFF;
		border-radius: 50%;
		top: 9px;
	}
	
	.footer1 ul li div img {
		width: 142px;
		margin-top: 8px;
	}
	
	.footer1 ul li:first-child div img {
		float: left;
	}
	
	.footer1 ul li:last-child div img {
		float: right;
	}
	
	.lingquchenggong {
		width: 77%;
		display: table;
		margin: auto;
		margin-bottom: 62px;
	}
	
	.inputs {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 80%;
		margin-left: -40%;
		overflow: auto;
		margin-top: -78px;
	}
	
	.inputs .input {
		border: 2px solid #FA991D;
		border-radius: 6px;
		overflow: hidden;
		margin-top: 12px;
	}
	
	.inputs .input div:first-child {
		float: left;
		color: #231815;
		background-color: #FEDA00;
		height: 36px;
		line-height: 36px;
		width: 80px;
		text-align: center;
		border-right: 2px solid #FA991D;
	}
	
	.inputs .input div:last-child {
		position: absolute;
		color: #231815;
		height: 36px;
		line-height: 36px;
		padding-left: 88px;
		padding-right: 6px;
		left: 0;
		right: 0;
	}
	
	.inputs .input div:last-child input {
		background-color: transparent;
		height: 36px;
		line-height: 36px;
		width: 100%;
		font-size: 15px;
		padding-left: 6px;
		color: #231815;
	}
	
	.zhongjiangtitle {
		position: absolute;
		top: 10%;
		text-align: center;
		left: 0;
		right: 0;
		font-size: 19px;
	}
	
	.overauto {
		overflow: hidden;
		padding-bottom: 36px;
		height: 100%;
	}
	
	.yaoqinghaoyou {
		position: relative;
		text-align: center;
		margin-top: 8px;
		color: #FFFFFF;
		opacity: 0.56;
		transform: scale(0.95);
	}
	
	.lingquliwu {
		position: relative;
		width: 258px;
		display: table;
		margin: auto;
		margin-top: -30px;
		z-index: 8;
	}
	
	.zhongjiangxinxi {
		position: relative;
		padding: 0;
		top: 0;
		z-index: 8;
		margin-top: -52px;
	}
	
	.zhongjiangxinxi .xingxingbg {
		border: 0;
		width: 192px;
		height: 86px;
		position: absolute;
		left: 50%;
		margin-left: -96px;
		z-index: 1;
		top: 21%;
	}
	
	.zhongjiangxinxi .jpname {
		color: #fcc800;
		font-size: 16px;
		text-align: center;
	}
	
	.zhongjiangxinxi .xuanzhuan {
		position: relative;
		-webkit-animation: change 6s linear infinite;
		animation: change 6s linear infinite;
	}
	
	@keyframes change {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	@-webkit-keyframes change {
		0% {
			-webkit-transform: rotate(0deg);
		}
		50% {
			-webkit-transform: rotate(180deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	
	.zhongjiangxinxi .titile {
		color: #FFFFFF;
		display: table;
		width: 220px;
		margin: auto;
		margin-top: 12px;
		font-size: 17px;
		text-align: center;
		line-height: 1.3;
	}
	
	.zhongjiangxinxi h1 {
		color: #dc2d22;
		text-shadow: #fff 1px 0 0, #fff 1px 0, #fff 0px 0 0, #fff 0 -1px 0;
		-webkit-text-shadow: #fff 1px 0 0, #fff 1px 0, #fff 0px 0 0, #fff 0 -1px 0;
		font-weight: normal;
		text-align: center;
		font-size: 22px;
	}
	
	.zhongjiangxinxi-img {
		width: 80px;
		height: 80px;
		border: 1px solid #ED3F35;
		border-radius: 12px;
		display: table;
		margin: auto;
		margin-top: 12px;
	}
	
	.zhongjiangxinxi-img1 {
		width: 98px;
		height: 98px;
		border: none;
		border-radius: 0;
		display: table;
		margin: auto;
		margin-top: 12px;
		margin-top: 0px;
		left: 50%;
		position: relative;
		margin-left: -38px;
	}
	
	.zhongjiangxinxi .centerDiv {
		position: absolute;
		left: 0;
		right: 0;
		margin-top: -90px;
		top: 50%;
		z-index: 3;
	}
	
	.erweima {
		position: relative;
		width: 100%;
		top: 0;
		left: 0;
	}
	
	.choujkiangbg {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		height: 100%;
	}
	
	.kaihongbao {
		width: 30%;
		position: absolute;
		bottom: 8%;
		left: 50%;
		margin-left: -15%;
	}
	
	.xuankpdiv .tishi {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		text-align: center;
		margin-top: -26px;
		color: #fcc800;
		font-size: 20px;
	}
	
	.zuoyoubtn {
		display: table;
		margin: auto;
	}
	
	.zuoyoubtn img {
		width: 56px;
		height: 56px;
		display: inline-block;
	}
	
	.guanbidiv {
		position: relative;
	}
	
	.guanbidiv .guanbi {
		position: absolute;
		top: -56px;
		z-index: 100;
		width: 48px;
		height: 48px;
		right: 16px;
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
	
	.xuankpdiv ul {
		position: absolute;
		overflow: auto;
		left: 50%;
		right: 0;
		top: 50%;
		margin-top: -88px;
		width: 88%;
		margin-left: -44%;
	}
	
	.xuankpdiv ul li {
		width: 33.33%;
		float: left;
	}
	
	.xuankpdiv ul li div {
		padding: 14px 12px;
	}
	
	.xuankpdiv ul li div span {
		width: 54px;
		height: 54px;
		display: block;
		background-color: #000000;
		border-radius: 50%;
		margin: auto;
		position: relative;
	}
	
	.xuankpdiv ul li div .cur:after {
		content: '';
		position: absolute;
		display: block;
		left: -8px;
		top: -8px;
		bottom: -8px;
		right: -8px;
		background: url(../assets/img/wish/xuanzhong.png) no-repeat center center;
		background-size: 100% 100%;
	}
	
	.queding {
		width: auto;
		position: absolute;
		bottom: 8%;
		left: 50%;
		margin-left: -86.5px;
		height: 44px;
	}
	
	.sbxxxxx {
		font-size: 20px;
		top: 10%;
		position: absolute;
		text-align: center;
		width: 100%;
		left: 0;
		font-size: 20px
	}
	
	.container1 {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
		-webkit-overflow-scrolling: touch;
		background: url(../assets/img/wish/bg.png) no-repeat center center;
		background-size: 100% 100%;
		padding: 96px 5px 60px 5px;
	}
	
	.content {
		height: 100%;
		width: 100%;
		-webkit-overflow-scrolling: touch;
		overflow-y: auto;
	}
	
	.herder {
		position: fixed;
		height: 60px;
		left: 0;
		top: 0;
		right: 0;
		background: url(../assets/img/wish/top1.png) no-repeat center center;
		background-size: 100% 100%;
		z-index: 1;
		padding: 0 12px;
		line-height: 60px;
		display: block;
	}
	
	.herder2 {
		background: url(../assets/img/wish/topbg.png) no-repeat center center;
		background-size: 100% 100%;
	}
	
	.herder .zhezhao {
		position: fixed;
		left: 0;
		right: 0;
		padding: 6px 12px;
		/*color: #595959;*/
		/*background-color: #FFFFFF;*/
		/*opacity: 0.12;*/
		top: 60px;
		line-height: 2;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}
	
	.herder .zhezhao .bg {
		position: absolute;
		left: 0;
		right: 0;
		height: 36px;
		background-color: #FFFFFF;
		opacity: 0.14;
		top: 0;
		z-index: 1;
	}
	
	.herder .zhezhao .zi {
		position: relative;
		left: 0;
		right: 0;
		color: #FFFFFF;
		opacity: 0.36;
		top: 0;
		line-height: 2;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}
	
	.herder p {
		float: left;
		color: #460909;
	}
	
	.herder ul {
		position: relative;
		overflow: hidden;
		right: -4px;
	}
	
	.herder ul li {
		color: #FFFFFF;
		width: 16.66%;
		text-align: center;
		float: left;
	}
	
	.herder .xuyuanlinghongbao {
		width: 192px;
		margin-top: 8px;
	}
	
	.herder .userInfo {
		position: absolute;
		right: 12px;
		top: 0;
		height: 100%;
		line-height: 60px;
		color: #FFFFFF;
	}
	
	.herder .userInfo img {
		width: 42px;
		height: 42px;
		/* display: inline-block; */
		border: 2px solid #FCEE0F;
		border-radius: 50%;
		float: right;
		margin-left: 6px;
		margin-top: 7px;
	}
	
	.herder ul li div {
		text-align: center;
		background: url(../assets/img/wish/kuangkuang.png) no-repeat center center;
		background-size: 100% 100%;
		height: 36px;
		width: 28px;
		display: block;
		margin: 12px auto 0 auto;
		line-height: 36px;
	}
	
	.footer {
		position: fixed;
		height: 60px;
		left: 0;
		bottom: 0;
		right: 0;
		background: url(../assets/img/wish/bottombg.png) no-repeat center center;
		background-size: 100% 100%;
		z-index: 1;
		padding: 0 12px;
		line-height: 60px;
	}
	
	.footer div {
		position: relative;
		padding-right: 168px;
		line-height: 60px;
	}
	
	.footer div input {
		background-color: #FFFFFF;
		padding: 10px 16px;
		width: 100%;
		border-radius: 50px;
		font-size: 16px;
		color: #231815;
		float: left;
		margin-top: 10px;
	}
	
	.footer img {
		position: absolute;
		right: 12px;
		z-index: 2;
		top: 8px;
		width: 125px;
	}
	
	.searchWish {
		position: relative;
		display: block;
		margin: 24px auto 12px auto;
		padding: 8px 12px;
		text-align: center;
		width: 82%;
		color: #FCC800;
		overflow: hidden;
		z-index: 2;
	}
	
	.searchWish .bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.36;
		background-color: #F23E23;
		border-radius: 50px;
	}
	
	.kpcontent {
		width: 100%;
		top: 50%;
		position: absolute;
		margin-top: -114px;
	}
	
	.kpcontent .userImg {
		position: relative;
		display: table;
		margin: auto;
		width: 58px;
		height: 58px;
		border: 2px solid #FCEE0F;
		border-radius: 50%;
	}
	
	.kpcontent p {
		color: #FCEE0F;
		font-size: 18px;
		text-align: center;
		margin-top: 6px;
		margin-bottom: 12px;
	}
	
	.kpcontent div {
		color: #FFFFFF;
		font-size: 17px;
		display: table;
		width: 86%;
		margin: auto;
		opacity: 0.6;
		word-break: break-all;
		word-wrap: break-word;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		height: 70px;
		text-align: center;
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
		opacity: 0.9;
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
	
	.wishcontent {
		position: relative;
		z-index: 99;
	}
	
	.absBottom {
		position: absolute;
		height: auto;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 9;
	}
	
	.modal.modal-in {
		opacity: 1;
		-webkit-transition-duration: 400ms;
		transition-duration: 400ms;
		-webkit-transform: translate3d(0, 0, 0) scale(1);
		transform: translate3d(0, 0, 0) scale(1);
	}
	
	.modal {
		width: 13.5rem;
		position: absolute;
		z-index: 11000;
		left: 50%;
		margin-left: -6.75rem;
		margin-top: 0;
		top: 50%;
		text-align: center;
		border-radius: 0.35rem;
		opacity: 0;
		-webkit-transform: translate3d(0, 0, 0) scale(1.185);
		transform: translate3d(0, 0, 0) scale(1.185);
		-webkit-transition-property: -webkit-transform, opacity;
		transition-property: transform, opacity;
		color: #3d4145;
		display: none;
	}
	
	.toast {
		background: rgba(0, 0, 0, 0.8);
		border-radius: 1rem;
		color: white;
		padding: 0 .8rem;
		height: 2rem;
		line-height: 2rem;
		font-size: 0.8rem;
		width: auto;
	}
	
	.modal-no-buttons .modal-inner {
		border-radius: 0.35rem;
	}
	
	.modal-inner {
		padding: 0.75rem;
		border-radius: 0.35rem 0.35rem 0 0;
		position: relative;
		background: #e8e8e8;
	}
	
	.modal-title {
		font-weight: 500;
		font-size: 0.9rem;
		text-align: center;
	}
	
	.modal-title+ .modal-text {
		margin-top: 0.25rem;
	}
	
	.modal .preloader {
		width: 1.7rem;
		height: 1.7rem;
	}
	
	.preloader {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		-webkit-transform-origin: 50%;
		transform-origin: 50%;
		-webkit-animation: preloader-spin 1s steps(12, end) infinite;
		animation: preloader-spin 1s steps(12, end) infinite;
	}
	
	.preloader:after {
		display: block;
		content: "";
		width: 100%;
		height: 100%;
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
		background-position: 50%;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	
	.modal-no-buttons .modal-buttons {
		display: none;
	}
	
	.modal-buttons {
		height: 2.2rem;
		overflow: hidden;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
	}
	
	.modal-overlay.modal-overlay-visible,
	.preloader-indicator-overlay.modal-overlay-visible,
	.popup-overlay.modal-overlay-visible {
		visibility: visible;
		opacity: 1;
	}
	
	.modal-overlay,
	.preloader-indicator-overlay,
	.popup-overlay {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10600;
		visibility: hidden;
		opacity: 0;
		-webkit-transition-duration: 400ms;
		transition-duration: 400ms;
	}
	
	.preloader {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		-webkit-transform-origin: 50%;
		transform-origin: 50%;
		-webkit-animation: preloader-spin 1s steps(12, end) infinite;
		animation: preloader-spin 1s steps(12, end) infinite;
	}
	
	.preloader:after {
		display: block;
		content: "";
		width: 100%;
		height: 100%;
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
		background-position: 50%;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	
	.preloader-white:after {
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
	}
	
	@-webkit-keyframes preloader-spin {
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	
	@keyframes preloader-spin {
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	
	.modal {
		width: 13.5rem;
		position: absolute;
		z-index: 11000;
		left: 50%;
		margin-left: -6.75rem;
		margin-top: 0;
		top: 50%;
		text-align: center;
		border-radius: 0.35rem;
		opacity: 0;
		-webkit-transform: translate3d(0, 0, 0) scale(1.185);
		transform: translate3d(0, 0, 0) scale(1.185);
		-webkit-transition-property: -webkit-transform, opacity;
		transition-property: transform, opacity;
		color: #FFFFFF;
		display: none;
	}
	
	.modal.modal-in {
		opacity: 1;
		-webkit-transition-duration: 400ms;
		transition-duration: 400ms;
		-webkit-transform: translate3d(0, 0, 0) scale(1);
		transform: translate3d(0, 0, 0) scale(1);
	}
	
	.modal.modal-out {
		opacity: 0;
		z-index: 10999;
		-webkit-transition-duration: 400ms;
		transition-duration: 400ms;
		-webkit-transform: translate3d(0, 0, 0) scale(0.815);
		transform: translate3d(0, 0, 0) scale(0.815);
	}
	
	.modal-inner {
		padding: 0.75rem;
		border-radius: 0.35rem 0.35rem 0 0;
		position: relative;
		background: #e8e8e8;
	}
	
	.modal-inner:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		right: auto;
		top: auto;
		height: 1px;
		width: 100%;
		background-color: #b5b5b5;
		display: block;
		z-index: 15;
		-webkit-transform-origin: 50% 100%;
		transform-origin: 50% 100%;
	}
	
	@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		.modal-inner:after {
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
	}
	
	@media only screen and (-webkit-min-device-pixel-ratio: 3) {
		.modal-inner:after {
			-webkit-transform: scaleY(0.33);
			transform: scaleY(0.33);
		}
	}
	
	.modal-title {
		font-weight: 500;
		font-size: 0.9rem;
		text-align: center;
	}
	
	.modal-title+ .modal-text {
		margin-top: 0.25rem;
	}
	
	.modal-buttons {
		height: 2.2rem;
		overflow: hidden;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
	}
	
	.modal-buttons.modal-buttons-vertical {
		display: block;
		height: auto;
	}
	
	.modal-button {
		width: 100%;
		padding: 0 0.25rem;
		height: 2.2rem;
		font-size: 0.85rem;
		line-height: 2.2rem;
		text-align: center;
		color: #0894ec;
		background: #e8e8e8;
		display: block;
		position: relative;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		cursor: pointer;
		box-sizing: border-box;
		-webkit-box-flex: 1;
		-ms-flex: 1;
	}
	
	.modal-button:after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		left: auto;
		bottom: auto;
		width: 1px;
		height: 100%;
		background-color: #b5b5b5;
		display: block;
		z-index: 15;
		-webkit-transform-origin: 100% 50%;
		transform-origin: 100% 50%;
	}
	
	@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		.modal-button:after {
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
	}
	
	@media only screen and (-webkit-min-device-pixel-ratio: 3) {
		.modal-button:after {
			-webkit-transform: scaleY(0.33);
			transform: scaleY(0.33);
		}
	}
	
	.modal-button:first-child {
		border-radius: 0 0 0 0.35rem;
	}
	
	.modal-button:last-child {
		border-radius: 0 0 0.35rem 0;
	}
	
	.modal-button:last-child:after {
		display: none;
	}
	
	.modal-button:first-child:last-child {
		border-radius: 0 0 0.35rem 0.35rem;
	}
	
	.modal-button.modal-button-bold {
		font-weight: 500;
	}
	
	html:not(.watch-active-state) .modal-button:active,
	.modal-button.active-state {
		background: #d4d4d4;
	}
	
	.modal-buttons-vertical .modal-button {
		border-radius: 0;
	}
	
	.modal-buttons-vertical .modal-button:after {
		display: none;
	}
	
	.modal-buttons-vertical .modal-button:before {
		display: none;
	}
	
	.modal-buttons-vertical .modal-button:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		right: auto;
		top: auto;
		height: 1px;
		width: 100%;
		background-color: #b5b5b5;
		display: block;
		z-index: 15;
		-webkit-transform-origin: 50% 100%;
		transform-origin: 50% 100%;
	}
	
	@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		.modal-buttons-vertical .modal-button:after {
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
	}
	
	@media only screen and (-webkit-min-device-pixel-ratio: 3) {
		.modal-buttons-vertical .modal-button:after {
			-webkit-transform: scaleY(0.33);
			transform: scaleY(0.33);
		}
	}
	
	.modal-buttons-vertical .modal-button:last-child {
		border-radius: 0 0 0.35rem 0.35rem;
	}
	
	.modal-buttons-vertical .modal-button:last-child:after {
		display: none;
	}
	
	.modal-no-buttons .modal-inner {
		border-radius: 0.35rem;
	}
	
	.modal-no-buttons .modal-inner:after {
		display: none;
	}
	
	.modal-no-buttons .modal-buttons {
		display: none;
	}
	.pdb60px{
		padding-bottom: 60px !important;
	}
</style>