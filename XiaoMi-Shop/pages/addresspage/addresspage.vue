<template>
	<view class="addresspage">
		<view class="address-top">
			<view class="ico iconfont icon-zuojiantou" @click="Goback"></view>
			<text>管理地址</text>
		</view>
		<view class="address-body">
			<view class="address-detail" v-for="(add,index) in address" :key="index" @click="GoUpdate(index)">
				<view class="detail-left">
					<view class="detail-left-top">
						<view class="detail-left-name">{{add.address_name}}</view>
						<view class="detail-left-phone">{{add.address_phone}}</view>
					</view>
					<view class="detail-left-top">
						<view class="detail-left-phone">{{add.address_main}}</view>
					</view>
					<view class="detail-left-top">
						<view class="detail-left-phone">{{add.address_detail}}</view>
					</view>
				</view>
				<view class="detail-right">
					<view class="ico iconfont icon-youjiantou"></view>
				</view>
			</view>
		</view>
		<view class="address-bottom" @click="GoNewAddress">
			<text>+新建收货地址</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:[]
			}
		},
		methods: {
			Goback(){
				uni.navigateBack({
					delta: 1
				})
			},
			GoNewAddress(){
				uni.navigateTo({
					url:'/pages/newaddress/newaddress'
				})
			},
			fetchGoods() {
			  uni.request({
				url: "http://localhost:3000/api/lookaddress",
				method: "POST",
				data:{
					user_id:uni.getStorageSync('user_id')
				},
				success: (res) => {
				  if (res.data.code === 200) {
					this.address = res.data.data;
				  } else {
					console.log("错误信息:", res.data.msg);
				  }
				},
				fail: (err) => {
				  console.log("请求失败:", err);
				},
			  });
			},
			GoUpdate(index) {
				// 获取点击的地址信息
				const addressInfo = this.address[index];
				// 跳转到更新地址页面，并传递地址信息
				uni.navigateTo({
					url: `/pages/updateaddress/updateaddress?address=${encodeURIComponent(JSON.stringify(addressInfo))}`
				});
			}
		},
		onShow(){
			this.fetchGoods();
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				this.fetchGoods();
				uni.stopPullDownRefresh()
			},1000)
		}
	}
</script>

<style lang="scss" scoped>
.addresspage{
	background-color: white;
	height: 100%;
	padding-bottom: 80rpx;
	.address-top{
		display: flex;
		height: 88rpx;
		background-color: #e7e7e7;
		.iconfont{
			margin: auto 20rpx;
			font-size: 40rpx;
		}
		text{
			margin: auto 0;
			font-size: 30rpx;
		}
	}
	.address-body{
		.address-detail{
			height:140rpx ;
			display: flex;
			background-color: white;
			border-bottom: 1px dashed gray;
			.detail-left{
				display: flex;
				flex-direction: column;
				width: 90%;
				.detail-left-top{
					display: flex;
					margin-top: 4rpx;
					.detail-left-name{
						color: rgb(250, 111, 19);
						font-weight: bold;
						margin-left: 20rpx;
						font-size: 34rpx;
					}
					.detail-left-phone{
						margin-left: 20rpx;
						font-size: 34rpx;
					}
				}
			}
			.detail-right{
				width: 10%;
				display: flex;
				.iconfont{
					margin: auto 20rpx;
					font-size: 40rpx;
				}
			}
		}
	}
	.address-bottom{
		height: 80rpx;
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1;
		display: flex;
		background-color: rgb(253, 96, 41);
		border-radius: 40rpx;
		text{
			margin: auto auto;
			color: white;
			font-weight: bold;
		}
	}
}
</style>
