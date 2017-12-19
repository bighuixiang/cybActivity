import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router'
import * as filters from './filters'
import app from './main' 

// Router
Vue.use(VueRouter) 

const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

routerConfig(router)

// Resource
Vue.use(VueResource)

Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'src/assets/data' : '/vue-sui-demo/static/data'
Vue.http.options.emulateJSON = true

// Filters
Vue.filter('date', filters.dateFilter)

router.start(app, '#app')

window.router = router
//console.log("==========")
//console.log(StackBlur)
//console.log("==========")
//window.StackBlur = StackBlur;
//window.html2canvas = html2canvas;
