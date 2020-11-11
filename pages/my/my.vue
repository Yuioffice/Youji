<template>
	<view class="content">
		<view class="m-top"> 
			<view class="backimage">
				<image :src="backimage" mode="aspectFill"></image>
			</view>
			<view class="status_bar">
				<div class="top"></div>
			</view> 
			<view class="bottom">
				<view class="cu-item">
					<text class="text-white cuIcon-settingsfill l-icon">
					</text>
				</view>
			</view>
			<view class="my-inform" v-for="(item,index) in user" :key="index">
				<image :src="item.image" mode="aspectFill"></image>
				<view class="my-content">
					<text class="myname">{{item.username}}</text>
					<view class="my-qunayi">
						<text class="quanyi">我的权益</text>
						<text class="level">{{item.level}}</text>	
					</view>
				</view>
			</view>
			<view class="edit">
				编辑个人资料>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="cu-list grid col-5 no-border my-function">
			<view class="all">
				<text style="float: left;font-size: 32upx;font-weight: bold;">我的订单</text>
				<text class="check" >查看全部订单></text>
			</view>
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index">
				<image :src="item.cuIcon" mode="aspectFill">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- banner -->
		<view class="m-banner" v-for="item in banner">
			<image :src="item.url" mode="aspectFill"></image>
		</view>
		<!-- 我的功能 -->
		<view class="cu-list grid col-4 no-border my-function2">
			<view class="all">
				<text style="float: left;font-size: 32upx;font-weight: bold;">我的工具</text>
				<text class="check" >更多工具></text>
			</view>
			<view class="cu-item" v-for="(item,index) in cuIconList2" :key="index" @tap="publishTo(index)">
				<image :src="item.cuIcon" mode="aspectFill">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</image>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backimage:"../../static/images/my.jpg",
				user:[{
					image:'../../static/user.png',
					username:'Yui.',
					level:'Lv.7'
				}],
				cuIconList: [{
					cuIcon: '../../static/images/fukuan.png',
					badge: 2,
					name: '待付款'
				}, {
					cuIcon: '../../static/images/chuxing.png',
					badge: 1,
					name: '待出行'
				}, {
					cuIcon: '../../static/images/chuli.png',
					badge: 0,
					name: '处理中'
				}, {
					cuIcon: '../../static/images/pingjia.png',
					badge: 100,
					name: '待评价'
				}, {
					cuIcon: '../../static/images/tuikuan.png',
					badge: 0,
					name: '待退款'
				}
				],
				banner:[
					{
						url:"../../static/images/banner.png"
					}
				],
				cuIconList2: [{
					cuIcon: '../../static/images/shoucang.png',
					badge: 120,
					name: '收藏'
				}, {
					cuIcon: '../../static/images/zuji.png',
					badge: 1,
					name: '足迹'
				}, {
					cuIcon: '../../static/images/fabu.png',
					badge: 0,
					name: '我的发布'
				}, {
					cuIcon: '../../static/images/shangjia.png',
					badge: 0,
					name: '商家'
				}, {
					cuIcon: '../../static/images/kaquan.png',
					badge: 0,
					name: '红包卡券'
				}, {
					cuIcon: '../../static/images/didian.png',
					badge: 0,
					name: '常去地点'
				}, {
					cuIcon: '../../static/images/xinxi.png',
					color: 'mauve',
					badge: 0,
					name: '常用信息'
				}, {
					cuIcon: '../../static/images/dingdan.png',
					badge: 0,
					name: '订单记录'
				}]
			}
		},
		methods: {
			publishTo(index){
				if(index == 2){
					uni.navigateTo({
						url:'../basics/myPublish'
					})
				}
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
	.m-top{
		height: 400upx;
	}
	.status_bar{
		position: fixed;
		top:0;
		width: 750upx;
		flex-direction: column;
	}
	.status_bar .top{
		z-index: 1;
		height: 40upx;
		opacity:0.2;
		background-color:#DDDDDD;
	}
	.cuIcon-settingsfill{
		float: right;
	}
	.bottom{
		position:relative;
		top: 40upx;
		height: 88upx;
		width: 750upx;
		padding:0 30upx;
	}
	.l-icon{
		font-size: 50upx;
	}
	.backimage{
		height: 400upx;
		width: 750upx;
		position: absolute;
	}
	.backimage image{
		width: 100%;
		height: 100%;
	}
	/* 我的资料 */
	.my-inform{
		display: flex;
		position: absolute;
		width: 750upx;
		height: 150upx;
		margin-top: 50upx;
		padding: 0 30upx;
	}
	.my-inform image{
		width: 150upx;
		height: 150upx;
		border-radius: 40px;
	}
	.my-content{
		width: 80%;
		flex-direction: column;
		padding: 0 30upx;
	}
	.my-qunayi{
		display: flex;
		width: 100%;
	}
	.myname{
		font-size: 48upx;
		line-height: 48px;
		color: #ffffff;
		font-weight: bold;
	}
	.quanyi{
		width: 80px;
		background-color: #E7EBED;
		text-align: center;
		border-radius: 10px;
		opacity: 0.8;
	}
	.level{
		margin-left: 12px;
		width: 60px;
		background-color: #E7EBED;
		text-align: center;
		border-radius: 10px;
	}
	.edit{
		position: absolute;
		color: #ffffff;
		margin-top: 105px;
		right: 10px;
	}
	.my-function{
		width: 690upx;
		margin: 0 30upx;
		border-radius: 20px;
		height: 130px;
		position: absolute;
		margin-top: -25px;
	}
	.my-function .all{
		padding: 0 30upx;
		height: 30px;
		position: absolute;
		width: 100%;
		border-bottom: 1px solid #DDDDDD;
	}
	 .check{
		float: right;
		font-size: 28upx;
		color: #868686;
		line-height: 28px;
		bottom: 0;
	}
	.my-function .cu-item{
		height: 90px;
		margin-top: 45px;
	}
	.my-function .cu-item image{
		width:30px;
		height: 30px;
		margin:  0 auto;
	}
	.m-banner{
		width: 690upx;
		height: 160upx;
		border-radius: 35px;
		overflow: hidden;
		margin: 120px auto 0 auto;
	}
	.m-banner image{
		width: 100%;
		height: 100%;
	}
	.my-function2{
		width: 690upx;
		margin: 16px 30upx;
		border-radius: 20px;
		height: 210px;
	}
	.cu-list.grid.no-border{
		padding:10px 0 ;
	}
	.my-function2 .all{
		padding: 0 30upx;
		height: 30px;
		position: absolute;
		width: 690upx;
		border-bottom: 1px solid #DDDDDD;
	}
	.my-function2 .cu-item{
		top: 45px;
		height: 70px;
		line-height: 100px;
	}
	.my-function2 .cu-item image{
		width:30px;
		height: 30px;
		margin:  0 auto;
	}
	.my-function2 .cu-item:nth-child(-n+9):nth-child(n+6){
		margin-top: -15px;
	}
</style>
