<template>
	<view class="container">
		<view class="info">
			这是详情
		</view>
		<view class="info">
			这是详情2
		</view>
		<view class="info">
			这是详情
		</view>
		<view class="info">
			这是详情3
		</view>
		<view class="info">
			这是详情
		</view>
		<view class="info">
			这是详情4
		</view>
		<view class="info">
			这是详情
		</view>
		<view class="info">
			这是详情
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {name: 'vivi'}
			}
		},
		onLoad(item) {
			console.log('detail-onLoad', item)
		}
	}
</script>

<style lang="scss">
	.container {
		.info {
			height: 400rpx;
		}
	}
</style>
