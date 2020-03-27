// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import {store} from './store/store'

Vue.config.productionTip = false

Vue.prototype.$http=axios;
const token=localStorage.getItem("token")
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization']=token
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
