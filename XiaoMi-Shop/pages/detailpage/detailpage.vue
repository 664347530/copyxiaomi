<template>
	<view class="detailpage">
		<view class="detail-head">
			<view class="ico iconfont icon-zuojiantou" @tap="GoBack"></view>
			<view class="head-center">
				<view class="head-title" v-for="(item,index) in headtitle" :key="index" @tap="changeindex(index)"
				:class="{'head-title-active': afterindex === index}"><view>{{item.name}}</view></view>
			</view>
			<view class="head-right">
				<view class="ico iconfont icon-shangchuan"></view>
				<view class="ico iconfont icon-sangedian"></view>
			</view>
		</view>
		<view class="detail-body" v-for="(good,index) in goods" :key="index">
			<view class="img-box">
				<image :src="selectedImage || '/static/surfaceimg/' + good.img_product"></image>
			</view>
			<view class="price-box">
				<view class="price-left">￥{{ selectprice ? selectprice : good.price_product }}</view>
				<view class="price-right">
					<view class="ico iconfont icon-lingdang"><text>降价提醒</text></view>
				</view>
			</view>
			<view class="advertisement-box">
				<image src="../../static/img/mal 1.png" mode=""></image>
			</view>
			<view class="product-jieshao">
				<view class="product-name">{{good.name_product}}</view>
				<view class="ico iconfont icon-shangchuan"></view>
			</view>
			<view class="detail-jieshao">
				<text>{{good.youdian_product}}</text>
			</view>
			<view class="kuang">
				<SelectContent ref="selectContent" :goods="goods" @update-img="handleSelectImg" @update-price="handleSelectprice"></SelectContent>
			</view>
		</view>
		<view class="zi">
			<Shopproduct :ngoods="ngoods"></Shopproduct>
		</view>
		
		<!-- 底部 -->
		<view class="detail-foot">
			<view class="foot-left">
				<view class="ico iconfont icon-kefu"><text>客服</text></view>
				<view class="ico iconfont icon-shoucang"><text>收藏</text></view>
				<view class="ico iconfont icon-gouwuche" @click="gocar"><text>购物车</text></view>
			</view>
			<view class="foot-right">
				<view class="right-box">
					<button @click="addToCart">加入购物车</button>
					<button>立即购买</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SelectContent from '../../components/selectcontent/selectcontent.vue'
	import Shopproduct from '../../components/shopproduct/shopproduct.vue'
	export default {
		data() {
			return {
				headtitle:[
					{name:"商品"},
					{name:"详情"},
					{name:"推荐"}
				],
				afterindex:0,
				product_id:null,
				goods:{},
				selectedImage: '',
				selectprice:'',
				ngoods:[],
			}
		},
		methods: {
			GoBack() {
			    const pages = getCurrentPages();
			    const currentPage = pages[pages.length - 1];
			    const fromPage = currentPage.options.fromPage;	
			    if (fromPage) {
			        uni.navigateBack({
			           delta: 1
			        });
			    } else {
			        uni.reLaunch({
			            url: '/pages/index/index'
			        });
			    }
			},
			changeindex(index){
				this.afterindex = index
			},
			addToCart() {
				this.$refs.selectContent.showselect();
			},
			gocar(){
				uni.navigateTo({
					url:'/pages/shopcart/shopcart'
				})
			},
			// 通过id查询商品信息
			seeproduct(){
				uni.request({
					url:"http://localhost:3000/api/seedetail",
					method:'POST',
					data:{
						product_id:this.product_id
					},
					success: (res) => {
					  if (res.data.code === 200) {
						this.goods = res.data.data;
						// console.log(res.data.data);
					  } else {
						console.log('错误信息:', res.data.msg);
					  }
					},
					fail: (err) => {
					  console.log('请求失败:', err); 
					},
				})
			},
			handleSelectImg(img) {
			    this.selectedImage = img;
			},
			handleSelectprice(price){
				this.selectprice=price;
			},
			fetchGoods() {
			  uni.request({
				url: 'http://localhost:3000/api/showproduct',
				method: 'GET',
				success: (res) => {
				  if (res.data.code === 200) {
					this.ngoods = res.data.data; // 将获取到的数据存储到 goods 中
				  } else {
					console.log('错误信息:', res.data.msg);
				  }
				},
				fail: (err) => {
				  console.log('请求失败:', err); // 请求失败处理
				},
			  });
			},
		},
		onLoad(options) {
			this.changeindex(0);
			// 接收传过来的值
			this.product_id=options.product_id;
			this.seeproduct();
		},
		onShow() {
			this.fetchGoods();
		},
		components: {
			SelectContent,
			Shopproduct
		}
	}
</script>


<style lang="scss" scoped>
.head-title-active{
	border-bottom: 2px solid orange;
}
.detailpage{
	display: flex;
	flex-direction: column;
	margin-top:70rpx ;
	.detail-head{
		height: 70rpx;
		width: 100%;
		display: flex;
		background-color: rgba(217, 217, 217, 0.5);
		position: fixed;
		top: 0;
		z-index: 2;
		.iconfont{
			margin: auto 0;
			font-weight: 600;
			width: 30%;
			font-size: 40rpx;
		}
		.head-center{
			width: 40%;
			display: flex;
			.head-title{
				margin: auto auto;
				text-align: center;
				font-size: 20rpx;
				height: 40rpx;
				width: 50rpx;
				padding-top: 20rpx;
				font-weight: 600;
			}
		}
		.head-right{
			width: 30%;
			display: flex;
			justify-content: space-evenly;
			.iconfont{
				text-align: right;
				font-size: 40rpx;
			}
		}
	}
	.detail-body{
		display: flex;
		flex-direction: column;
		margin-bottom: 90rpx;
		.img-box{
			height: 600rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.price-box{
			display: flex;
			height: 70rpx;
			justify-content: space-between;
			.price-left{
				margin: auto 20rpx;
				font-size: 40rpx;
				font-weight: 600;
				color: rgb(251,83,50);
			}
			.price-right{
				margin: auto 20rpx;
				.iconfont{
					font-size: 30rpx;
					color: rgb(255,89,3);
					text{
						font-size: 25rpx;
					}
				}
			}
		}
		.advertisement-box{
			height: 80rpx;
			width: 97%;
			margin: 0 auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.product-jieshao{
			display: flex;
			justify-content: space-between;
			margin: 20rpx 10rpx;
			.product-name{
				font-size: 40rpx;
				margin-left: 10rpx;
			}
			.iconfont{
				font-size: 50rpx;
				margin: 0 20rpx;
				font-weight: 600;
			}
		}
		.detail-jieshao{
			width: 97%;
			margin: 0 auto;
			text{
				font-size: 30rpx;
				margin-top: 20rpx;
			}
		}
	}
	.detail-foot{
		overflow: hidden;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 99%;
		height: 90rpx;
		display: flex;
		z-index: 1;
		flex: 1;
		background-color: white;
		.foot-left{
			flex: 0.4;
			display: flex;
			.iconfont{
				margin: auto auto;
				font-size: 40rpx;
				display: flex;
				flex-direction: column;
				text-align: center;
				text{
					font-size: 26rpx;
				}
			}
		}
		.foot-right{
			flex: 0.6;
			.right-box{
				display: flex;
				flex: 1;
				width: 96%;
				height: 100%;
				margin: 0 auto;
				border-radius: 44rpx;
				overflow: hidden;
				button{
					flex: 0.5;
					font-size: 30rpx;
					line-height: 90rpx;
					border: none;
					color: white;
					border-radius: 0rpx;
				}
				button:nth-of-type(1){
					background: linear-gradient(to right, #ffaa00, #e59900);
				}
				button:nth-of-type(2){
					background: linear-gradient(to right, #e12701, #e56a05);
				}
			}
		}
	}
}
.zi{
	margin-bottom: 90rpx;
}
.kuang{
	z-index: 2;
}
</style>
