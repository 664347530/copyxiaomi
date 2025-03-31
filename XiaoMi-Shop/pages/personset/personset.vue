<template>
	<view class="personset-page">
		<view class="personset-top">
			<view class="person-head">
				<text class="head-name">头像</text>
				<view class="head-img">
					<image src="../../static/img/logo.png" mode=""></image>
				</view>
			</view>
			<view class="person-name">
				<text class="name-jie">姓名</text>
				<view class="name-content">
					<text class="name-c">{{user[0].user_name}}</text>
				</view>
				<view class="icon iconfont icon-youjiantou" @click="changname"></view>
			</view>
			<view class="person-name">
				<text class="name-jie">性别</text>
				<view class="name-content">
					<text class="name-c">{{ user && user.length > 0 ? user[0].user_sex : '' }}</text>
				</view>
				<view class="icon iconfont icon-youjiantou" @click="toggle('bottom')"></view>
			</view>
			<view class="person-names">
				<text class="name-jies">生日</text>
				<view class="name-contents"></view>
				<!-- 日期选择框 -->
				<view class="example-body">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick"/>
				</view>
			</view>
			<view class="person-name">
				<text class="name-jie">小米ID</text>
				<view class="name-content">
					<text class="name-c">{{ user[0].xiaomiid }}</text>
				</view>
			</view>
		</view>
		<view class="personset-bottom">
			<view class="person-name">
				<text class="name-jie">修改密码</text>
				<view class="icon iconfont icon-youjiantou"></view>
			</view>
			<view class="person-name">
				<text class="name-jie">收货地址</text>
				<view class="icon iconfont icon-youjiantou"></view>
			</view>
			<view class="person-name">
				<text class="name-jie">密保手机</text>
				<view class="icon iconfont icon-youjiantou"></view>
			</view>
			<view class="person-name">
				<text class="name-jie">第三方账号</text>
				<view class="icon iconfont icon-youjiantou"></view>
			</view>
		</view>
		<!-- 弹出输入框 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose"  mode="input" title="修改昵称" value="小米用户" @confirm="dialogInputConfirm" v-model="newinput">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{},
				newinput:'',
				single:''
			}
		},
		methods: {
			changname(){
				this.$refs.inputDialog.open()
			},
			toggle(){
				uni.showActionSheet({
					itemList: ['男', '女'],
					success: function (res) {
					  const selectedItem = res.tapIndex !== undefined ? ['男', '女'][res.tapIndex] : null;
					  console.log('选中了：' + selectedItem);
					  if(selectedItem){
						  const userId = uni.getStorageSync("user_id");
						  uni.request({
						  	url:'http://localhost:3000/api/updatesex',
							method:'POST',
							data:{
								user_id:userId,
								user_sex:selectedItem
							},
							success:(res)=>{
								if(res.data.code==200){
									uni.navigateTo({
									    url: '/pages/personset/personset'  // 替换为你的页面路径
									});
									console.log('修改成功');
								}else{
									console.log('修改失败');
								}
							},
							fail: (err) => {
							  console.log('请求失败:', err); 
							},
						  })
					  }
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
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
			dialogInputConfirm(){
				const userId = uni.getStorageSync("user_id");
				uni.request({
					url:'http://localhost:3000/api/updatename',
					method:'POST',
					data:{
						user_id:userId,
						newname:this.newinput
					},
					success:(res)=>{
						if(res.data.code==200){
							uni.navigateTo({
							    url: '/pages/personset/personset'  // 替换为你的页面路径
							});
							console.log('修改成功');
						}else{
							console.log('修改失败');
						}
					},
					fail: (err) => {
					  console.log('请求失败:', err); 
					},
				})
			},
		},
		onShow() {
			this.lookuser()
		}
	}
</script>

<style lang="scss" scoped>
.personset-page{
	background-color: #e8e8e8;
	.personset-top{
		// border: 1px solid black;
		margin-top: 20rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		.person-head{
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid gray;
			border-top: 2rpx solid gray;
			.head-name{
				font-weight: bold;
				margin: auto 20rpx;
			}
			.head-img{
				width: 90rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.person-name{
			height: 90rpx;
			border-bottom: 2rpx solid gray;
			display: flex;
			justify-content: space-between;
			.name-jie{
				margin: auto 20rpx;
				font-weight: bold;
			}
			.name-content{
				width: 500rpx;
				display: flex;
				margin-left: auto;
				.name-c{
					margin: auto 0rpx;
					margin-left: auto;
					margin-right: 20rpx;
					font-size: 24rpx;
					color: #cbcbcb;
				}
			}
			.iconfont{
				margin: auto 0;
				font-size: 40rpx;
			}
		}
		.person-names{
			height: 90rpx;
			border-bottom: 2rpx solid gray;
			display: flex;
			justify-content: space-between;
			.name-jies{
				margin: auto 20rpx;
				font-weight: bold;
			}
			.name-contents{
				width: 300rpx;
				display: flex;
				margin-left: auto;
			}
		}
	}
	.personset-bottom{
		margin-top: 40rpx;
		background-color: white;
		.person-name{
			height: 90rpx;
			border-bottom: 2rpx solid gray;
			display: flex;
			justify-content: space-between;
			.name-jie{
				margin: auto 20rpx;
				font-weight: bold;
			}
			.iconfont{
				margin: auto 16rpx;
				font-size: 40rpx;
			}
		}
	}
}
</style>
