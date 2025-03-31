<template>
	<view class="register-box">
		<view class="jieshao-box">
			<text>系统会根据您选择的国家/地区的法律法规存储您的个人信息</text>
		</view>
		<view class="register-input">
			<uni-easyinput v-model="phone" placeholder="请输入手机号"class="uni-zu" type="tel" :maxlength="11"></uni-easyinput>
			<uni-easyinput v-model="password" placeholder="密码" class="uni-zu" type="password"></uni-easyinput>
		</view>
		<view class="register-check">
			<label class="radio">
			  <checkbox class="custom-checkbox" color="#FF3333" @click="toggleAgree"/>
			  <text>已阅读同意小米账号<em>用户协议</em>和<em>隐私政策</em></text>
			</label>
		</view>
		<view class="register-button">
			<button @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				password:"",
				agree:false
			}
		},
		methods: {
			toggleAgree() {
				this.agree = !this.agree;
			},
			register(){
				// 检查手机号和密码的输入
				if (!this.phone || !this.password) {
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
					url:"http://localhost:3000/api/register",
					method:'POST',
					data:{
						phone:this.phone,
						password:this.password
					},
					success: (res) => {
						if(res.data.code==200){
							uni.showToast({
								title: '注册成功',
								icon: 'success'
							});
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/login/login'
								});
							},1000)
						}else{
							uni.showToast({
								title: res.data.message || '手机号已被注册',
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
.register-box{
	display: flex;
	flex-direction: column;
	.jieshao-box{
		width: 94%;
		margin: 20rpx auto;
		text{
			color: blue;
			font-size: 32rpx;
		}
	}
	.register-input{
		width: 94%;
		margin: 20rpx auto;
		.uni-zu{
			margin-top: 20rpx;
		}
	}
	.register-check{
		width: 94%;
		margin: 20rpx auto;
		.radio{
			display: flex;
			margin-left: 20rpx;
			.custom-radio{
			margin: auto 0;
			}
			text{
				font-size: 28rpx;
				margin-top: 10rpx;
				em{
					color: blue;
					text-decoration: underline;
				}
			}
		}
	}
	.register-button{
		width: 85%;
		margin: 30rpx auto;
		border-radius: 30rpx;
		overflow: hidden;
		border: none;
		button{
			background-color: rgb(174,195,242);
			color: white;
		}
	}
}
</style>
