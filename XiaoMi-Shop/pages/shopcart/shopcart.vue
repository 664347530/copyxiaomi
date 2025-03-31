<template>
  <view class="shopcart-box">
	  <!-- 头部自定义框 -->
	<view class="custom-nav">
		<view class="nav-title">购物车</view>
		<view class="edit-btn" @tap="toggleEdit">
		  {{ isEditMode ? '完成' : '编辑' }}
		</view>
	</view>
    <view class="shopcart-content">
      <view class="shopcart-detail" v-for="(pro, index) in products" :key="index">
        <label class="radio" v-if="!isEditMode">
          <checkbox
            :checked="Number(pro.state_product) === 1"
            color="#FF3333"
            class="custom-radio"
            @click="checkradio(index)"
          />
        </label>
        <view class="product-img">
          <image :src="'/static/productdetail/' + pro.product_img"></image>
        </view>
		<!-- 右边 -->
        <view class="product-right">
          <view class="product-name">{{ pro.product_name }}</view>
          <view class="product-jie">
            <view class="product-nei">{{ pro.product_nei }}</view>
            <view class="product-color">{{ pro.product_color }}</view>
          </view>
          <view class="product-bottom">
            <view class="product-price">￥{{ pro.total }}</view>
            <view class="num-box">
              <button :disabled="pro.product_num <= 1" @tap="decrease(pro)">-</button>
              <view class="num">{{ pro.product_num }}</view>
              <button @tap="increase(pro)">+</button>
            </view>
          </view>
        </view>
		<!-- 删除按钮 -->
		<view class="ico iconfont icon-shanchu" v-if="isEditMode" @click="deleteproduct(index)"></view>
      </view>
    </view>
    <view class="tuijian-box">
      <view class="tuijian-title">━━━猜你喜欢━━━</view>
    </view>
    <Shopproduct :ngoods="ngoods"></Shopproduct>
    <!-- 底部购物结算 -->
    <view class="bottom-cart" :style="{ bottom: tabBarHeight + 'px' }">
      <label class="radio">
        <checkbox
          :checked="isAllChecked"
          color="#FF3333"
          class="custom-radio"
          @click="toggleAll"
        /><text>全选</text>
      </label>
      <view class="bottom-midle">
        <view class="midle-top">合计:<text>￥{{ totalPrice }}</text></view>
        <view class="midle-bottom">免运费</view>
      </view>
      <view class="bottom-right">
        <button @click="GoOrder">结算({{ selectedCount }})</button>
      </view>
    </view>
  </view>
</template>

<script>
import Shopproduct from "../../components/shopproduct/shopproduct.vue";
export default {
  data() {
    return {
      num: 1,
      ngoods: [],
      products: [],
      isAllChecked: false, // 全选状态
	  isEditMode:false,
	  tabBarHeight: 50 // 默认值，实际高度会在 onReady 生命周期中获取
    };
  },
  components: {
    Shopproduct,
  },
  computed: {
    // 计算选中的商品数量，当pro.state_product为1时
	selectedCount() {
		return this.products.filter((pro) => Number(pro.state_product) === 1).length;
	},
	// 计算总价
	totalPrice() {
		return this.products
		  .filter((pro) => Number(pro.state_product) === 1) // 过滤出选中的商品
		  .reduce((sum, pro) => sum + Number(pro.total), 0); // 将 total 转换为数值并累加
	},
  },
  methods: {
		// 减少数量
		decrease(product) {
		  if (product.product_num > 1) {
			product.product_num--;
			const product_total = product.product_num * product.product_price;
			const userId = uni.getStorageSync("user_id");
			uni.request({
			  url: "http://localhost:3000/api/updatenum",
			  method: "POST",
			  data: {
				user_id: userId,
				product: product,
				product_total: product_total,
			  },
			  success: (res) => {
				if (res.data.code === 200) {
				  this.showproduct();
				} else {
				  console.log("错误信息:", res.data.msg);
				}
			  },
			  fail: (err) => {
				console.log("请求失败:", err);
			  },
			});
		  }
		},
		// 增加数量
		increase(product) {
		  product.product_num++;
		  const product_total = product.product_num * product.product_price;
		  const userId = uni.getStorageSync("user_id");
		  uni.request({
			url: "http://localhost:3000/api/updatenum",
			method: "POST",
			data: {
			  user_id: userId,
			  product: product,
			  product_total: product_total,
			},
			success: (res) => {
			  if (res.data.code === 200) {
				this.showproduct();
			  } else {
				console.log("错误信息:", res.data.msg);
			  }
			},
			fail: (err) => {
			  console.log("请求失败:", err);
			},
		  });
		},
		// 获取推荐商品
		fetchGoods() {
		  uni.request({
			url: "http://localhost:3000/api/showproduct",
			method: "GET",
			success: (res) => {
			  if (res.data.code === 200) {
				this.ngoods = res.data.data;
			  } else {
				console.log("错误信息:", res.data.msg);
			  }
			},
			fail: (err) => {
			  console.log("请求失败:", err);
			},
		  });
		},
		// 获取购物车商品
		showproduct() {
		  const userId = uni.getStorageSync("user_id");
		  uni.request({
			url: "http://localhost:3000/api/showshopcar",
			method: "POST",
			data: {
			  user_id: userId,
			},
			success: (res) => {
			  if (res.data.code === 200) {
				this.products = res.data.data.map((item) => ({
				  ...item,
				  state_product: Number(item.state_product),
				}));
				// 更新全选状态
				this.isAllChecked = this.products.every((pro) => pro.state_product === 1);
			  } else {
				console.log("错误信息:", res.data.msg);
			  }
			},
			fail: (err) => {
			  console.log("请求失败:", err);
			},
		  });
		},
		// 切换全选状态
		toggleAll() {
		  this.isAllChecked = !this.isAllChecked;
		  const newState = this.isAllChecked ? 1 : 0;
		  const userId = uni.getStorageSync("user_id");
		  // 更新所有商品的选中状态
		  this.products.forEach((product, index) => {
			product.state_product = newState;
			this.updateProductState(userId, product, index);
		  });
		},
		// 更新单个商品的选中状态
		updateProductState(userId, product, index) {
		  uni.request({
			url: "http://localhost:3000/api/updatastate",
			method: "POST",
			data: {
			  user_id: userId,
			  state_num: product.state_product,
			  checkgoods: product,
			},
			success: (res) => {
			  if (res.data.code === 200) {
				this.$set(this.products, index, product);
				console.log("更新成功");
			  } else {
				console.log("错误信息:", res.data.msg);
			  }
			},
			fail: (err) => {
			  console.log("请求失败:", err);
			},
		  });
		},
		// 点击单个商品的复选框
		checkradio(index) {
		  const checkgoods = this.products[index];
		  const stateNum = Number(checkgoods.state_product) === 1 ? 0 : 1;
		  const userId = uni.getStorageSync("user_id");
		  uni.request({
			url: "http://localhost:3000/api/updatastate",
			method: "POST",
			data: {
			  user_id: userId,
			  state_num: stateNum,
			  checkgoods: checkgoods,
			},
			success: (res) => {
			  if (res.data.code === 200) {
				checkgoods.state_product = stateNum;
				this.$set(this.products, index, checkgoods);
				// 更新全选状态
				this.isAllChecked = this.products.every((pro) => pro.state_product === 1);
				console.log("更新成功");
			  } else {
				console.log("错误信息:", res.data.msg);
			  }
			},
			fail: (err) => {
			  console.log("请求失败:", err);
			},
		  });
		},
		// 切换编辑模式
		 toggleEdit() {
			  this.isEditMode = !this.isEditMode;
		},
		GoOrder(){
			uni.navigateTo({
				url:'/pages/orderpage/orderpage'
			})
		},
		deleteproduct(index){
			const checkgoods = this.products[index];
			uni.request({
				url:'http://localhost:3000/api/deleteproduct',
				method:"POST",
				data:{
					checkgoods: checkgoods,
					user_id:uni.getStorageSync("user_id")
				},
				success: (res) => {
				  if (res.data.code === 200) {
					  setTimeout(()=>{
						  uni.showToast({
						  	title:'商品已删除'
						  })
						  this.showproduct();  
					  },1000)
					
				  } else {
					console.log("错误信息:", res.data.msg);
				  }
				},
				fail: (err) => {
				  console.log("请求失败:", err);
				},
			})
		}
	},
	onShow() {
		this.fetchGoods();
		this.showproduct();
	},
	onReady() {
		const that = this;
		uni.getSystemInfo({
		  success: function(res) {
			// 获取窗口的高度
			const windowHeight = res.windowHeight;
			// 计算 TabBar 的位置和高度
			const query = uni.createSelectorQuery().in(that);
			query.select('.uni-tabbar').boundingClientRect(function(rect){
			  if (rect) {
				// 计算 TabBar 的顶部距离窗口底部的距离
				that.tabBarHeight = windowHeight - rect.top;
			  }
			}).exec();
		  }
		});
	}
};
</script>

<style lang="scss" scoped>
.shopcart-box{	
	background-color: #e7e7e7;
	.shopcart-content{
		width: 95%;
		margin: 20rpx auto;
		border-radius: 20rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		.shopcart-detail{
			margin-top: 18rpx;
			height: 230rpx;
			display: flex;
			.radio{
				margin: auto 0;
				.custom-radio{
					transform: scale(0.8);
				}
			}
			.product-img{
				width: 240rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.product-right{
				width: 410rpx;
				display: flex;
				flex-direction: column;
				.product-name{
					font-weight: bold;
					margin: 16rpx 10rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.product-jie{
					height: 80rpx;
					display: flex;
					.product-nei{
						color: #a8a8a8;
						margin: auto 5rpx;
					}
					.product-color{
						color: #a8a8a8;
						margin: auto 5rpx;
					}
				}
				.product-bottom{
					height: 80rpx;
					display: flex;
					.product-price{
						color: orangered;
						font-weight: bold;
						margin-top: 20rpx;
					}
					.num-box{
						width: 50%;
						margin: auto 0;
						margin-left: 80rpx;
						display: flex;
						button{
							  width: 40rpx;
							  height: 60rpx;
							  font-size: 50rpx;
							  text-align: center;
							  line-height: 50rpx;
							  background-color: #fff;
							  text-indent: -16rpx;
						}
						button:disabled {
						  background-color: #b5b5b5; /* 禁用时按钮颜色 */
						  cursor: not-allowed;
						}
						.num {
						  font-size: 30rpx;
						  margin: auto 15rpx;
						}
					}
				}
			}
			.iconfont{
				font-weight: bold;
				margin: auto auto;
			}
		}
	}
	.tuijian-box{
		  display: flex;
		  flex-direction: column;
		  .tuijian-title{
			  text-align: center;
			  margin-top: 10rpx;
			  font-weight: 600;
			  font-size: 40rpx;
		  }
	}
	.bottom-cart{
		height: 80rpx;
		position: fixed;
		width: 100%;
		bottom: 100rpx;
		z-index: 1;
		display: flex;
		background-color: white;
		.radio{
			margin: auto 0;
			font-weight: bold;
			.custom-radio{
				transform: scale(0.5);
			}
		}
		.bottom-midle{
			width: 400rpx;
			display: flex;
			flex-direction: column;
			text-align: right;
			.midle-top{
				text{
					color: orangered;
				}
			}
			.midle-bottom{
				font-size: 25rpx;
				color: #a8a8a8;
			}
		}
		.bottom-right{
			width: 200rpx;
			margin-left: 10rpx;
			button{
				width: 100%;
				height: 100%;
				text-align: center;
				margin: auto auto;
				line-height: 80rpx;
				background-color: orangered;
				color: white;
				border-radius: 40rpx;
			}
		}
	}
}
.custom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  height: 88rpx;
  background-color: #fff;
}

.nav-title {
  font-size: 32rpx;
  font-weight: bold;
  margin: 0 auto;
  text-indent: 40rpx;
}

.edit-btn {
  font-size: 25rpx;
  color: #000;
  font-weight: bold;
}
</style>
