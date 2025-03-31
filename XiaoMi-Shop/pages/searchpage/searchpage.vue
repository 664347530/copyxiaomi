<template>
	<view class="search-box">
		<view class="head-title" v-if="searchbox.length > 0">
			<view class="title-head">
				<text class="search-title">搜索历史</text>
				<view class="icon iconfont icon-shanchu" @tap="cleanhistory"></view>
			</view>
			<view class="search-content">
				<view class="search-big">
					<view class="search-name" v-for="(item,index) in searchbox" :key="index" @tap="Gohistory(item.search_name)">{{item.search_name}}</view>
				</view>
			</view>
		</view>
		<view class="head-title">
			<view class="title-head">
				<text class="search-title">猜你想搜</text>
				<view class="icon iconfont icon-shuaxin"></view>
			</view>
			<view class="search-content">
				<view class="search-big">
					<view class="search-name">小米手机</view>
					<view class="search-name">小米手机</view>
					<view class="search-name">小米手机</view>
					<view class="search-name">小米手机</view>
					<view class="search-name">小米手机</view>
				</view>
			</view>
		</view>
		<view class="body-title">
			<image src="../../static/img/resou.png" mode=""></image>
			<view class="body-product">
				<view class="products-img" v-for="(item,index) in goods" :key="index" @tap="GoProduct(item.proudct_id)">
					<view class="img-box">
						<image :src="'/static/surfaceimg/' + item.img_product"></image>
					</view>
					<view class="img-name">{{item.name_product}}<view class="ying">新</view></view>
					
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
				searchbox:[],
				searchKeyword:''
			}
		},
		methods: {
			fetchGoods() {
			  uni.request({
				url: 'http://127.0.0.1:3000/api/showproduct',
				method: 'GET',
				success: (res) => {
				  if (res.data.code === 200) {
					this.goods = res.data.data; // 将获取到的数据存储到 goods 中
				  } else {
					console.log('错误信息:', res.data.msg);
				  }
				},
				fail: (err) => {
				  console.log('请求失败:', err); // 请求失败处理
				},
			  });
			},
			// 查看搜索记录
			selecthistory(){
				uni.request({
					url:"http://127.0.0.1:3000/api/selectsearch",
					method:'POST',
					success: (res) => {
						if (res.data.code === 200) {
							this.searchbox = res.data.data;
						} else {
							console.log('错误信息:', res.data.msg);
						}
					}
				})
			},
			// 清空搜索记录
			cleanhistory(){
				uni.request({
					url:"http://127.0.0.1:3000/api/cleanhistory",
					method:'POST',
					success: (res) => {
						if (res.data.code === 200) {
							this.searchbox = [];
							uni.showToast({
								title:'已全部清空',
								duration:500
							})
						} else {
							console.log('错误信息:', res.data.msg);
						}
					}
				})
			},
			// 前往所点击的商品详情
			GoProduct(proudct_id){
				uni.navigateTo({
					url: `/pages/detailpage/detailpage?product_id=${proudct_id}`
				})
			},
			// 点击搜索进入页面
			onNavigationBarButtonTap(){
			// 检查输入框内容
			  if (this.searchKeyword.trim() === '') {
				uni.showToast({
				  title: '内容不能为空',
				  icon: 'none',
				  duration: 1500
				});
			  } else {
				uni.navigateTo({
				  url: `/pages/showselectpage/showselectpage?keyword=${this.searchKeyword}`
				});
			  // 记录搜索内容的关键字
				  uni.request({
					url:"http://127.0.0.1:3000/api/recordkeywod",
					method:'POST',
					data:{
						search_name:this.searchKeyword
					},
					success: (res) => {
					  if (res.data.code === 200) {
						console.log('插入成功:');
					  } else {
						console.log('错误信息:', res.data.msg);
					  }
					},
					fail: (err) => {
					  console.log('请求失败:', err); 
					},
				  })
			  }
			},
			onNavigationBarSearchInputChanged(e){
				this.searchKeyword=e.text
			},
			Gohistory(search_name){
				this.searchKeyword=search_name;
				uni.navigateTo({
				  url: `/pages/showselectpage/showselectpage?keyword=${this.searchKeyword}`
				});
			}
		},
		onShow() {
			this.fetchGoods();
			this.selecthistory()
		}
	}
</script>

<style lang="scss" scoped>
.search-box{
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: rgb(229, 229, 229);
	background-color: white;
	.head-title{
		margin-top: 20rpx;
		.title-head{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 0 20rpx;
			.search-title{
				font-weight: 600;
			}
			.icon{
				font-weight: 600;
				padding-top: 4rpx;
				font-size: 40rpx;
			}
		}
		.search-content{	
			background-color: white;
			.search-big{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.search-name{
					margin: 10rpx 6rpx;
					background-color: #d8d8d8;
					font-weight: 500;
					padding: 5rpx 15rpx;
					border-radius: 30rpx;
				}
			}
		}
	}
	.body-title{
		background-color: white;
		width: 99%;
		margin: 10rpx auto;
		display: flex;
		flex-direction: column;
		image{
			width: 100%;
			height: 100rpx;
		}
		.body-product{
			width: 95%;
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			.products-img{
				height: 130rpx;
				width: 340rpx;
				margin: 6rpx 4rpx;
				display: flex;
				.img-box{
					width: 40%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.img-name{
					width: 60%;
					margin: auto 0;
					font-size: 30rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					font-weight: 600;
					.ying{
						border: 2rpx solid orange;
						width: 24rpx;
						height: 24rpx;
						font-size: 20rpx;
						color: orange;
						font-weight: 600;
						text-align: center;
					}
				}
			}
		}
	}
}
</style>
