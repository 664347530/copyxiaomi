<template>
	<view>
		<view class="big-box">
			<image src="../../static/img/logo.png" class="logo"></image>
			<view class="search-box">
				<view class="icon iconfont icon-sousuo"></view>
				<input type="text" @tap="goSearch"/>
				<view class="icon iconfont icon-saoyisao"></view>
			</view>
			<view class="icon iconfont icon-fenlei bottom-icon"></view>
			<view class="icon iconfont icon-xiaoxi bottom-icon"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		goSearch(){
			uni.navigateTo({
				url:'/pages/searchpage/searchpage'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.big-box{
	height: 80rpx;
	display: flex;
	background-color: rgb(203,203,203);
	.logo{
		width: 60rpx;
		height: 60rpx;
		margin: auto 20rpx;
	}
	.search-box{
		width: 65%;
		border-radius: 40rpx;
		height: 80%;
		margin: auto 0px;
		background-color: rgb(246,246,246);
		display: flex;
		.icon{
			margin: 10rpx 10rpx;
			font-size: 40rpx;
			width: 30rpx;
		}
		input{
			margin: 8rpx 0rpx;
			width: 76%;
			outline: none;
			border: none;
		}
	}
	.bottom-icon{
		margin: 12rpx 20rpx;
		font-size: 58rpx;
		width: 30rpx;
		font-weight: 600;
		color: white;
	}
}
</style>