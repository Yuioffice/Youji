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
					<text class="text-white cuIcon-back l-icon" @click="backTo()">
					</text>
					<text style="float: right;" @click="publish(textArea,imgList,userList)">发布</text>
				</view>
			</view>
		</view>
		<view class="p-content">
			<view class="content-top">
				<image :src="userList.src" mode="aspectFill"></image>
				<view class="name">
					{{userList.name}}
				</view>
			</view>
			<view class="c-publish">
				<view class="cu-form-group" >
					<textarea style="font-size: 32upx;" maxlength="-1" @input="textareaAInput" placeholder="分享旅行中的点滴......" v-model="textArea"></textarea>
				</view>
			</view>
			<view class="cu-form-group" style="background: none;padding: 10px 0 ;">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd' style="font-size: 30px;color: #ffffff;"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar foot">
			<view class="Icon" v-for="(item,index) in iconLists" :key="index">
				<image :src="item.url" mode="aspectFill"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textArea:'',
				userList:{
					src:'../../static/user.png',
					name:'Yui'
				},
				imgList: [],
				textContent:[],
				modalName: null,
				iconLists:[
					{
						name:"定位",
						url:"../../static/publish/icon_01.png"
					},{
						name:"话题",
						url:"../../static/publish/icon_02.png"
					},{
						name:"照片",
						url:"../../static/publish/icon_03.png"
					},{
						name:"关于",
						url:"../../static/publish/icon_04.png"
					},{
						name:"表情",
						url:"../../static/publish/icon_05.png"
					},{
						name:"添加",
						url:"../../static/publish/icon_06.png"
					},
				]
			}
		},
		methods: {
			backTo() {
				uni.navigateBack({
					delta: 1
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			publish(textArea,imgList,userList){
				this.textContent.push(textArea)
				uni.navigateTo({
					url:'../basics/myPublish?textArea='+encodeURIComponent(JSON.stringify(this.textContent))+'&imgList='+encodeURIComponent(JSON.stringify(this.imgList))
					+'&userList='+encodeURIComponent(JSON.stringify(this.userList))
				})
			}
			
		},
		onLoad(){
			
		}
	}
</script>

<style>
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

	.foot {
		height: 98upx;
		background: #ffffff;
		position: fixed;
		display: flex;
		bottom: 0;
	}
	.Icon{
		height: 98upx;
		width: 750upx;
		flex-direction: column;
		text-align: center;
		/* padding-top: 10upx; */
	}
	.Icon image{
		width: 50upx;
		height: 50upx;
		margin-top: 10upx;
	}
	.Icon view{
		margin-top: -10upx;
	}
	.p-content{
		
		padding: 20px 30upx 0 30upx;
	}
	.content-top{
		display: flex;
		height: 120upx;
		margin-bottom: 10px;
	}
	.content-top image{
		width: 100upx;
		height: 100upx;	
		border-radius: 40px;
	}
	.content-top .name{
		font-size: 36upx;
		line-height: 100upx;
		text-align: center;
		margin-left: 20px;
	}
	.c-publish{
		height: 200px;
		border: 1px solid #DDDDDD;
		background-color: #FFFFFF;
		font-size: 32upx;
		border-radius: 10px;
	}
	.solids{
		background-color: #999999;
		opacity: 0.8;
	}
</style>
