// #ifdef H5
const baseUrl = '/admin'   
// #endif

// #ifndef H5
const baseUrl = 'http://bjmuseum.org.cn/admin'   
// #endif
// MP-WEIXIN 微信端

const request = {
	base: config => {
		return new Promise((resolve, reject) => {
			uni.request(config)
			.then((response) => {
				// setTimeout(function() {
				// 	uni.hideLoading();
				// }, 200);
				let [error, res] = response;        
				resolve(res.data);
			}).catch(error => {
				let [err, res] = error;
				reject(err)
			})
		});
	},
	get: (url, params) => {
		return new Promise((resolve, reject) => {
			uni.request({
				method: 'GET',
				url: baseUrl + url,
				data: params,
				// header: header,
				// dataType: 'json',         
			}).then((response) => {
				// setTimeout(function() {
				// 	uni.hideLoading();
				// }, 200);
				let [error, res] = response;        
				resolve(res.data);
			}).catch(error => {
				let [err, res] = error;
				reject(err)
			})
		});
	},
	post: (url, params) => {
		return new Promise((resolve, reject) => {
			uni.request({
				method: 'POST',
				url: baseUrl + url,
				data: params,
				// header: header,
				// dataType: 'json',         
			}).then((response) => {
				// setTimeout(function() {
				// 	uni.hideLoading();
				// }, 200);
				let [error, res] = response;        
				resolve(res.data);
			}).catch(error => {
				let [err, res] = error;
				reject(err)
			})
		});
	}
	// return new Promise((resolve, reject) => {
	// 	uni.request({
	// 		method: methord,
	// 		url: baseUrl + url,
	// 		data: params,
	// 		header: header,
	// 		dataType: 'json',         
	// 	}).then((response) => {
	// 		setTimeout(function() {
	// 			uni.hideLoading();
	// 		}, 200);
	// 		let [error, res] = response;        
	// 		resolve(res.data);
	// 	}).catch(error => {
	// 		let [err, res] = error;
	// 		reject(err)
	// 	})
	// });
}
export default request