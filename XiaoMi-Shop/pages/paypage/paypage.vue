<template>
	<view class="paypage">
		<view class="paypage-top">
			<view class="ico iconfont icon-zuojiantou" @click="Goback"></view>
			<text>小米收银台</text>
			<text @click="GoShow">订单中心</text>
		</view>
		<view class="paypage-body">
			<view class="paypage-body-price">
				<text>￥{{amount}}</text>
				<view class="paypage-body-time">
					<text>支付剩余时间:</text>
					<uni-countdown  :show-day="false" :hour="testHour" :minute="testMinute" :second="testSecond" />
				</view>
			</view>
		</view>
		<view class="paypage-body-second">
			<text>支付工具</text>
			<view class="pay-method">
			    <view class="pay-method-box">
			        <view class="method-img">
			            <image src="../../static/img/yunshanfu.webp" mode=""></image>
			        </view>
			        <view class="method-neirong">
			            <text>云闪付</text>
			            <text>中国银联有限公司</text>
			        </view>
			        <view class="method-check">
			            <radio color="#FF3333" class="check-select" name="payMethod" value="yunshanfu" :checked="selectedPayMethod === 'yunshanfu'" @click="selectedPayMethod = 'yunshanfu'"/>
			        </view>
			    </view>
			    <view class="pay-method-box">
			        <view class="method-img">
			            <image src="../../static/img/logo.png" mode=""></image>
			        </view>
			        <view class="method-neirong">
			            <text>小米支付</text>
			            <text>捷付睿通支付股份有限公司</text>
			        </view>
			        <view class="method-check">
			            <radio color="#FF3333" class="check-select" name="payMethod" value="xiaomi" :checked="selectedPayMethod === 'xiaomi'" @click="selectedPayMethod = 'xiaomi'"/>
			        </view>
			    </view>
			    <view class="pay-method-box">
			        <view class="method-img">
			            <image src="../../static/img/zhifubao.png" mode=""></image>
			        </view>
			        <view class="method-neirong">
			            <text>支付宝支付</text>
			            <text>支付宝网络技术有限公司</text>
			        </view>
			        <view class="method-check">
			            <radio color="#FF3333" class="check-select" name="payMethod" value="zhifubao" :checked="selectedPayMethod === 'zhifubao'" @click="selectedPayMethod = 'zhifubao'"/>
			        </view>
			    </view>
			    <view class="pay-method-box">
			        <view class="method-img">
			            <image src="../../static/img/wxlogo.png" mode=""></image>
			        </view>
			        <view class="method-neirong">
			            <text>微信支付</text>
			            <text>财付通支付有限公司</text>
			        </view>
			        <view class="method-check">
			            <radio color="#FF3333" class="check-select" name="payMethod" value="wx" :checked="selectedPayMethod === 'wx'" @click="selectedPayMethod = 'wx'"/>
			        </view>
			    </view>
			</view>
		</view>
		<view class="paypage-foot" @click="GoPay">
			<text>确认支付￥{{amount}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				testHour: 1,
				testMinute: 0,
				testSecond: 0,
				start: false,
				timeupSecond: 100,
				selectedPayMethod: 'yunshanfu',
				amount: 0,
				goods: [],
				address: {}
			}
		},
		methods: {
			Goback(){
				uni.navigateBack({
					delta: 1
				})
			},
			// 支付生成订单
			GoPay() {
			  uni.request({
				url: 'http://localhost:3000/api/createorder',
				method: 'POST',
				data: {
				  user_id: uni.getStorageSync("user_id"),
				  address: this.address,
				  goods: this.goods
				},
				success: (res) => {
				  if (res.data.code === 200) {
					uni.showToast({
					  title: '支付成功'
					});
					setTimeout(() => {
					  // 第二个请求在支付成功后执行
					  uni.request({
						url: 'http://localhost:3000/api/deleteshopcar',
						method: 'POST',
						data: {
						  user_id: uni.getStorageSync("user_id"),
						  goods: this.goods
						},
						success: (res) => {
						  if (res.data.code === 200) {
							uni.switchTab({
							  url: '/pages/shopcart/shopcart'
							});
						  } else {
							console.log('错误信息:', res.data.msg);
						  }
						},
						fail: (err) => {
						  console.log('请求失败:', err);
						}
					  });
					}, 1000);
				  } else {
					console.log('错误信息:', res.data.msg);
				  }
				},
				fail: (err) => {
				  console.log('请求失败:', err);
				}
			  });
			},
			GoShow(){
				uni.navigateTo({
					url:'/pages/showorders/showorders'
				})
			}
		},
		mounted(){
			setTimeout(() => {
				this.testHour = 1
				this.testMinute = 1
				this.testSecond = 0
				this.start = true
			}, 3000)
		},
		onLoad(options) {
			if (options.amount) {
			    this.amount = options.amount;
			}
			const goods = options.goods ? JSON.parse(decodeURIComponent(options.goods)) : [];
			const address = options.address ? JSON.parse(decodeURIComponent(options.address)) : {};
			// 将数据保存到页面的数据中
			this.goods = goods;
			this.address = address;
			console.log(this.goods,this.address);
		}
	}
</script>

<style lang="scss" scoped>
.paypage{
	background-color: #e7e7e7;
	.paypage-top{
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		.iconfont{
			margin: auto 0;
		}
		text:nth-of-type(1){
			margin: auto 0;
			text-indent: 60rpx;
			font-weight: bold;
			font-size: 36rpx;
		}
		text:nth-of-type(2){
			margin: auto 0;
			font-size: 30rpx;
		}
	}
	.paypage-body{
		height: 380rpx;
		display: flex;
		flex-direction: column;
		.paypage-body-price{
			width: 80%;
			height: 80%;
			margin: auto auto;
			display: flex;
			flex-direction: column;
			text{
				margin: 20rpx auto;
				font-weight: bold;
				font-size: 60rpx;
				color: orangered;
			}
			.paypage-body-time{
				margin: 10rpx auto;
				display: flex;
				background-color: #ececec;
				text{
					font-size: 26rpx;
					color: gray;
				}
			}
		}
	}
	.paypage-body-second{
		background-color: white;
		text{
			margin: 0 20rpx;
			font-weight: bold;
		}
		.pay-method{
			width: 94%;
			margin: 10rpx auto;
			height: 600rpx;
			display: flex;
			flex: 1;
			flex-direction: column;
			.pay-method-box{
				flex: 0.25;
				display: flex;
				.method-img{
					width: 20%;
					height: 80%;
					margin-left: 20rpx;
					margin-top: 16rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.method-neirong{
					width: 65%;
					display: flex;
					flex-direction: column;
					text:nth-of-type(1){
						margin-top: 30rpx;
						font-size: 40rpx;
					}
					text:nth-of-type(2){
						color: gray;
						font-size: 26rpx;
					}
				}
				.method-check{
					width: 15%;
					display: flex;
					.check-select{
						margin: auto auto;
					}
				}
			}
		}
	}
	.paypage-foot{
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
		}
	}
}
</style>
