<template>
	<view class="showorderpage">
		<view class="showorder-top">
			<view class="showorder-top-left">
				<view class="ico iconfont icon-zuojiantou" @click="Goback"></view>
				<text>我的订单</text>
			</view>
			<view class="showorder-top-right">
				<view class="ico iconfont icon-sousuo"></view>
				<uni-badge class="uni-badge-left-margin" :text="4" absolute="rightTop" :offset="[0, 0]" size="small">
					<view class="box"><view class="ico iconfont icon-gouwuche"></view></view>
				</uni-badge>
			</view>
		</view>
		<view class="showorder-daohang">
			<view class="navbar">
			  <view class="navbar-item" :class="{'active': activeTab === 0}" @click="changeTab(0)">全部</view>
			  <view class="navbar-item" :class="{'active': activeTab === 1}" @click="changeTab(1)">待发货</view>
			  <view class="navbar-item" :class="{'active': activeTab === 2}" @click="changeTab(2)">待收货</view>
			  <view class="navbar-item" :class="{'active': activeTab === 3}" @click="changeTab(3)">待评价</view>
			</view>
		</view>
		<view class="showorder-content">
			<swiper class="swiper" :current="activeTab" @change="onSwiperChange" >
			  <swiper-item>
			    <view class="allorder">
					<view class="allorder-content" v-for="(allorder,index) in orders" :key="index">
						<view class="allorder-content-top">
							<text>{{allorder.order_state}}</text>
						</view>
						<view class="allorder-content-body">
							<view class="order-img">
								<image :src="'/static/productdetail/' + allorder.product_img"></image>
							</view>
							<view class="order-content">
								<view class="order-content-top">
									<text>{{allorder.product_name}}</text>
								</view>
								<view class="order-content-foot">
									<text>{{allorder.product_color}}</text>
									<text>{{allorder.product_nei}}</text>
								</view>
							</view>
							<view class="order-foot">
								<view class="order-foot-top">
									<em>￥</em><text>{{allorder.product_price}}</text>
								</view>
								<view class="order-foot-top">
									<em>×</em><text>{{allorder.product_num}}</text>
								</view>
							</view>
						</view>
						<view class="allorder-content-foot">
							<view class="order-foot-left">
								<text>{{ (allorder.time + "").substring(0, 10) }}</text>
							</view>
							<view class="order-foot-right">
								<text>共{{allorder.product_num}}件商品 实付金额:￥</text>
								<text>{{allorder.total}}</text>
							</view>
						</view>
						<view class="allorder-content-end">
							<view class="end-button">
								<text @click="deleteorder(index)">删除订单</text>
							</view>
							<view class="end-button">
								<text>查看物流</text>
							</view>
							<view class="end-button">
								<text>确认收货</text>
							</view>
						</view>
					</view>
				</view>
			  </swiper-item>
			  <swiper-item>
			    <view>待付款内容</view>
			  </swiper-item>
			  <swiper-item>
			    <view>待收货内容</view>
			  </swiper-item>
			  <swiper-item>
			    <view>待评价内容</view>
			  </swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 activeTab: 0,
				 orders:[]
			}
		},
		methods: {
			Goback(){
				uni.navigateBack({
					delta:1
				})
			},
			changeTab(index) {
			  this.activeTab = index;
			},
			onSwiperChange(e) {
			  this.activeTab = e.detail.current;
			},
			showorders(){
				uni.request({
					url:'http://localhost:3000/api/showorders',
					method:'POST',
					data:{
						user_id:uni.getStorageSync('user_id')
					},
					success:(res)=> {
					    if (res.data.code == 200) {
					        this.orders = res.data.data;
							console.log(res.data.data);
					    } else {
					        console.log('错误信息:', res.data.msg);
					    }
					},
					fail: (err) => {
					    console.log('请求失败:', err); // 请求失败处理
					},
				})
			},
			// 删除订单
			deleteorder(index){
				uni.request({
					url:'http://localhost:3000/api/deleteorder',
					method:"POST",
					data:{
						order_id: this.orders[index].order_id,
						user_id:uni.getStorageSync("user_id")
					},
					success: (res) => {
					  if (res.data.code === 200) {
						  setTimeout(()=>{
							  uni.showToast({
							  	title:'订单已删除'
							  })
							  this.showorders();  
						  },1000)
						
					  } else {
						console.log("错误信息:", res.data.msg);
					  }
					},
					fail: (err) => {
					  console.log("请求失败:", err);
					},
				})
			}
		},
		onShow() {
			this.showorders();
		}
	}
</script>

<style lang="scss" scoped>
.showorderpage{
	background-color: #e7e7e7;
	display: flex;
	flex-direction: column;
	.showorder-top{
		display: flex;
		flex: 1;
		.showorder-top-left{
			flex: 0.5;
			height: 88rpx;
			display: flex;
			.iconfont{
				margin: auto 20rpx;
				font-size: 40rpx;
			}
			text{
				margin: auto 0;
				font-size: 30rpx;
			}
		}
		.showorder-top-right{
			flex: 0.5;
			height: 88rpx;
			display: flex;
			.iconfont{
				margin: auto 20rpx;
				margin-left: auto;
				font-size: 40rpx;
				float: right;
			}
			.uni-badge-left-margin{
				margin: auto 20rpx;
			}
		}
	}
	.showorder-daohang{
		height: 80rpx;
		background-color: white;
		display: flex;
		.navbar {
		  display: flex;
		  flex: 1;
		  justify-content: space-around;
		  width: 100%;
		  .navbar-item {
		    font-size: 30rpx;
		    margin: auto auto;
		    text-align: center;
		    cursor: pointer;
			flex: 0.25;
			color: gray;
		  }
		  .navbar-item.active {
		    color: orange;
			font-weight: bold;
		  }
		}
	}
	.showorder-content{
		height: 100vh;
		overflow-y: auto;
		.swiper{
			height: 100%;
			swiper-item {
			    height: 100%;
			    overflow-y: auto;
			  }
			.allorder{
				.allorder-content{
					height: 400rpx;
					overflow: hidden;
					margin-top: 10rpx;
					background-color: white;
					.allorder-content-top{
						height: 54rpx;
						border-bottom: 1px dashed gray;
						display: flex;
						text{
							margin-left: auto;
							margin-right: 20rpx;
							color: rgb(234, 102, 26);
						}
					}
					.allorder-content-body{
						height: 200rpx;
						display: flex;
						.order-img{
							width: 25%;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.order-content{
							width: 58%;
							display: flex;
							flex-direction: column;
							.order-content-top{
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
								margin-top: 30rpx;
								font-size: 36rpx;
								text{
									font-weight: bold;
									padding-top: 10rpx;
								}
							}
							.order-content-foot{
								text-overflow: ellipsis;
								overflow: hidden;
								display: flex;
								white-space: nowrap;
								margin-top: 20rpx;
								font-size: 28rpx;
								text{
									color: gray;
								}
								text:nth-of-type(2){
									margin-left: 16rpx;
								}
							}
						}
						.order-foot{
							width: 17%;
							display: flex;
							flex-direction: column;
							.order-foot-top{
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
								margin-top: 30rpx;
								display: flex;
								em{
									font-size: 20rpx;
									margin-left: auto;
								}
								text{
									font-size: 24rpx;
									text-overflow: ellipsis;
									overflow: hidden;
									white-space: nowrap;
									margin-right: 10rpx;
								}
							}
							.order-foot-top:nth-of-type(2){
								margin-top: 20rpx;
							}
						}
					}
					.allorder-content-foot{
						height: 60rpx;
						display: flex;
						flex: 1;
						.order-foot-left{
							flex: 0.3;
							text{
								margin: auto 20rpx;
								font-size: 26rpx;
							}
						}
						.order-foot-right{
							flex: 0.7;
							display: flex;
							text:nth-of-type(1){
								font-size: 28rpx;
								margin: auto 0;
								margin-left: auto;
							}
							text:nth-of-type(2){
								font-size: 30rpx;
								margin: auto 0;
							}
						}
					}
					.allorder-content-end{
						height: 84rpx;
						display: flex;
						.end-button{
							border: 1px solid black;
							width: 22%;
							margin: 0 10rpx;
							border-radius: 40rpx;
							display: flex;
							text{
								margin: auto auto;
							}
						}
						.end-button:nth-of-type(1){
							margin-left: auto;
						}
						.end-button:nth-of-type(3){
							border: 1px solid rgb(211, 108, 50);
							color: rgb(211, 108, 50);
						}
					}
				}
				.allorder-content:nth-of-type(1){
					margin-top: 0;
				}
			}
		}
	}
}
</style>
