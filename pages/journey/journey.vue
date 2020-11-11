<template>
	<view class="content">
		<!-- 顶部导航栏 -->
		<view class="j-top">
			<view class="status_bar">
				<div class="top"></div>
			</view> 
			<view class="top-nav">
				<text>行程</text>
				<text class="cuIcon-service" style="font-size: 44upx;"></text>
			</view>
		</view>
		<!-- 填加行程 -->
		<view class="j-add">
			<image src="../../static/journey.png" mode=""></image>
			<view class="text">主人，你还没有添加任何行程</view>
			<button>添加行程+</button>
		</view>
		<!-- 精选行程 -->
		<view class="j-select">
			<view class="j-title">
				精选行程
			</view>
			<view class="j-content" v-for="(item,index) in journeyLists" :key="index">
				<view class="j-box">
					<image :src="item.url" mode="aspectFill"></image>
					<view class="j-word">
						{{item.word}}
					</view>
					<view class="j-bottom"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				journeyLists:[]
			}
		},
		onLoad() {
			this.getjourneyLists();
		},
		methods: {
			getjourneyLists(){
				// let data =[]
				// 	for(let i = 0;i<3;i++){
				// 		let p ={
				// 			url:"../../static/journey/qinghai.png",
				// 			word:"双飞9日 青海湖+茶卡盐湖+德令哈+敦煌莫高窟+鸣沙山月牙泉+张掖七彩丹+兰州 销量和好评双优 1车1导 赠机场接送 航班可自选"
				// 		}
				// 		data.push(p)
				// 	}
				// 	this.journeyLists =data;
				uni.request({
				    url: 'http://localhost:3000/journey', 
					 method:'get',
					 dataType:'json',
				    success: (res) => {
						console.log(res.data.data.result)
						// 获取精选行程
						this.journeyLists = res.data.data.result;
						  console.log(this.journeyLists);
						
				    }
				});
			}
		}
	}
</script>

<style>
.content{
		font-family: "苹方";
		color: #333333;
		flex-direction: column;
	}
	/* 头部导航栏 */
	.j-top{
		z-index: 1;
		height: 128upx;
		width: 750upx;
		background-color: #f68710;
		flex-direction: column;
		position: fixed;
	}
	.status_bar{
		top:0;
		width: 750upx;
		flex-direction: column;
	}
	.status_bar .top{
		height: 40upx;
	}
	.top-nav{
		height: 88upx;
		font-size: 36upx;
		line-height: 88upx;
		text-align: center;
		color: #ffffff;
		padding: 0 30upx;
	}
	.cuIcon-service{
		float: right;
	}
	/* 添加行程 */
	.j-add{
		position: absolute;
		height: 400upx;
		width: 720upx;
		margin: 143upx 15upx 0 15upx;
		background-color: #ffffff;
		border-radius: 10px;
	}
	.j-add image{
		width:600upx ;
		height: 150px;
		position:absolute;
		margin: 30px 30px;
	}
	.j-add .text{
		position:relative;
		font-size: 32upx;
		margin: 60px auto 20upx auto;
		width: 210px;
	}
	.j-add button{
		color:#ffffff;
		background:linear-gradient(to right top,#f5a249,20%,#f68710);
		position:relative;
		width: 420upx;
		height: 45px;
		line-height: 45px;
	}
	/* 精选行程 */
	.j-select{
		/* height: 500px; */
		width: 750upx;
		background: #ffffff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		position: absolute;
		margin-top: 563upx;
	}
	.j-title{
		font-size: 36upx;
		font-weight: bold;
		height: 35px;
		line-height: 35px;
		width: 100px;
		text-align: center;
		border-left: 5px solid #f68710;
		margin:30upx 30upx;
	}
	.j-content{
		flex-direction: column;
		width: 750upx;
		height: 150px;
		margin-bottom: 18upx;
	}
	.j-box{
		height: 100%;
		background: #333333;
	}
	.j-box image{
		position: absolute;
		width: 100%;
		height: 150px;
		opacity: 0.7;
	}
	.j-box .j-word{
		position:absolute;
		width: 750upx;
		height: 100upx;
		margin-top: 100px;
		font-size: 36upx;
		line-height: 48upx;
		padding: 0 10upx;
		color: #ffffff;
		-webkit-box-orient:vertical;
		display: -webkit-box;
		-webkit-line-clamp:2;
		overflow: hidden;
		z-index: 1;
	}
	.j-bottom{
		position:absolute;
		width: 750upx;
		height: 100upx;
		margin-top: 100px;
		background: #333333;
		opacity: 0.6;
	}
</style>
