import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import VueRouter from 'vue-router'
//import JQuery from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './routes'
import store from './store/index'
Vue.use(VueAxios,Axios)
Vue.use(VueRouter)
Vue.use(ElementUI)
//Vue.use(JQuery)
//let $=JQuery
//window.$ = JQuery
const router = new VueRouter({
  mode:'history',
  routes:routes
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
