<template>
	<view class="container">
		<!-- 自定义导航栏 -->
		<myselfheader></myselfheader>
		<!-- 轮播区 -->
		<view class="swiper-box">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000"
			 :duration="duration" indicator-active-color="#adadad">
				<swiper-item v-for="(item,index) in imgbox" :key="index">
					<view class="swiper-item"><image :src="item.img"></image></view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 滚动区 -->
		<classifybox></classifybox>
		<!-- 背景框一 -->
		<view class="background-max">
			<view class="background-box">
				<view class="background-top">
					<image src="../../static/img/background1.jpg" mode=""></image>
				</view>
				<view class="bottom-max">
					<view class="background-bottom">
						<view class="content-box">
							<view class="img-box">
								<image src="../../static/img/xiaomiphone1.png" mode=""></image>
							</view>
							<text class="phone-name">XiaoMi15></text>
						</view>
						<view class="content-box">
							<view class="img-box">
								<image src="../../static/img/redmiphone1.png" mode=""></image>
							</view>
							<text class="phone-name">RedMi k80></text>
						</view>
						<view class="content-box">
							<view class="img-box">
								<image src="../../static/img/xiaomiphone2.png" mode=""></image>
							</view>
							<text class="phone-name">XiaoMi Civi4></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品区 -->
		<text class="title">热销臻选</text>
		<shopproduct :ngoods="ngoods"></shopproduct>
	</view>
</template>

<script>
import myselfheader from '@/components/myselfheader/myselfheader.vue'
import classifybox from '@/components/classifybox/classifybox.vue'
import shopproduct from '@/components/shopproduct/shopproduct.vue'

export default {
	components: {
		myselfheader,
		classifybox,
		shopproduct
	},
	data() {
		return {
			duration: 500,
			imgbox: [
				{ img: "../../static/swiper/swiper1.jpg" },
				{ img: "../../static/swiper/swiper2.webp" },
				{ img: "../../static/swiper/swiper3.webp" },
				{ img: "../../static/swiper/swiper4.webp" },
				{ img: "../../static/swiper/swiper5.webp" }
			],
			ngoods:[],
		}
	},
	onShow() {
		this.fetchGoods();
	},
	onPullDownRefresh(){
		setTimeout(()=>{
			this.fetchGoods();
			uni.stopPullDownRefresh()
		},1000)
	},
	methods:{
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
	}
}
</script>

<style lang="scss" scoped>
.swiper-box{
	height: 300rpx;
		.swiper {
			height: 300rpx;
				.swiper-item {
					display: block;
					height: 300rpx;
					line-height: 300rpx;
					text-align: center;
					image{
						width: 100%;
						
					}
				}
		}
}
.background-max{
	width: 98%;
	margin-top: 10rpx;
	.background-box {
	  margin: 0 auto;
	  height: 610rpx;
	  background-color: rgb(215, 226, 230);
	  border-radius: 30rpx;
	  overflow: hidden;
	  width: 94%;
		.background-top {
		  width: 96%;              
		  height: 400rpx;  
		  overflow: hidden;
		  border-top-left-radius: 30rpx;
		  border-top-right-radius: 30rpx;
		  margin: 0 auto;  
		  margin-top: 10rpx;
			image {
			  width: 100%;
			  height: 100%;
			  object-fit: cover;
			}
		}
	}
	.bottom-max{
		width: 98%;
		margin: 0 auto;
		.background-bottom {
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			width: 96%;
			bottom: -180rpx;
			height: 190rpx;
			margin: 0 auto;
			background-color: rgb(255, 255, 255);
			display: flex;
			justify-content: space-between;
			padding: 0 10rpx; 
			.content-box {
			   width: 100%;
			   max-width: 200rpx;
			   display: flex;
			   flex-direction: column;
			   align-items: center;
			   justify-content: center;
			   margin-bottom: 20rpx;
			   box-sizing: border-box;
			   .content-box {
			      width: 100%;
			      max-width: 200rpx;
			      display: flex;
			      flex-direction: column;
			      align-items: center;
			      justify-content: center;
			      margin-bottom: 20rpx;
			      box-sizing: border-box;
			   }
			}
		}
	}
}
.img-box {
  width: 100%;
  height: 140rpx;
  background-color: rgb(255, 255, 255);
  margin-bottom: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
	image {
	  width: 90%;
      height: 98%;
      object-fit: contain;
  }
}

.phone-name {
  text-align: center;
  font-weight: 600;
  font-size: 28rpx;
  margin-top: 10rpx;
}
.title{
	margin: 10rpx 30rpx;
	font-weight: 600;
}
.end-msg {
  text-align: center;
  padding: 10px;
  font-size: 16px;
  color: #999;
  background-color: #f0f0f0;
}
</style>