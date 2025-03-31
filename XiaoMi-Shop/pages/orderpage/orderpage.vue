<template>
	<view class="orderpage">
		<view class="order-top">
			<view class="order-top-left">
				<text>· 依据四川国补政策要求，国补订单需下单后20日内签收，逾期将被取消~</text>
				<text>· 国补订单，手机、平板、手表、手环、电脑需当场签收并配合派送人员完成各类信息采集，否则订单将被取消~</text>
				<text>· 受国补规则影响，手机、平板、电脑品类一站式以旧换新方式下单不支持参与政府补贴~</text>
			</view>
			<view class="ico iconfont icon-cha"></view>
		</view>
		<view class="order-body">
			<view class="order-body-top" @click="GoBottomAddress">
				<view class="ico iconfont icon-dizhi"></view>
				<text class="new-position" v-if="!useraddress || !useraddress.address_main">选择地址</text>
				<view class="new-positions" v-if="useraddress && useraddress.address_main">
					<view class="popup-body-left">
						<text>{{ useraddress.address_main }}</text>
						<text>{{ useraddress.address_detail }}</text>
						<text>{{useraddress.address_name}} {{useraddress.address_phone}}</text>
					</view>
				</view>
				<view class="ico iconfont icon-youjiantou"></view>
			</view>
			<view class="order-body-content">
				<view class="content-box" v-for="(good,index) in goods" :key="index">
					<view class="content-img">
						<image :src="'/static/productdetail/' + good.product_img"></image>
					</view>
					<view class="content-detail">
						<text>{{good.product_name}} {{good.product_nei}} {{good.product_color}}</text>
						<text>{{good.product_nei}} {{good.product_color}}</text>
						<text>￥{{good.total}}<span>×{{good.product_num}}</span></text>
					</view>
				</view>
				<view class="content-small">
					<view class="small-box">
						<text>商品总价</text>
						<text>￥{{ totalPrice }}</text>
					</view>
					<view class="small-other">
						<text>优惠卷</text>
						<view class="right">
							<text>无可用</text>
							<view class="icon iconfont icon-youjiantou"></view>
						</view>
					</view>
					<view class="small-other">
						<text>礼品卡</text>
						<view class="right">
							<text>无可用</text>
							<view class="icon iconfont icon-youjiantou"></view>
						</view>
					</view>
					<view class="small-other">
						<text>现金卷</text>
						<view class="right">
							<text>无可用</text>
							<view class="icon iconfont icon-youjiantou"></view>
						</view>
					</view>
					<view class="small-other">
						<text>红包</text>
						<view class="right">
							<text>无可用</text>
							<view class="icon iconfont icon-youjiantou"></view>
						</view>
					</view>
					<view class="small-box">
						<text>运费</text>
						<text>包邮</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-bottom">
			<view class="bottom-content">
				<text>合计:<span style="color: rgb(253, 88, 4); font-weight: bold; font-size: 40rpx;">￥{{ totalPrice }}</span></text>
				<view class="bottom-suan">
					<button @click="GoPay">去付款</button>
				</view>
			</view>
		</view>
		<!-- 遮罩层 -->
		<view v-if="showModal" class="overlay" @click="closeModal"></view>
		    <view v-if="showModal" class="bottom-popup">
		      <view class="popup-content">
		        <view class="popup-top">
		        	<text>选择地址</text>
					<view class="icon iconfont icon-cha" @click="closeModal"></view>
		        </view>
				<view class="popup-body">
					<view class="popup-body-detail" v-for="(add,index) in address" :key="index"  @click="useaddress(index)">
						<view class="popup-body-left">
							<text>{{add.address_main}}</text>
							<text>{{add.address_detail}}</text>
							<text>{{add.address_name}} {{add.address_phone}}</text>
						</view>
						<view class="popup-body-right">
							<text @click="GoUpdate(index)">编辑</text>
						</view>
					</view>
				</view>
				<view class="popup-foot" @click="GoNewAddress">
					<text>添加新建地址</text>
				</view>
		      </view>
		    </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods:[],
				showModal: false,
				address:[],
				useraddress:[]
			}
		},
		methods: {
			showselectgoods(){
				uni.request({
					url:'http://localhost:3000/api/showselectproduct',
					method:'POST',
					data:{
						user_id:uni.getStorageSync('user_id')
					},
					success:(res)=> {
					    if (res.data.code == 200) {
					        this.goods = res.data.data;
					    } else {
					        console.log('错误信息:', res.data.msg);
					    }
					},
					fail: (err) => {
					    console.log('请求失败:', err); // 请求失败处理
					},
				})
			},
			GoBottomAddress() {
			    this.showModal = true;
				this.disableScroll();
			},
			// 关闭弹出框
			closeModal() {
			  this.showModal = false;
			  this.enableScroll(); // 恢复滚动
			},
			// 禁用页面滚动
			disableScroll() {
			  document.body.style.overflow = 'hidden';
			},
			// 恢复页面滚动
			enableScroll() {
			  document.body.style.overflow = 'auto';
			},
			GoNewAddress(){
				uni.navigateTo({
					url:'/pages/newaddress/newaddress'
				})
			},
			// 展示用户预留地址
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
			},
			// 点击确认使用地址
			useaddress(index){
				this.useraddress = this.address[index];
				this.showModal = false;
				this.enableScroll();
			},
			GoPay(){
				if (!this.useraddress || !this.useraddress.address_main) {
					uni.showToast({
						icon: 'none',
						title: '请选择收货地址'
					});
					return;
				}
				const goods = this.goods;
				const address = this.useraddress || {}; // 如果地址没有选择则为空对象
				// 将商品和地址转换为 JSON 字符串
				const goodsStr = JSON.stringify(goods);
				const addressStr = JSON.stringify(address);
				uni.navigateTo({
				    url: `/pages/paypage/paypage?amount=${this.totalPrice}&address=${encodeURIComponent(addressStr)}&goods=${encodeURIComponent(goodsStr)}` // 通过url传递参数
				});
			}
		},
		onShow() {
			this.showselectgoods();
			this.fetchGoods()
		},
		computed:{
			totalPrice() {
			    return this.goods.reduce((acc, good) => acc + Number(good.total), 0);
			}
		}
	}
</script>

<style lang="scss" scoped>
.orderpage{
	border: 2rpx solid #e7e7e7;
	background-color: #e7e7e7;
	.order-top{
		width: 95%;
		margin: 20rpx auto;
		height: 400rpx;
		display: flex;
		background: rgb(249, 243, 219);
		.order-top-left{
			width: 87%;
			display: flex;
			flex-direction: column;
			text{
				color: rgb(148,102,49);
				font-size: 34rpx;
				margin-top: 10rpx;
				margin-left: 10rpx;
			}
		}
		.iconfont{
			color: rgb(148,102,49);
			font-size: 60rpx;
			margin: auto auto;
		}
	}
	.order-body{
		.order-body-top{
			min-height: 120rpx;
			background-color: white;
			display: flex;
			border-bottom: 4px dashed black;
			.iconfont{
				font-size: 40rpx;
				margin: auto 20rpx;
			}
			.new-position{
				margin: auto 20rpx;
				font-weight: bold;
				font-size: 45rpx;
				width: 75%;
				word-wrap: break-word;
			}
			.new-positions{
				width: 75%;
				.popup-body-left{
						flex: 0.85;
						display: flex;
						flex-direction: column;
						text{
							margin-top: 10rpx;
							margin-left: 40rpx;
						}
						text:nth-of-type(2){
							font-weight: bold;
						}
					}
			}
			.iconfont:nth-of-type(2){
				margin-left: auto;
				font-size: 60rpx;
				color: rgb(179, 179, 179);
			}
		}
		.order-body-content{
			background-color: white;
			margin-bottom: 90rpx;
			.content-box{
				height: 250rpx;
				width: 95%;
				margin: 0 auto;
				display: flex;
				flex: 1;
				.content-img{
					flex: 0.35;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.content-detail{
					flex: 0.65;
					display: flex;
					flex-direction: column;
					text{
						margin-top: 20rpx;
						font-size: 30rpx;
						font-weight: bold;
					}
					text:nth-of-type(2){
						color: #d5d5d5;
						font-weight: 500;
					}
					text:nth-of-type(3){
						color: orange;
						font-weight: bold;
						span{
							float: right;
							margin-right: 30rpx;
							color: #d5d5d5;
						}
					}
				}
			}
			.content-small{
				margin-top: 20rpx;
				.small-box{
					height: 80rpx;
					display: flex;
					justify-content: space-between;
					text{
						margin: auto 20rpx;
						font-weight: bold;
					}
					text:nth-of-type(2){
						font-weight: 500;
					}
				}
				.small-other{
					height: 80rpx;
					display: flex;
					justify-content: space-between;
					text{
						margin: auto 20rpx;
						font-weight: bold;
					}
					.right{
						width: 70%;
						display: flex;
						text{
							margin-left: auto;
							font-weight: 500;
							color: #d5d5d5;
						}
						.iconfont{
							margin: auto 0;
							margin-right: 20rpx;
							font-weight: bold;
							font-size: 40rpx;
							color: #d5d5d5;
						}
					}
				}
			}
		}
	}
	.order-bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: white; /* 可选的背景色 */
		z-index: 99;
		height: 90rpx;
		.bottom-content{
			display: flex;
			justify-content: space-between;
			white-space: nowrap;
			text{
				margin: auto 20rpx;
				width: 90%;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.bottom-suan{
				button{
					border-radius: 60rpx;
					width: 250rpx;
					height: 90%;
					margin: auto 20rpx;
					color: white;
					font-weight: bold;
					background-color: rgb(255, 118, 37);
				}
			}
		}
	}
	.overlay{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
	.bottom-popup{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
		z-index: 999;
		.popup-content{
			height: 1050rpx;
			display: flex;
			flex-direction: column;
			.popup-top{
				display: flex;
				text{
					margin: 20rpx auto;
					font-weight: bold;
					font-size: 46rpx;
				}
				.iconfont{
					margin-top: 20rpx;
				}
			}
			.popup-body{
				height: 850rpx;
				overflow:scroll;
				.popup-body-detail{
					height: 200rpx;
					display: flex;
					flex: 1;
					.popup-body-left{
						flex: 0.85;
						display: flex;
						flex-direction: column;
						text{
							margin-top: 16rpx;
							margin-left: 40rpx;
						}
						text:nth-of-type(2){
							font-weight: bold;
						}
					}
					.popup-body-right{
						display: flex;
						flex: 0.1;
						text{
							margin: auto auto;
							font-size: 30rpx;
							color: #d9d9d9;
						}
					}
				}
			}
			.popup-foot{
				height: 100rpx;
				display: flex;
				background-color: rgb(254, 96, 9);
				border-radius: 40rpx;
				text{
					font-size: 40rpx;
					margin: auto auto;
					color: white;
				}
			}
		}
	}
}

</style>
