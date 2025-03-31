<template>
	<view class="classify-box">
		<scroll-view class="scroll-view_H" scroll-x="true" show-scrollbar="false">
			<view class="scroll-view-item_H">
				<view class="scroll-box">
					<view class="small-classify" v-for="(item,index) in imgbox" :key="index" @tap="xiao(index)">
						<view class="img-box"><image :src="item.img"></image></view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="scroll-view-item_H">
				<view class="scroll-box">
					<view class="small-classify" v-for="(item,index) in imgboxs" :key="index" @tap="xiao(index)">
						<view class="img-box"><image :src="item.img"></image></view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"classifybox",
		data() {
			return {
				imgbox:[
					{img:"../../static/img/lei6.png",id:1,name:"智能穿戴"},
					{img:"../../static/img/lei7.png",id:2,name:"电脑/平板"},
					{img:"../../static/img/lei8.png",id:3,name:"手机"},
					{img:"../../static/img/lei9.png",id:4,name:"电视"},
					{img:"../../static/img/lei10.png",id:5,name:"空冰洗"}
				],
				imgboxs:[
					{img:"../../static/img/lei1.png",id:1,name:"小米上新"},
					{img:"../../static/img/lei2.png",id:2,name:"小米众筹"},
					{img:"../../static/img/lei3.png",id:3,name:"小米发布"},
					{img:"../../static/img/lei4.png",id:4,name:"小米直播"},
					{img:"../../static/img/lei5.png",id:5,name:"新人福利"}
				]
			};
		},
		methods:{
			// 获取下标
			xiao(index){
				console.log('Clicked index:', index);
			}
		}
	}
</script>

<style lang="scss" scoped>
.scroll-box{
	display: flex;
	flex: 1;
}
.classify-box{
	height: 160rpx;
	margin: 0 20rpx;
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			overflow: hidden;
				.scroll-view-item_H {
					display: inline-block;
					width: 100%;
					.small-classify{
						flex-direction: column;
						display: flex;
						flex-wrap: wrap;
						width: 120rpx;
						height: 160rpx;
						flex: 0.25;
						.img-box{
							width: 120rpx;
							height: 120rpx;
							margin: 0 auto;
							image{
								width: 120rpx;
								height: 120rpx;
							}
						}
						text{
							font-size: 26rpx;
							text-align: center;
							font-weight: 600;
						}
					}
				}
		}
}
</style>