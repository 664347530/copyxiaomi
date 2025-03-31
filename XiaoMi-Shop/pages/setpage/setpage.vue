<template>
	<view class="setpage">
		<view class="set-person" v-if="user && user[0]">
			<view class="person-img">
				<image src="../../static/img/logo.png" mode=""></image>
			</view>
			<view class="person-jie">
				<text class="person-name">{{ user[0].user_name }}</text>
				<text class="person-id">小米ID:{{ user[0].xiaomiid }}</text>
			</view>
			<view class="icon iconfont icon-youjiantou" @click="GoPersonset"></view>
		</view>
		<view class="number-pass"v-if="user && user[0]">
			<text class="number-phone">密保手机</text>
			<view class="number-content">
				<text class="num">{{ masknumber(user[0].user_phone) }}</text>
			</view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-pass" @click="GoAddress">
			<text class="number-phone">收货地址</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-pass">
			<text class="number-phone">意见反馈</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-pass">
			<text class="number-phone">隐私设置</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-passs">
			<text class="number-phone">小米商城隐私政策</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-pass">
			<text class="number-phone">关于商城</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-pass">
			<text class="number-phone">协议规则</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-pass">
			<text class="number-phone">资质证照</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-passss">
			<text class="number-phone">个人信息收集与使用清单</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="number-passss">
			<text class="number-phone">个人信息第三方共享清单</text>
			<view class="number-content"></view>
			<view class="icon iconfont icon-youjiantou"></view>
		</view>
		<view class="person-tui" v-if="user && user[0]">
			<text @click="tuizhang">退出账号</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{}
			}
		},
		methods: {
			tuizhang(){
				const content=['user_id','user_token'];
				content.forEach(key=>{
					uni.removeStorage({
						key:key,
						success:()=>{
							console.log('删除成功');
						},
						fail:()=>{
							console.log('删除失败');
						}
					})
				});
				uni.showToast({
					title:'退出成功',
					icon:'success'
				});
				setTimeout(()=>{
					uni.reLaunch({
						url:'/pages/index/index'
					})
				},1000)
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
								console.log(this.user);
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
			masknumber(phone){
				return phone.replace(/(\d{3})\d{4}(\d{4})/, '\$1****\$2');
			},
			GoPersonset(){
				uni.navigateTo({
					url:'/pages/personset/personset'
				})
			},
			GoAddress(){
				uni.navigateTo({
					url:'/pages/addresspage/addresspage'
				})
			}
		},
		onShow() {
			this.lookuser()
		}
	}
</script>

<style lang="scss" scoped>
.setpage{
	// border: 1px solid black;
	background-color: #e8e8e8;
	.set-person{
		border-top: 2rpx solid gray;
		border-bottom: 2rpx solid gray;
		height: 120rpx;
		display: flex;
		background-color: white;
		.person-img{
			width: 120rpx;
			border-radius: 50%;
			margin-left: 20rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.person-jie{
			margin-left: 20rpx;
			width: 530rpx;
			display: flex;
			flex-direction: column;
			.person-name{
				margin-top: 10rpx;
				font-weight: bold;
			}
			.person-id{
				font-size: 26rpx;
				margin-top: 6rpx;
				color: gray;
			}
		}
		.iconfont{
			margin: auto 0;
			font-size: 40rpx;
		}
	}
	.number-pass{
		border-bottom: 2rpx solid gray;
		height: 100rpx;
		display: flex;
		background-color: white;
		.number-phone{
			margin: auto 20rpx;
			font-weight: 600;
			color: gray;
			font-size: 30rpx;
		}
		.number-content{
			margin-left: 20rpx;
			width: 520rpx;
			display: flex;
			.num{
				margin: auto 0;
				margin-left: auto;
				color: gray;
			}
		}
		.iconfont{
			margin: auto 0;
			font-size: 40rpx;
		}
	}
	.number-pass:nth-of-type(4){
		margin-top: 20rpx;
		border-top: 2rpx solid gray;
	}
	.number-pass:nth-of-type(7){
		margin-top: 20rpx;
		border-top: 2rpx solid gray;
	}
	.number-passs{
		border-bottom: 2rpx solid gray;
		height: 100rpx;
		display: flex;
		background-color: white;
		.number-phone{
			margin: auto 20rpx;
			font-weight: 600;
			color: gray;
			font-size: 30rpx;
		}
		.number-content{
			width: 420rpx;
		}
		.iconfont{
			margin: auto 0;
			font-size: 40rpx;
		}
	}
	.number-passss{
		border-bottom: 2rpx solid gray;
		height: 100rpx;
		display: flex;
		background-color: white;
		.number-phone{
			margin: auto 20rpx;
			font-weight: 600;
			color: gray;
			font-size: 30rpx;
		}
		.number-content{
			width: 340rpx;
		}
		.iconfont{
			margin: auto 0;
			font-size: 40rpx;
		}
	}
	.person-tui{
		height: 90rpx;
		display: flex;
		background-color: white;
		margin-top: 20rpx;
		text{
			margin: auto auto;
			font-weight: bold;
		}
	}
}
</style>
