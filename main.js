import Vue from 'vue'
import App from './App'
import store from './store'
import request from '@/common/js/request'

Vue.prototype.$http = request

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
