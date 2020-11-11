<template>
	<view class="content">
		<!-- 顶部导航栏 -->
		<view class="d-top">
			<view class="status_bar">
				<div class="top"></div>
			</view>
			<view class="cu-bar search">
				<view class="search-form"  @tap="selectTo">
					<text class="cuIcon-search text-gray" style="font-size: 44upx;"></text>
					<input>
				</view>
			</view>
			<!-- 导航栏 -->
			<scroll-view scroll-x class=" nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-white text-bold text-xl cur':''" v-for="(item,index) in scrollList"
				 :key="index" @tap="tabSelect" :data-id="index">
					{{item.text}}
				</view>
			</scroll-view>
		</view>
		<!-- 导航内容 -->
		<swiper :indicator-dots="false" :autoplay="false" class="swiper" :current="TabCur" ref="swiper" @change="changeScroll">
			<block v-for="(item,index) in scrollList" :key="index" class="content-out bg-white">
				<swiper-item>
					<scroll-view scroll-y="true" class="swiper-scroll">
						<view class="scroll-content">
							<view class="content-out bg-white" v-for="(s,index) in scrollList[index].contentLists">
								<view class="scroll-box">
									<view class="content-top">
										<image :src="s.src" mode="aspectFill" class="content-img"></image>
									</view>
									<view class="content-bottom">
										<view class="content-title">
											{{s.title}}</view>
										<view class="c-user">
											<image src="../../static/user.png" mode="aspectFill" class="user-img"></image>
											<text class="u-title">{{s.name}}</text>
											<text class="text-orange cuIcon-location u-icon text-sl">
												{{s.address}}
											</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</block>
		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				scrollList: [],
			}
		},
		onLoad(){
			// this.getscrollList( )
			// this.getcontentLists()
			this.getData();
		},
		methods: {
			getData(){
				uni.request({
				    url: 'http://localhost:3000/discover', 
					 method:'get',
					 dataType:'json',
				    success: (res) => {
				        console.log(res.data.data.result);
						this.scrollList = res.data.data.result
				        // this.text = 'request success';
				    }
				});
			},
			// getscrollList(){
			// 	let data =[{
			// 		id: 0,
			// 		text: "推荐",
			// 		contentList: []
			// 	}, {
			// 		id: 1,
			// 		text: "旅行",
			// 		contentList: []
			// 	}, {
			// 		id: 2,
			// 		text: "美食",
			// 		contentList: []
			// 	}, {
			// 		id: 3,
			// 		text: "住宿",
			// 		contentList: []
			// 	}, {
			// 		id: 4,
			// 		text: "景点",
			// 		contentList: []
			// 	}, {
			// 		id: 4,
			// 		text: "网红打卡",
			// 		contentList: []
			// 	}, {
			// 		id: 5,
			// 		text: "国家公园",
			// 		contentList: []
			// 	}]
			// 	this.scrollList =data
			// },
			// getcontentLists() {
			// 	let data = [];
			// 		for (let i = 0; i < 8; i++) {
			// 			let p = {
			// 				title: "[四川 卡萨湖]川藏线上的隐秘仙境 鸳鸯聚集的卡萨湖",
			// 				src: "../../static/discover/discover_2.jpg",
			// 				name: "游记用户",
			// 				address: "四川卡萨湖"
			// 			}
			// 			p.id = i + 1;
			// 			p.likes += i;
			// 			data.push(p)
			// 		}
			// 		for (let j = 0; j < 6; j++) {
			// 		this.scrollList[j].contentList = data
			// 	}
			// },
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			changeScroll: function(e) {
				// 令data中定义的currentTab等于当前swiper的current的值，来改变scroll
				this.TabCur = e.target.current;
			},
			selectTo(){
				uni.navigateTo({
					url:'../basics/select'
				})
			},
		}
	}
</script>

<style>
	.swiper {
		height: 100vh;
	}

	.swiper-scroll {
		height: 100%;
	}

	.content {
		font-family: "苹方";
		color: #333333;
		flex-direction: column;
	}

	.status_bar {
		top: 0;
		width: 750upx;
		flex-direction: column;
	}

	.status_bar .top {
		height: 40upx;
	}

	/* 头部导航栏 */
	.d-top {
		z-index: 1;
		height: 115px;
		width: 750upx;
		background-color: #f68710;
		flex-direction: column;
		position: fixed;
	}

	.cu-bar {
		height: 88upx;
	}

	.cu-bar .search-form {
		border-radius: 30px;
	}

	.nav .cu-item {
		padding: 0 5px;
	}

	/* 导航内容 */
	.u-icon {
		margin: auto 0 auto 20px;
		height: 20px;
		width: 150upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.u-title {
		font-size: 24upx;
		line-height: 24px;
		margin: auto 0 auto 5px;
		height: 20px;
		width: 40px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.user-img {
		width: 25px;
		height: 25px;
		border-radius: 20px;
	}

	.c-user {
		display: flex;
		height: 40px;
		width: 100%;
		bottom: 0;
		padding: 5px;
	}

	.content-title {
		font-size: 20px;
		height: 65%;
		width: 100%;
		padding: 5px;
		-webkit-box-orient: vertical;
		/* text-overflow:  ellipsis; */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.content-bottom {
		width: 100%;
		flex-direction: column;
		height: 100px;
		margin-top: 10upx;
	}

	.content-img {
		height: 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.content-top {
		height: 340upx;
		overflow: hidden;
	}

	.scroll-box {
		flex-direction: column;
		width: 100%;
	}

	.content-out {
		width: 49%;
		height: 280px;
		margin-top: 12upx;
		border-radius: 10px;
		box-shadow: 0px 2px 3px #DDDDDD;
	}

	.scroll-content {
		position: absolute;
		margin-top: 115px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20upx;
		width: 750upx;
	}
</style>
