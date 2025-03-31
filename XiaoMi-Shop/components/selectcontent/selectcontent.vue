<template>
	<view class="selects-box">
		<view class="content-box">
			<view class="select-box" @tap="showselect">
				<view class="select-left">已选</view>
				<view class="select-center">{{name_product}} {{ selectedMemory}} {{selectcolor}}{{totalnum}}</span></view>
				<view class="ico iconfont icon-youjiantou"></view>
			</view>
			<view class="send-box">
				<view class="select-left">送至</view>
				<view class="select-center">长沙市望城区</view>
				<view class="ico iconfont icon-youjiantou"></view>
			</view>
			<view class="dianpu-box">
				<view class="select-left">门店</view>
				<view class="select-center">小米之家湖南长沙望城区普瑞东路润和彩虹mall专卖店</view>
				<view class="ico iconfont icon-youjiantou"></view>
			</view>
			<view class="fuwu-box">
				<view class="select-left">服务</view>
				<view class="select-center">
					<view class="ico iconfont icon-dagou" id="biao">小米自营</view>
					<view class="ico iconfont icon-dagou" id="biao">到店自取</view>
					<view class="ico iconfont icon-dagou" id="biao">门店闪送</view>
					<view class="ico iconfont icon-dagou" id="biao">小米发货</view>
					<view class="ico iconfont icon-dagou" id="biaos">7天无理由退货(到店自取拆封后不支持)</view>
				</view>
				<view class="ico iconfont icon-youjiantou"></view>
			</view>
		</view>
		<!-- 底部弹出框--选择 -->
		<view class="pop" v-show="isxian">
			<!-- 遮罩层 -->
			<!-- <view class="pop-mask"></view> -->
			<view class="pop-content" v-for="(item,index) in goods" :key="index">
				<view class="pop-content-left">
					<image :src="selectimg ? selectimg : '/static/surfaceimg/' + item.img_product"></image>
				</view>
				<view class="pop-content-right">
					<view class="ico iconfont icon-cha" @tap="hideselect"></view>
					<view class="pop-content-price">￥{{ selectprice ? selectprice : item.price_product }}</view>
					<view class="pop-content-detail">
					{{item.name_product}} {{ selectedMemory}} {{selectcolor}}
					</view>
				</view>
			</view>
			<view class="pop-banben">
				<view class="banben-top">
					<view class="banben-top-name">版本</view>
					<view class="banben-top-type">
						<view class="banben-top-neicun" v-for="(neicun,index) in neicuns" :key="index" @tap="dianneicun(neicun,index)"
						:class="{'active': selectedneicunIndex === index}" 
						>{{neicun.p_neicun}}
						</view>
					</view>
				</view>
				<view class="banben-top">
					<view class="banben-top-name">颜色</view>
					<view class="banben-top-type">
						<view class="banben-top-color" v-for="(color,index) in colors" :key="index" @tap="dianjicolor(color,index)"
						:class="{'active': selectedColorIndex === index}" 
						>{{color.p_color}}
						</view>
					</view>
				</view>
				<view class="product-num">
					<view class="product-num-left">购买数量</view>
					<view class="product-num-right">
						<view class="num-box">
							<button :disabled="num <= 1" @tap="decrease">-</button>
							<view class="num">{{num}}</view>
							<button @tap="increase">+</button>
						</view>
					</view>
				</view>
				<view class="shop-button">
					<view class="buttons">
						<button @click="addcar">加入购物车</button>
						<button>立即购买</button>
					</view>
				</view>
			</view>
		</view>
		<view v-if="showModal" class="overlay" @click="closeModal"></view>
	</view>
</template>

<script>
	export default {
		name:"selectcontent",
		data() {
			return {
				isxian:false,
				colors:[],
				neicuns:[],
				selectedMemory: '',
				selectprice:'',
				selectimg:'',
				selectcolor:'',
				selectedColorIndex: null,
				selectedneicunIndex: null,
				name_product:'',
				num:1,
				totalnum:'',
				img:'',
				showModal: false,
			};
		},
		methods:{
			decrease(){
			  if (this.num > 1) {
				this.num--;
			  }
			  this.totalnum='*'+this.num
			},
			increase() {
			  this.num++;	
			  this.totalnum='*'+this.num
			},
			showselect(){
				this.showModal = true;
				 this.disableScroll();
				this.isxian=true
				this.name_product=this.goods[0].name_product
				// 选择商品详细信息--颜色
				uni.request({
					url:"http://localhost:3000/api/selectgoodcolor",
					method:'post',
					data:{
						p_name:this.goods[0].name_product
					},
					success: (res) => {
					  if (res.data.code === 200) {
						this.colors = res.data.data;
					  } else {
						console.log('错误信息:', res.data.msg);
					  }
					},
					fail: (err) => {
					  console.log('请求失败:', err); 
					},
				})
				// 选择商品详细信息--内存
				uni.request({
					url:"http://localhost:3000/api/selectgoodneicun",
					method:'post',
					data:{
						p_name:this.goods[0].name_product
					},
					success: (res) => {
					  if (res.data.code === 200) {
						this.neicuns = res.data.data;
					  } else {
						console.log('错误信息:', res.data.msg);
					  }
					},
					fail: (err) => {
					  console.log('请求失败:', err); 
					},
				})
			},
			hideselect(){
				this.isxian=false;
				this.showModal = false;
				this.enableScroll();
			},
			disableScroll() {
			  document.body.style.overflow = 'hidden';
			},
			// 恢复页面滚动
			enableScroll() {
			  document.body.style.overflow = 'auto';
			},
			dianneicun(neicun,index){
				this.selectedMemory = `${neicun.p_neicun}`; 
				this.selectprice=`${neicun.p_price}`;
				this.selectedneicunIndex=index;
				this.$emit('update-price', this.selectprice);
			},
			dianjicolor(color,index){
				this.selectimg=`/static/productdetail/${color.p_img}`;
				this.img=`${color.p_img}`;
				this.selectcolor=`${color.p_color}`;
				this.selectedColorIndex = index;
				this.$emit('update-img', this.selectimg);
			},
			addcar(){
				this.showModal = false;
				this.enableScroll();
				  if (!this.selectedMemory) {
					  uni.showToast({
					    icon: 'none',
					    title: '请选择内存'
					  });
				    return;
				  }
				  // 检查颜色是否为空
				  if (!this.selectcolor) {
				    uni.showToast({
				      icon: 'none',
				      title: '请选择颜色'
				    });
				    return;
				  }
				  if (!this.goods || !this.goods[0]) {
				    uni.showToast({
				      icon: 'none',
				      title: '商品信息不完整'
				    });
				    return;
				  }
			    const select = {
				  p_id: this.goods[0].proudct_id, 
			      product_name: this.name_product, // 商品名称
			      product_color: this.selectcolor, // 选择的颜色
			      product_nei: this.selectedMemory, // 选择的内存
			      product_img: this.img, // 选择的图片
			      product_price: this.selectprice, // 选择的价格
			      product_num: this.num ,// 购买数量
			    };
				console.log(select);
				const userId = uni.getStorageSync("user_id");
			    uni.request({
			    	url:'http://localhost:3000/api/addshopcar',
					method:'POST',
					data:{
						select:select,
						user_id:userId
					},
					success: (res) => {
					  if (res.data.code === 200) {
						  setTimeout(()=>{
							uni.showToast({
								icon:'success',
								title:'加入购物车成功'
							})
							this.isxian=false
						  },500)
					  } else {
						console.log('错误信息:', res.data.msg);
					  }
					},
					fail: (err) => {
					  uni.showToast({
					  	icon:'fail',
					  	title:'加入购物车失败'
					  })
					},
			    })
			}
		},
		props: {
		    goods: { type: Array, default: () => [] }
		},
	}
</script>

<style lang="scss" scoped>
// 选中的颜色
.banben-top-color.active {
  border: 2rpx solid #e12701; 
  color: #e12701;
}
.banben-top-neicun.active{
	border: 2rpx solid #e12701;
	color: #e12701;
}
.selects-box{
	.content-box{
		background-color: rgba(217, 217, 217, 0.5);
		display: flex;
		flex-direction: column;
		.select-box{
			background-color: white;
			height: 70rpx;
			display: flex;
			.select-left{
				width: 100rpx;
				text-align: center;
				line-height: 70rpx;
				font-weight: 600;
			}
			.select-center{
				line-height: 70rpx;
				width: 550rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				border-bottom: 1px solid #c6c6c6;
			}
			.iconfont{
				width: 100rpx;
				text-align: center;
				font-weight: 600;
				line-height: 70rpx;
				font-size: 50rpx;
				border-bottom: 1px solid #c6c6c6;
			}
		}
		.send-box{
			background-color: white;
			height: 100rpx;
			display: flex;
			.select-left{
				width: 100rpx;
				text-align: center;
				line-height: 70rpx;
				font-weight: 600;
			}
			.select-center{
				line-height: 70rpx;
				width: 550rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				border-bottom: 1px solid #c6c6c6;
			}
			.iconfont{
				width: 100rpx;
				text-align: center;
				font-weight: 600;
				line-height: 90rpx;
				font-size: 50rpx;
				border-bottom: 1px solid #c6c6c6;
			}
		}
		.dianpu-box{
			background-color: white;
			display: flex;
			.select-left{
				width: 100rpx;
				text-align: center;
				line-height: 70rpx;
				font-weight: 600;
			}
			.select-center{
				line-height: 70rpx;
				width: 550rpx;
				text-overflow: ellipsis;
				white-space: wrap;
				border-bottom: 1px solid #c6c6c6;
			}
			.iconfont{
				width: 100rpx;
				text-align: center;
				font-weight: 600;
				line-height: 170rpx;
				font-size: 50rpx;
				border-bottom: 1px solid #c6c6c6;
			}
		}
		.fuwu-box{
			background-color: white;
			display: flex;
			.select-left{
				width: 100rpx;
				text-align: center;
				line-height: 70rpx;
				font-weight: 600;
			}
			.select-center{
				width: 550rpx;
				display: flex;
				flex-wrap: wrap;
				#biao{
					font-size: 20rpx;
					margin-left: 20rpx;
					color: #b1b1b1;
					border: none;
				}
				#biaos{
					width: 500rpx;
					font-size: 20rpx;
					margin-left: 20rpx;
					color: #b1b1b1;
					border: none;
				}
			}
			.iconfont{
				width: 100rpx;
				text-align: center;
				font-weight: 600;
				line-height: 70rpx;
				font-size: 50rpx;
			}
		}
	}
	.pop{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 950rpx;
		z-index: 9999;
		background-color: white;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		display: flex;
		flex-direction: column;
		.pop-content{
			height: 240rpx;
			position: fixed;
			width: 100%;
			display: flex;
			flex: 1;
			.pop-content-left{
				flex: 0.35;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.pop-content-right{
				flex: 0.65;
				display: flex;
				flex-direction: column;
				.iconfont{
					text-align: right;
					margin: 15rpx 20rpx;
				}
				.pop-content-price{
					height: 80rpx;
					color: rgb(251,83,50);
					font-weight: 600;
					font-size: 40rpx;
				}
				.pop-content-detail{
					font-size: 26rpx;
					font-weight: 600;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					width: 480rpx;
				}
			}
		}
		.pop-banben{
			width: 100%;
			margin-top: 240rpx;
			display: flex;
			flex-direction: column;
			.banben-top{
				width: 100%;
				display: flex;
				flex-direction: column;
				.banben-top-name{
					font-weight: 600;
					margin: 20rpx 10rpx;
				}
				.banben-top-type{
					margin: 5rpx 10rpx;
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					.banben-top-neicun{
						width: 220rpx;
						text-align: center;
						border-radius: 20rpx;
						font-size: 24rpx;
						margin: 10rpx 10rpx;
					}
					.banben-top-color{
						width: 120rpx;
						text-align: center;
						border-radius: 20rpx;
						font-size: 24rpx;
						margin: 10rpx 10rpx;
					}
				}
			}
			.product-num{
				height: 60rpx;
				display: flex;
				margin-top: 40rpx;
				.product-num-left{
					width: 50%;
					line-height: 50rpx;
					font-weight: 600;
					margin-left: 10rpx;
				}
				.product-num-right{
					width: 50%;
					display: flex;
					.num-box{
						width: 50%;
						margin: auto auto;
						height: 100%;
						display: flex;
						button{
							  width: 40rpx;
							  height: 100%;
							  font-size: 40rpx;
							  text-align: center;
							  line-height: 50rpx;
							  background-color: #fff;
							  border: 1px solid #ddd;
							  text-indent: -10rpx;
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
			.shop-button{
				margin-top: 180rpx;
				height: 90rpx;
				.buttons{
					width: 90%;
					height: 100%;
					margin: 0 auto;
					display: flex;
					border-radius: 50rpx;
					overflow: hidden;
					button{
						width: 100%;
						color:white;
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
}
.overlay{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
}
</style>