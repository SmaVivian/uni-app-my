<template>
	<view class="container">
		<view class="intro">1本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<!-- <text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link> -->
		
		<view class="list">
			<view class="list-item" v-for="(item, index) in dataList" :key="index">
				<image :src="item.cover" mode=""></image>
				<text>{{item.title}}</text>
<!-- 				<image :src="item.museumUrl" mode=""></image>
				<text>{{item.name}}</text> -->
				<view>
					<button type="primary" size="mini" plain="true" @click="goDetail(item.id)">跳到详情</button>
				</view>
				
			</view>
		</view>
		
		<uni-load-more :status="loadingType" :icon-size="16" />
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				activeTab: '1',
				currentCity: {
					name: '北京市',
					id: null
				},
				longitude: '',
				latitude: '',
				currentPage: 1,
				size: 10,
				loadingType: 'more',
				dataList: [],
				last_id: ''
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad() {
			// // console.log('aaaaaaa', uni.getStorageSync('userInfo') )
			if(!this.hasLogin) {
				this.tologin()
			} else {
				this.getList()
			}
			// this.getList()
		},
		onPullDownRefresh() {
			this.dataList = []
			this.currentPage = 1
			this.reload = true;
			this.getList();
		},
		onReachBottom() {
			this.status = 'more';
			this.currentPage++
			this.getList();
		},
		methods: {
			...mapMutations(['login']),
			tologin() {
				this.$store
					.dispatch('loginWechatAuth', '2345')
					.then((res) => {
						this.getList()
					})
					.catch(msg => {
						uni.showToast({
							title: msg,
							duration: 2000,
							icon: 'none'
						});
					})
			},
			getList() {
				uni.showToast({
					title: '222',
					duration: 2000,
					icon: 'none'
				});
				var data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					// this.loadingType = 'loading';
					data.minId = this.last_id;
					data.time = new Date().getTime() + '';
					data.pageSize = 10;
				}
				this.$http.get('/news', {
					...data
				})
				.then(res => {
					uni.stopPullDownRefresh()
					let data = res
					this.loading = false
					// this.loadingType = this.currentPage >= res.page.totalPage ? 'noMore' : 'more'
					this.loadingType = this.currentPage >= 5 ? 'noMore' : 'more'
					if(this.loadingType === 'noMore') {
						data = []
						return
					}
					this.last_id = data[data.length - 1].id;
					this.dataList = this.dataList.concat(data)
					
					console.log(this.dataList)
					uni.showToast({
						title: '555',
						duration: 4000,
						icon: 'none'
					});
				})
				.catch(err => {
					uni.showToast({
						title: '333',
						duration: 4000,
						icon: 'none'
					});
				})
				// this.$http.get('/AppointOrder/museumList.do', {
				// 	type: this.activeTab, //排序类型(1-默认排序 2-距离最近 3-预约量)
				// 	area: this.currentCity.id||'', //区列表
				// 	longitude: this.longitude, //经度
				// 	latitude: this.latitude, //纬度
				// 	size: this.size,
				// 	currentPage: this.currentPage
				// })
				// .then(res => {
				// 	uni.stopPullDownRefresh()
				// 	let data = res.data
				// 	this.loading = false
				// 	this.loadingType = this.currentPage >= res.page.totalPage ? 'noMore' : 'more'
				// 	this.dataList = this.dataList.concat(data)
					
				// 	console.log(this.dataList)
				// })
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		color: $uni-color-primary;
		box-sizing: border-box;
		
		.list {
			.list-item {
				image {
					width: 200rpx;
					height: 100rpx;
				}
			}
		}
	}
</style>
