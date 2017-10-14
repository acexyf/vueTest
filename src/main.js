// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Alert } from 'vux'

//如果是开发环境，引入vconsole
if (process.env.NODE_ENV == 'development') {
  require('./utils/vconsole.min')
}

Vue.config.productionTip = false
Vue.use(Alert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
