<template>
	<view class="newaddress">
		<view class="address-top">
			<view class="ico iconfont icon-zuojiantou" @click="Goback"></view>
			<text>新建收货地址</text>
		</view>
		<view class="address-body">
			<view class="body-detail">
				<text>姓名</text>
				<input type="text" placeholder="填写收货人姓名" v-model="address_name" />
			</view>
			<view class="body-detail">
				<text>电话</text>
				<input type="text" placeholder="填写收货人手机号" v-model="address_phone"  />
			</view>
			<view class="body-detail">
				<text>所在地区</text>
				<input type="text" placeholder="填写地区信息" v-model="address_main" />
			</view>
			<view class="body-detail">
				<text>详细地址</text>
				<input type="text" placeholder="小区,楼牌号等" v-model="address_detail" />
			</view>
			<view class="address-mo">
				<view class="mo-left">
					<text>设置为默认地址</text>
					<text>提醒:通常使用该地址下单</text>
				</view>
				<view class="mo-right">
					<label class="mo">
						<checkbox :checked="isChecked" @click="handleCheckboxClick" />
					</label>
				</view>
			</view>
		</view>
		<view class="address-bottom" @click="baocun">
			<text>保存</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address_name:'',
				address_phone:'',
				address_main:'',
				address_detail:'',
				isChecked: false,
				value: 0
			}
		},
		methods: {
			Goback(){
				uni.navigateBack({
					delta: 1
				})
			},
			handleCheckboxClick() {
			    this.isChecked = !this.isChecked; // 切换选中状态
			    this.value = this.isChecked ? 1 : 0;
			},
			baocun(){
			  // 表单验证
			  if (!this.address_name) {
				uni.showToast({
				  title: '请填写收货人姓名',
				  icon: 'none',
				});
				return;
			  }
			  if (!this.address_phone) {
				uni.showToast({
				  title: '请填写收货人手机号',
				  icon: 'none',
				});
				return;
			  }
			  if (!this.address_main) {
				uni.showToast({
				  title: '请填写所在地区',
				  icon: 'none',
				});
				return;
			  }
			  if (!this.address_detail) {
				uni.showToast({
				  title: '请填写详细地址',
				  icon: 'none',
				});
				return;
			  }
				uni.request({
					url:'http://localhost:3000/api/newaddress',
					method:'POST',
					data:{
						user_id:uni.getStorageSync('user_id'),
						address_name:this.address_name,
						address_phone:this.address_phone,
						address_main:this.address_main,
						address_detail:this.address_detail,
						address_default:this.value
					},
					success:(res)=> {
					    if (res.data.code == 200) {
							uni.showToast({
								title:'保存成功'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								})
							},2000)
					    } else {
					        console.log('错误信息:', res.data.msg);
					    }
					},
					fail: (err) => {
					    console.log('请求失败:', err); // 请求失败处理
					},
				})
			}
			
		},
		computed:{
			
		}
	}
</script>

<style lang="scss" scoped>
.newaddress{
	background-color: #e7e7e7;
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
		height: 100%;
		.body-detail{
			border-bottom: 1px dashed gray;
			height: 80rpx;
			display: flex;
			background-color: white;
			text{
				margin: auto 20rpx;
				width: 10%;
				white-space: nowrap;
				font-weight: bold;
			}
			input{
				width: 75%;
				margin: auto 0;
				margin-left: 70rpx;
				
			}
		}
		.body-detail:nth-of-type(3){
			margin-top: 25rpx;
		}
		.address-mo{
			margin-top: 20rpx;
			height: 120rpx;
			display: flex;
			flex: 1;
			background-color: white;
			.mo-left{
				flex: 0.7;
				display: flex;
				flex-direction: column;
				text:nth-of-type(1){
					color: black;
					font-weight: bold;
					margin-top: 16rpx;
					margin-left: 20rpx;
				}
				text:nth-of-type(2){
					color: #d6d6d6;
					margin-top: 10rpx;
					margin-left: 20rpx;
				}
			}
			.mo-right{
				flex: 0.3;
				display: flex;
				.mo{
					margin: auto 0;
					margin-left: auto;
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
		text{
			margin: auto auto;
			color: white;
			font-weight: bold;
		}
	}
}
</style>
