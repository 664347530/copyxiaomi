<template>
	<view class="product-box">
		<view class="big-box">
			<view class="product-content" v-for="(item,index) in ngoods" :key="index" @tap="GoProduct(item.proudct_id)">
				<view class="img-box">
					<image :src="'/static/surfaceimg/' + item.img_product"></image>
				</view>
				<text class="product-name">{{item.name_product}}</text>
				<text class="product-jie">{{item.jie_product}}</text>
				<text class="product-price">￥{{item.price_product}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"shopproduct",
		props: {
		    ngoods: { type: Array, default: () => [] }  // 接受父组件传递的 goods 数据
		},
		methods:{
			GoProduct(proudct_id){
				uni.navigateTo({
					url: `/pages/detailpage/detailpage?product_id=${proudct_id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.product-box{
	width: 100%;
	background-color: #e7e7e7;
	.big-box{
		width: 94%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		.product-content{
			width: 48%;
			height: 440rpx;
			margin-left: 10rpx;
			margin-top: 16rpx;
			display: flex;
			border-radius: 30rpx;
			flex-direction: column;
			overflow: hidden;
			background-color: rgb(255, 255, 255);
			.img-box{
				height: 320rpx;
				image{
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.product-name{
				text-align: center;
				font-weight: 600;
			}
			.product-jie{
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: left;
				font-size: 20rpx;
				margin-left: 10rpx;
			}
			.product-price{
				font-weight: 600;
				margin-left: 10rpx;
			}
		}
	}
	
}
</style>