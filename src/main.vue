<template>
  <div class="page page-current"> 
      <router-view transition="fade" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
import $ from 'zepto'
import wx from 'wx'

export default {
  ready () {
    // 微信配置
    wx.config({
      debug: false,
      appId: $.sign.appId,
      timestamp: $.sign.timestamp,
      nonceStr: $.sign.nonceStr,
      signature: $.sign.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    })
    // 在需要配置分享内容的时候调用
    // wxShareConfig()
  },
  data () {
    return {
      isIndex: true
    }
  }
}
</script>

<style>
@import './assets/css/common.css';
[v-cloak] {
  display: none;
}
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0.5;
}
</style>
