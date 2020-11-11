<template>
	<view style="font-family: '苹方';color: #333333;flex-direction: column; height: 667px;">
		<view style="height: 128upx;">
			<view class="p-top">
				<view style="height: 40upx;">
					<view class="status_bar">
						<div class="top"></div>
					</view>
				</view>
				<view class="top-nav">
					<text class="text-white cuIcon-back l-icon" @click="myTo()">
					</text>
					<text>我的发布</text>
				</view>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="cu-bar">
			<view class="search-form" style="background-color: #DDDDDD;">
				<text class="cuIcon-search" style="font-size: 44upx;"></text>
				<input confirm-type="search">
			</view>
		</view>
		<view class="my-publish" v-for="(item,index) in publish">
			<view class="my-con">
				{{item.content}}
			</view>
			<view class="myphoto" v-show="publish[index].imgList.length!=0">
				<view v-for="(item,index) in publish[index].imgList" :key="index" class="my-img">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</view>
			<view class="user">
				<image :src="item.userList[index].src" mode="aspectFill"></image>
				<view class="name">
					{{item.userList[index].name}}
				</view>
				<view style="margin-left: 100px;"> 
				<view class="date">
					{{date}}
				</view>
				</view>
			</view>
		</view>
		<view class="cu-bar foot">
			<button class="cu-btn cuIcon bg-orange shadow foot" @click="publishTo">+</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				content: "",
				userList:[],
				date: '',
				publish:[]
			}
		},
		methods: {
			getData(){
				uni.request({
				    url: 'http://localhost:3000/publish', 
					 method:'get',
					 dataType:'json',
				    success: (res) => {
						console.log(res.data.data.result)
						// 获取我的发布
					this.publish = res.data.data.result
				    }
				});
			},
			myTo() {
				uni.switchTab({
					url: '../my/my'
				})
			},
			getTime() {
				let date = new Date();
				let month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
				let day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
				let time = date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();
				this.date = date.getFullYear() + "年" + month + "月" + day + "日" + date.getHours() + ":" + time;
			},
			publishTo(){
				uni.navigateTo({
					url:'../basics/publish'
				})
			}
		},
		onLoad(option) {
			this.getData();
			this.getTime();
			console.log(JSON.parse(decodeURIComponent(option.userList)),JSON.parse(decodeURIComponent(option.textArea)), JSON.parse(decodeURIComponent(option.imgList)))
			this.content = JSON.parse(decodeURIComponent(option.textArea.toString()))
			this.imgList = JSON.parse(decodeURIComponent(option.imgList))
			this.userList = JSON.parse(decodeURIComponent(option.userList))
			
			
		}
	}
</script>

<style>
	.cuIcon-back {
		font-size: 44upx;
	}

	.p-top {
		z-index: 2;
		height: 128upx;
		width: 750upx;
		background-color: #f68710;
		flex-direction: column;
		position: fixed;
	}

	.status_bar {
		position: fixed;
		top: 0;
		width: 750upx;
		flex-direction: column;
	}

	.status_bar .top {
		z-index: 1;
		height: 40upx;
	}

	.top-nav {
		height: 88upx;
		font-size: 36upx;
		line-height: 88upx;
		text-align: center;
		color: #ffffff;
		padding: 0 30upx;
	}

	.cuIcon-back {
		float: left;
		font-size: 44upx;
	}

	.my-publish {
		width: 690upx;
		background-color: #ffffff;
		padding: 10px 30upx;
		margin: 16upx auto 16upx auto;
		border-radius: 10px;
		flex-direction: column;
	}

	.my-con {
		width: 650upx;
		text-indent: 2em;
		margin-bottom: 10px;
		font-size: 30upx;
		overflow: hidden;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		-webkit-line-clamp: 3;
	}

	.myphoto {
		height: 160upx;
		width: 100%;
		display: flex;

	}

	.my-img {
		margin-right: 10px;
		width: 150upx;
		height: 150upx;

	}
	.my-img image {
		width: 100%;
		height: 100%;
	}
	.user{
		display: flex;
		margin-top: 10px;
	}
	.user image{
		margin-right: 10upx;
		width: 60upx;
		height: 60upx;
		border-radius: 30px;
	}
	.user .name{
		font-size: 30upx;
		line-height: 30px;
		text-align: center;
	}
	.user .date{
			font-size: 30upx;
			line-height: 30px;
			text-align: center;
		}
		.cu-bar.foot{
			box-shadow: none;
			
		}
		.cu-bar.foot button{
			margin:  0 auto 30px auto;
			width: 120upx;
			height: 120upx;
			font-size: 36px;
		}
</style>
