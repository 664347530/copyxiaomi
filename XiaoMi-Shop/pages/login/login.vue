<template>
	<view class="login-box">
		<view class="login-logo">
			<view class="logo-img">
				<image src="../../static/img/logo.png" mode=""></image>
			</view>
			<text>小米账号登录</text>
		</view>
		<view class="login-input">
			<uni-easyinput v-model="user" placeholder="邮箱/手机号/小米ID" class="uni-zu"></uni-easyinput>
			<uni-easyinput v-model="password" placeholder="密码" class="uni-zu" type="password"></uni-easyinput>
		</view>
		<view class="login-check">
			<label class="radio">
			  <checkbox class="custom-checkbox" color="#FF3333" @click="toggleAgree"/>
			  <text>已阅读并同意<em>《小米商城用户协议》、《小米商城隐私政策》、《小米帐号隐私政策》、《小米帐号用户协议》</em></text>
			</label>
		</view>
		<view class="login-button">
			<button @click="logincount">登录</button>
		</view>
		<view class="login-other">
			<a href="#/pages/register/register">注册</a>
			<text>|</text>
			<a href="#">忘记密码</a>
			<text>|</text>
			<a href="#">手机号登录</a>
		</view>
		<view class="other-login">
			<text>其他登录方式</text>
			<view class="other-box">
				<view class="boxs">
					<image src="../../static/img/wxlogo.png" mode=""></image>
				</view>
				<view class="boxs">
					<image src="../../static/img/qqlogo.png" mode=""></image>
				</view>
				<view class="boxs">
					<image src="../../static/img/wblogo.jpg" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				user:'',
				password:'',
				agree:false
			}
		},
		methods:{
			toggleAgree(){
				this.agree = !this.agree;
			},
			logincount(){
				// 检查手机号和密码的输入
				if (!this.user || !this.password) {
					uni.showToast({
						title: '请输入手机号和密码',
						icon: 'none'
					});
					return;
				}
				// 检查用户是否同意协议
				if (!this.agree) {
					uni.showToast({
						title: '请同意用户协议和隐私政策',
						icon: 'none'
					});
					return;
				}
				uni.request({
					url:"http://localhost:3000/api/userlogin",
					method:'POST',
					data:{
						user:this.user,
						password:this.password
					},
					success: (res) => {
						console.log(res.data.data);
						if(res.data.code==200){
							uni.showToast({
								title: '登录成功',
								icon: 'success'
							});
							uni.setStorageSync('user_token', res.data.data[0].user_token);
							uni.setStorageSync('user_id', res.data.data[0].user_id);
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/person/person'
								});
							},1000)
						}else{
							uni.showToast({
								title: res.data.message || '账号或密码错误',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.log("请求失败:", err);
						uni.showToast({
							title: '网络错误，请稍后重试',
							icon: 'none'
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.login-box{
	display: flex;
	flex-direction: column;
	.login-logo{
		width: 40%;
		margin: 0 auto;
		height: 300rpx;
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		.logo-img{
			width: 45%;
			margin: 0 auto;
			height: 45%;
			margin-top: 60rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		text{
			text-align: center;
			margin-top: 20rpx;
			font-weight: bold;
		}
	}
	.login-input{
		width: 85%;
		margin: 0 auto;
		.uni-zu{
			margin-top: 20rpx;
		}
	}
	.login-check{
		width: 85%;
		margin: 20rpx auto;
		display: flex;
		.radio{
			display: flex;
			.custom-radio{
			margin: auto 0;
			}
			text{
				font-size: 28rpx;
				em{
					color: orangered;
				}
			}
		}
	}
	.login-button{
		width: 85%;
		margin: 30rpx auto;
		border-radius: 50rpx;
		overflow: hidden;
		border: none;
		button{
			background-color: rgb(233,93,68);
			color: white;
		}
	}
	.login-other{
		width: 85%;
		margin: 0 auto;
		text-align: center;
		text{
			margin: 0 30rpx;
			color: #919191;
		}
		a{
			text-decoration: none;
			color: #919191;
			font-size: 26rpx;
		}
	}
	.other-login{
		margin-top: 70rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		font-size: 26rpx;
		color: #919191;
		.other-box{
			display: flex;
			width: 85%;
			margin: 40rpx auto;
			.boxs{
				height: 100rpx;
				width: 100rpx;
				justify-content: center;
				margin: 0 auto;
				border-radius: 50%;
				background-color: #cfcfcf;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
