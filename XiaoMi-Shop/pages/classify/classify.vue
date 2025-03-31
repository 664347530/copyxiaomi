<template>
	<view class="classify-list">
		<!-- 左边列表 -->
		<scroll-view scroll-y="true" class="list-left">
			<view class="small-list" v-for="(item,index) in listbox" :key="index" @tap="changeindex(index)"
			:class="{'left-name-active': afterindex === index}">
				<view class="list-name">{{item.name}}</view>
			</view>
		</scroll-view>
		<!-- 右边列表 -->
		<view class="list-right">
			<view class="right-title">{{title}}</view>
			<hr />
			<view class="right-box">
				<view class="content-big" v-for="(item,index) in goods" :key="index">
					<view class="img-box">
						<image :src="'/static/surfaceimg/' + item.img_product"></image>
					</view>
					<view class="product-name">{{item.name_product}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				listbox:[
					{name:"XiaoMi手机",type:"Xphone"},
					{name:"REDMI手机",type:"Rphone"},
					{name:"手机配件",type:"Fittings"},
					{name:"电脑平板",type:"ipad"},
					{name:"智能穿戴",type:"Smart"},
					{name:"电视",type:"WatchTV"},
					{name:"空调",type:"AirCondition"},
					{name:"冰洗厨电",type:"Clean"},
					{name:"小家电",type:"household"},
					{name:"智能家居",type:"home"},
					{name:"出行运动",type:"Sport"},
					{name:"车周边",type:"Car"},	
				],
				afterindex:0,
				title:"XiaoMi手机",
				goods:[]
			}
		},
		methods:{
			changeindex(index){
			    // 获取点击的项
			    const item = this.listbox[index];
				this.title=item.name
				this.afterindex=index
				this.type=item.type
				uni.request({
					url:'http://localhost:3000/api/classfiyproduct',
					method:'POST',
					data:{
						type:this.type
					},
					success: (res) => {
						if(res.data.code){
							this.goods=res.data.data
						}else{
							console.log('错误信息:', res.data.msg);
						}
					},
					fail: (err) => {
					  console.log('请求失败:', err);
					},
				})
			},
			onSearchFocus() {
				uni.navigateTo({
				    url: '/pages/searchpage/searchpage'
				});
			}
		},
		onLoad() {
			this.changeindex(0);
		}
	}
</script>

<style lang="scss" scoped>
.classify-list{
	display: flex;
	flex: 1;
	.list-left{
		width: 170rpx;
		height: 100%;
		flex: 0.22;
		.small-list{
			border-bottom: 2rpx solid #e1e1e1;
			font-size: 28rpx;
			font-weight: bold;
			margin-top: 10rpx;
			height: 80rpx;
			.list-name{
				padding: 20rpx 0;
				text-align: center;
			}
		}
	}
	.list-right{
		flex: 0.78;
		display: flex;
		flex-direction: column;
		.right-title{
			font-weight: 600;
			display: inline-block;
			margin: 20rpx 30rpx;
		}
		hr{
			width: 90%;
			margin: 0 auto;
		}
		.right-box{
			width: 94%;
			margin: 20rpx auto;
			display: flex;
			flex-wrap: wrap;
			.content-big{
				height: 140rpx;
				margin: 10rpx 10rpx;
				width: 115rpx;
				.img-box{
					width: 100%;
					height: 105rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.product-name{
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-align: center;
					font-size: 21rpx;
				}
			}
		}
	}
}
.left-name-active{
	border-left: 8rpx solid #ff5500;
	background-color: #FFFFFF;
}
</style>
