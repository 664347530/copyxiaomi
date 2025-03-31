<template>
	<view class="person-box">
		<view class="person-top">
			<view class="person-img">
				<image src="../../static/img/logo.png" mode=""></image>
			</view>
			<view class="person-name">
				<!-- 判断 user 是否有值 -->
				<text class="name-top" v-if="Object.keys(user).length === 0" @tap="gologin">登录/注册</text>
				<view v-else class="name-tops">
					<text class="name-tops">{{ user[0].user_name }}</text>
					<text class="name-id">小米ID:{{ user[0].xiaomiid }}</text>
				</view>
			</view>
		</view>

		<view class="person-small">
			<view class="person-small-box">
				<text class="text-content">0</text>
				<text class="text-contents">米金</text>
			</view>
			<view class="person-small-box">
				<text class="text-content">0</text>
				<text class="text-contents">优惠劵</text>
			</view>
			<view class="person-small-box">
				<text class="text-content">0<span>元</span></text>
				<text class="text-contents">红包</text>
			</view>
			<view class="person-small-box">
				<text class="text-content">20<span>万元</span></text>
				<text class="text-contents">最高可借</text>
			</view>
			<view class="person-small-box">
				<view class="ico iconfont icon-qianbao"></view>
				<text class="text-contents">钱包</text>
			</view>
		</view>
		<view class="myself-bg">
			<image src="../../static/img/images/myselbg_03.jpg" mode=""></image>
		</view>
		<view class="shou-big">
			<view class="myself-zuji">
				<button>收藏 0</button>
				<button>足迹 0</button>
				<button>关注 0</button>
			</view>
			<view class="myself-gongneng">
				<view class="gongneng-box">
					<view class="ico iconfont icon-daifukuan"></view>
					<text>待付款</text>
				</view>
				<view class="gongneng-box">
					<view class="ico iconfont icon-daishou"></view>
					<text>待收货</text>
				</view>
				<view class="gongneng-box">
					<view class="ico iconfont icon-daipingjia"></view>
					<text>待评价</text>
				</view>
				<view class="gongneng-box">
					<view class="ico iconfont icon-tuihuanhuo"></view>
					<text>退换/售后</text>
				</view>
				<view class="gongneng-box">
					<view class="ico iconfont icon-dingdan"></view>
					<text @click="GoShow">全部订单</text>
				</view>
			</view>
		</view>
		<view class="myself-serve">
			<view class="myself-top">
				<text>服务</text>
				<view class="ico iconfont icon-youjiantou"></view>
			</view>
			<view class="myself-body">
				<view class="myself-body-top">
					<view class="serve-name">
						<view class="img-box">
						<image src="../../static/img/images/images/background1_03.jpg" mode=""></image>	
						</view>
						<text>一键安装</text>
					</view>
					<view class="serve-name">
						<view class="img-box">
						<image src="../../static/img/images/images/background1_05.jpg" mode=""></image>	
						</view>
						<text>一键退换</text>
					</view>
					<view class="serve-name">
						<view class="img-box">
						<image src="../../static/img/images/images/background1_07.jpg" mode=""></image>	
						</view>
						<text>一键维修</text>
					</view>
					<view class="serve-name">
						<view class="img-box">
						<image src="../../static/img/images/images/background1_09.jpg" mode=""></image>	
						</view>
						<text>服务进度</text>
					</view>
				</view>
				<view class="myself-body-top">
					<view class="serve-name">
						<view class="img-box">
						<image src="../../static/img/images/images/background1_15.jpg" mode=""></image>	
						</view>
						<text>小米之家</text>
					</view>
					<view class="serve-name">
						<view class="img-box">
						<image src="../../static/img/images/images/background1_16.jpg" mode=""></image>	
						</view>
						<text>客服中心</text>
					</view>
					<view class="serve-name">
						<view class="img-box">
						<image src="../../static/img/images/images/background1_17.jpg" mode=""></image>	
						</view>
						<text>以旧换新</text>
					</view>
					<view class="serve-name">
						<view class="img-box">
						<image src="../../static/img/images/images/background1_18.jpg" mode=""></image>	
						</view>
						<text>保障权益</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				user:{}
			}
		},
		methods:{
			gologin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			GoShow(){
				uni.navigateTo({
					url:'/pages/showorders/showorders'
				})
			},
			lookuser() {
			    const userId = uni.getStorageSync("user_id"); // 获取user_id
			    if (userId) {
			        uni.request({
			            url: 'http://localhost:3000/api/lookuser',
			            method: 'POST',
			            data: {
			                user_id: userId // 使用正确的user_id
			            },
			            success:(res)=> {
			                if (res.data.code == 200) {
			                    this.user = res.data.data;
			                } else {
								this.user={}
			                    console.log('错误信息:', res.data.msg);
			                }
			            },
			            fail: (err) => {
			                console.log('请求失败:', err); // 请求失败处理
			            },
			        });
			    } else {
			        console.log('没有找到用户ID');
			    }
			},
			onNavigationBarButtonTap(e) {
			  // 根据点击的按钮不同执行不同的跳转
			  if (e.index === 0) {
				uni.navigateTo({
				  url: '/pages/person/person' // 跳转到个人中心页面
				});
			  } else if (e.index === 1) {
				uni.navigateTo({
				  url: '/pages/setpage/setpage' // 跳转到另一个页面
				});
			  } else if (e.index === 2) {
				uni.navigateTo({
				  url: '/pages/yetAnotherPage/yetAnotherPage' // 跳转到更多页面
				});
			  } else if (e.index === 3) {
				uni.navigateTo({
				  url: '/pages/memberCode/memberCode' // 跳转到会员码页面
				});
			  }
			}
		},
		onShow() {
			this.lookuser()
		}
	}
</script>

<style lang="scss" scoped>
.person-box{
	display: flex;
	flex-direction: column;
	background-color: #e8e8e8;
	.person-top{
		height: 110rpx;
		display: flex;
		.person-img{
			margin-left: 30rpx;
			border-radius: 50%;
			width: 110rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.person-name{
			width: 350rpx;
			display: flex;
			flex-direction: column;
			.name-top{
				font-weight: bold;
				font-size: 42rpx;
				margin: auto 20rpx;
			}
			.name-tops{
				display: flex;
				flex-direction: column;
				width: 350rpx;
				.name-tops{
					margin-left: 10rpx;
					font-weight: bold;
					font-size: 38rpx;
					margin-top: 10rpx;
				}
				.name-id{
					margin-left: 10rpx;
				}
			}
		}
	}
	.person-small{
		height: 120rpx;
		display: flex;
		flex: 1;
		width: 96%;
		margin: 20rpx auto;
		.person-small-box{
			flex: 0.25;
			height: 120rpx;
			display: flex;
			flex-direction: column;
			.text-content{
			 margin: 0 auto;
			 font-size: 60rpx;
			 span{
				 font-size: 26rpx;
			 }
			}
			.text-contents{
			 margin: 0 auto;
			 font-size: 26rpx;
			 color:gray;
			}
			.iconfont{
				margin: 0 auto;
				font-weight: 600;
				font-size: 80rpx;
			}
		}
	}
	.myself-bg{
		height: 200rpx;
		width: 96%;
		margin: 0 auto;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.shou-big{
		width: 96%;
		margin: 20rpx auto;
		border-radius: 20rpx;
		background: white;
		overflow: hidden;
		.myself-zuji{
			height: 60rpx;
			display: flex;
			margin: 10rpx auto;
			flex: 1;
			button{
				flex: 0.33;
				height: 60rpx;
				text-align: center;
				font-size: 26rpx;
				border-radius: 0;
				border: 2rpx solid transparent; 
			}
			button:nth-of-type(2){
				border-left: 2rpx solid gray;
				border-right: 2rpx solid gray;
			}
		}
		.myself-gongneng{
			height: 120rpx;
			margin: 10rpx auto;
			display: flex;
			flex: 1;
			border-top: 2rpx solid #d6d6d6;
			.gongneng-box{
				flex: 0.2;
				display: flex;
				flex-direction: column;
				.iconfont{
					margin: 0 auto;
					font-size: 80rpx;
				}
				text{
					font-size: 26rpx;
					text-align: center;
				}
			}
		}
	}
	.myself-serve{
		width: 96%;
		margin: 4rpx auto;
		height: 410rpx;
		border-radius: 20rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.myself-top{
			display: flex;
			height: 15%;
			justify-content: space-between;
			text{
				margin: auto 14rpx;
				font-weight: 600;
			}
			.iconfont{
				margin: auto 14rpx;
				font-size: 60rpx;
			}
		}
		.myself-body{
			height: 85%;
			display: flex;
			flex-direction: column;
			.myself-body-top{
				height: 50%;
				margin-top: 20rpx;
				display: flex;
				flex: 1;
				.serve-name{
					flex: 0.25;
					display: flex;
					flex-direction: column;
					.img-box{
						width: 70%;
						height: 70%;
						margin: 0 auto;
						image{
							width: 100%;
							height: 90%;
						}
					}
					text{
						font-size: 26rpx;
						text-align: center;
						font-weight: bold;
					}
				}
			}
		}
	}
}
</style>
