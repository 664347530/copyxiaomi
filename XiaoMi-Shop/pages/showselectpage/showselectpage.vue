<template>
  <view class="showselectpage">
	  <!-- 上部分 -->
    <view class="showselect-head">
      <view class="head-title" :class="{'active': selectedIndex === 0}" @tap="selectTitle(0)">综合</view>
      <view class="head-title" :class="{'active': selectedIndex === 1}" @tap="selectTitle(1)">销量</view>
      <view class="head-title" :class="{'active': selectedIndex === 2}" @tap="selectTitle(2)">
        <view class="head-title-price">
          <text>价格</text>
          <view class="head-title-right">
            <view class="ico iconfont icon-shangjiantou" :class="{'active-arrow': arrowDirection === 'up'}"></view>
            <view class="ico iconfont icon-xiajiantou" :class="{'active-arrow': arrowDirection === 'down'}"></view>
          </view>
        </view>
      </view>
      <view class="head-title" :class="{'active': selectedIndex === 3}" @tap="selectTitle(3)">新品优先</view>
      <view class="head-title" :class="{'active': selectedIndex === 4}" @tap="selectTitle(4)">筛选</view>
    </view>
	<!-- 下部分--内容 -->
	<view class="showselect-body">
		<view v-if="goods.length === 0" class="no-goods">
			暂无该商品!
		</view>
		<view v-else class="content-box" v-for="(item,index) in goods" :key="index" @tap="GoProduct(item.proudct_id)">
			<view class="content-left">
				<image :src="'/static/surfaceimg/' + item.img_product"></image>
			</view>
			<view class="content-right">
				<view class="content-name">{{item.name_product}}</view>
				<view class="content-jieshao">{{item.jie_product}}</view>
				<view class="content-price">￥<text>{{item.price_product}}</text>起</view>
			</view>
		</view>
	</view>
	<view class="tuijian-box">
		<view class="tuijian-title">━━━猜你喜欢━━━</view>
	</view>
	<Shopproduct :ngoods="ngoods"></Shopproduct>
  </view>
</template>

<script>
import Shopproduct from '../../components/shopproduct/shopproduct.vue'
export default {
  data() {
    return {
      selectedIndex: 0,
      arrowDirection: null,
	  searchKeyword: '' ,
	  goods:{},
	  ngoods:[]
    }
  },
  methods: {
    selectTitle(index) {
      // 每次点击时，更新选中的标题
      this.selectedIndex = index;
      if (index === 2) {
        // 当点击价格时，箭头的状态循环切换
        if (this.arrowDirection === 'up') {
          this.arrowDirection = 'down'; // 切换为下箭头
        } else if (this.arrowDirection === 'down') {
          this.arrowDirection = null; // 如果是下箭头，重置为无箭头
        } else {
          this.arrowDirection = 'up'; // 第一次点击时，设置为上箭头
        }
      }
    },
	xianproduct(){
		uni.request({
			url:"http://localhost:3000/api/searchgood",
			method:'POST',
			data:{
				name:this.searchKeyword
			},
			success: (res) => {
			  if (res.data.code === 200) {
				this.goods = res.data.data;
			  } else {
				console.log('错误信息:', res.data.msg);
			  }
			},
			fail: (err) => {
			  console.log('请求失败:', err); 
			},
		})
	},
	GoProduct(proudct_id){
		uni.navigateTo({
			url: `/pages/detailpage/detailpage?product_id=${proudct_id}`
		})
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
	}
  },
  onLoad(options) {
  	this.searchKeyword=options.keyword;
	this.xianproduct()
  },
  onShow() {
  	this.fetchGoods();
  },
  components:{
	  Shopproduct
  }
}
</script>

<style scoped lang="scss">
.showselectpage {
  .showselect-head {
    display: flex;
    flex: 1;
    height: 50rpx;
    .head-title {
      flex: 0.25;
      text-align: center;
      font-weight: 600;
      color: #969696; /* 默认颜色 */
      margin: auto 0;
      
      &.active {
        color: orange; /* 激活状态下字体颜色为橙色 */
      }
      
      .head-title-price {
        display: flex;
        .head-title-right {
          display: flex;
          flex-direction: column;
          margin: auto 0;
          
          .iconfont {
            font-size: 20rpx;
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .showselect-body{
	  margin-top: 5rpx;
	  background-color: #dfdfdf;
	  display: flex;
	  flex-direction: column;
	  .content-box{
		  width: 94%;
		  margin: 16rpx auto;
		  height: 300rpx;
		  display: flex;
		  background-color: white;
		  border-radius: 20rpx;
		  overflow: hidden;
		  .content-left{
			  width: 45%;
			  image{
				  width: 100%;
				  height: 100%;
			  }
		  }
		  .content-right{
			  width: 58%;
			  display: flex;
			  flex-direction: column;
			  .content-name{
				  font-weight: 600;
				  font-size: 40rpx;
				  margin: 0 10rpx;
				  margin-top: 20rpx;
				  margin-bottom: 10rpx;
				  text-overflow: ellipsis;
				  overflow: hidden;
				  white-space: nowrap;
			  }
			  .content-jieshao{
				  height: 130rpx;
				  font-size: 26rpx;
				  text-overflow: ellipsis;
				  overflow: hidden;
				  margin-left: 10rpx;
			  }
			  .content-price{
				  margin: 14rpx 10rpx;
				  text{
					  font-weight: 600;
					  font-size: 40rpx;
				  }
			  }
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
  /* 单独给上箭头和下箭头的激活状态添加样式 */
  .active-arrow {
    color: orange; /* 只有在激活时，箭头变成橙色 */
  }
}
.no-goods{
	height: 400rpx;
	text-align: center;
	line-height: 400rpx;
	font-weight: 600;
	width: 96%;
	border-radius: 30rpx;
	font-size: 48rpx;
	margin: 10rpx auto;
	background-color: white;
}
</style>
