<template>
	<view class="content">
		<!-- 顶部导航栏 -->
		<view class="i-top">
			<view class="status_bar">
				<div class="top"></div>
			</view> 
			<view class="top-nav">
				<text>消息</text>
				<text class="cuIcon-delete" style="font-size: 44upx;"></text>
				<text class="cuIcon-message" style="font-size: 44upx;"></text>
			</view>
		</view>
		<!-- 系统消息 -->
		<view class="system bg-white">
			<image src="../../static/message/system.png" mode="aspectFill"></image>
			<view class="news">
				<text>系统消息</text>
				<view class="n-content">
					{{news}}
				</view>
			</view>
			<view class="date">
				2020-09-27
			</view>
		</view>
		<view class="message">
			<!-- 有消息 -->
			<view class="show-m " >
				<view class="cu-list menu-avatar bg-white" v-for="(item,index) in messages" :key="index" v-show="item.isShow">
					<view class="cu-item" @click="messageTo(index)">
						<view class="cu-avatar round lg" >
							<image :src="item.img" mode="aspectFill" style="width: 48px;height: 48px;border-radius: 30px;"></image>
						</view>
						<view class="content">
							<view class="text-black">{{item.name}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									<text class="text-red  margin-right-xs"></text>
									{{item.content}}
								</view>
							</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{item.time}}</view>
							<view class="cu-tag round bg-grey sm">{{item.amount}}</view>
						</view>
					</view>
				</view>
				<!-- 没有消息 -->
				<view class="none-m" v-show="messages.length ==0">
					<image src="../../static/message/nomessage.png" mode="aspectFill"></image>
					<view class="more-m">暂无更多消息</view>
					<view class="consult">如果需要帮助，可点击下方按钮进入咨询</view>
					<button>咨询智能管家</button>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				news:"诚邀您成为游记会员！加入会员更多优惠！",
				messages:[
					{
					name:"Yui",
					content:"在吗？看到消息请尽快回复我，有急事！",
					img:"../../static/user.png",
					day:"2020年10月21日",
					time:"22:20",
					amount:3,
					isShow:true
				},{
					name:"HYY",
					content:"在吗？看到消息请尽快回复我，有急事！",
					img:"../../static/user2.jpg",
					day:"2020年10月21日",
					time:"23:20",
					amount:2,
					isShow:true
				},{
					name:"HYY",
					content:"在吗？看到消息请尽快回复我，有急事！",
					img:"../../static/user2.jpg",
					day:"2020年10月21日",
					time:"23:20",
					amount:2,
					isShow:true
				},
				]
			}
		},
		methods: {
			messageTo(index){
				this.index=index
				uni.navigateTo({
					url:'../basics/chat?index='+encodeURIComponent(JSON.stringify(this.messages[index]))
				})
				// console.log(this.index)
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
	.i-top{
		z-index: 2;
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
	.cuIcon-message{
		float: right;
	}
	/* 系统消息 */
	.system{
		position: absolute;
		height: 135upx;
		width: 720upx;
		margin: 143upx 15upx 0 15upx;
		border-radius: 10px;
		display: flex;
	}
	.system image{
		width: 110upx;
		height: 110upx;
		margin: auto 0;
	}
	.system .news{
		width:450upx;
		height:80% ;
		margin: auto 0;
	}
	.news text{
		font-size: 36upx;
		line-height: 32px;
		font-weight: bold;
	}
	.news .n-content{
		font-size: 28upx;
		line-height: 28upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.system .date{
		padding-right: 10upx;
		width:160upx;
		font-size: 20upx;
		text-align: right;
	}
	/* 消息 */
	.message{
		position: absolute;
		margin-top: 290upx;
		width: 750upx;
	}
	.none-m{
		width: 100%;
		text-align: center;
		/* display: none; */
	}
	.none-m image{
		height: 280upx;
		width: 230upx;
		margin-top: 100upx;
	}
	.none-m button{
		color:#ffffff;
		background:linear-gradient(to right top,#f5a249,20%,#f68710);
		position:relative;
		width: 420upx;
		height: 45px;
		line-height: 45px;
		margin-top: 10upx;
	}
	.none-m .more-m{
		font-size: 36upx;
		font-weight: bold;
		line-height: 36px;
		text-align: center;
	}
	.none-m .consult{
		font-size: 30upx;
		line-height: 30px;
		text-align: center;
	}
	.show-m{
		z-index: 1;
		position: absolute;
		width: 750upx;
		margin-top: 10px;
	}
	.show-m .content{
		font-weight: bold;
	}
	.cu-list+.cu-list{
		margin-top: 0;
	}
</style>
