import Vue from 'vue'
import Vuex from 'vuex'
import { getQueryString } from '@/common/js/util.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorageSync('userInfo', provider) 
			console.log('userInfo', state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorageSync('userInfo')
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
	},
	getters:{
	},
	actions: {
		// 微信登录授权
		loginWechatAuth: async function ({commit, state}) {
			// console.log(22222222, commit, state)
			// #ifndef H5
			return await new Promise((resolve, reject) => {
				if (state.hasLogin) {
					resolve()
					// resolve(state.openid)
				} else {
					uni.login({
						provider: 'weixin',
						success: (res) => {
							console.log('login success:', res);
							let code = res.code
							console.warn('如需获取openid请参考uni-id: https://uniapp.dcloud.net.cn/uniCloud/uni-id')
							
							this._vm.$http.get('/wx/wxIsLogin.do', {
								key: code
							})
							.then(res => {
								// todo 判断登录成功
								// if (res.success === 1) {
								if (res.success === 0) {
									res.data = {userId: '34545', name: 'vivi'}
									commit('login', res.data)
									
									resolve(res.data)
								} else {
									reject(res.error.message)
								}
							})
							
							
							// 获取用户信息
							// uni.getUserInfo({
							// 	provider: 'weixin',
							// 	success: function (infoRes) {
							// 		console.log('用户信息为：' + infoRes);
							// 	}
							// });
						},
						fail: (err) => {
							console.log('login fail:', err);
						}
					});
				}
			})
			// #endif
			
			// H5端
			// #ifdef H5
			return await new Promise((resolve, reject) => {
				console.log(888, getQueryString('islogin'))
				if (state.hasLogin) {
					resolve()
				} else if(getQueryString('islogin')){
					this._vm.$http.get('/wx/wxIsLogin.do', {
						key: getQueryString('islogin')
					})
					.then(res => {
						// todo 判断登录成功
						// if (res.success === 1) {
						if (res.success === 0) {
							res.data = {userId: '34545', name: 'vivi'}
							commit('login', res.data)
							
							resolve(res.data)
						} else {
							reject(res.error.message)
						}
					})
				} else {
					// todo 回调地址
					window.location.href =
						apiUrl +
						'/admin/wx/m/wxLogin.do?redirect_uri=' + encodeURIComponent(window.location.href)
					// window.location.href =
					// 	apiUrl +
					// 	'/admin/wx/m/wxLogin.do?redirect_uri=' +
					// 	encodeURIComponent(
					// 		apiUrl + '/appoint/#/home/order-pre?id=' + this.$route.query.id
					// 	)
				}
			})  
			// #endif
		},
		// tode dele:  lazy loading openid 
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
