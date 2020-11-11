<template>
	<view class="content">
		<view style="height: 128upx;">
		<view class="i-top">
			<view class="status_bar">
				<div class="top"></div>
			</view> 
			<view class="top-nav">
				<text class="text-black cuIcon-back" @click="backTo()" style="font-size: 44upx;"></text>
				<text class="text-black">{{message.name}}</text>
			</view>
		</view>
		</view>
		<view class="cu-chat">
			<view class="cu-item" v-for="i in message.amount">
				<view class="cu-avatar radius" >
					<image :src="message.img" mode="aspectFill" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="main">
					<view class="content shadow">
						{{message.content}}
					</view>
				</view>
				<view class="date">{{message.day}} {{message.time}}</view>
			</view>
			<view class="cu-item self" v-if="sendInform.length !=0" v-for="(item,index) in sendInform" :key="index">
				<view class="main" >
					<view class="content shadow bg-self" >
						<text>{{item}}</text>
					</view>
				</view>
				<view class="cu-avatar radius">
				</view>
				<view class="date">{{date}}</view>
			</view>
		</view>
		<!-- 输入框 -->
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur" v-model="sendMessage"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-orange shadow" @click="send">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				message:[],
				date:"",
				sendInform:[]
			}
		},
		methods: {
			backTo() {
				uni.navigateBack({
					delta: 1
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			getTime(){
				let date = new Date();
				let month = date.getMonth() < 9 ? "0"+(date.getMonth()+1):date.getMonth()+1
				let day =date.getDate()<= 9 ? "0" + date.getDate() : date.getDate();
				let time = date.getMinutes()<= 9 ? "0" + date.getMinutes() : date.getMinutes();
				this.date = date.getFullYear()+"年"+month+"月"+day+"日"+date.getHours()+":"+time;
			},
			send(){
				this.sendInform.push(this.sendMessage)
				this.sendMessage = ''
			}
		},
		onLoad(option) {
			console.log(option.index)
			let data = JSON.parse(decodeURIComponent(option.index));
			this.message =data
			this.getTime();
		}
	}
</script>

<style>
	.content{
			font-family: "苹方";
			color: #333333;
			flex-direction: column;
		}
		.i-top{
			z-index: 2;
			height: 128upx;
			width: 750upx;
			background-color: #FFFFFF;
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
		.cuIcon-back{
			float: left;
		}
		
page{

  padding-bottom: 100upx;
 
}
.bg-self{
	color: #ffffff;
	background-color: #F0AD4E;
}
</style>
