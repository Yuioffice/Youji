<template>
	<view class="contentAll">
		<view style="height: 115px;">
			<view class="d-top">
				<view class="status_bar">
					<div class="top"></div>
				</view>
				<view class="bottom">
					<view class="cu-item">
						<text class="text-black cuIcon-back l-icon" @click="backTo()">
						</text>
						<text class="sousuo" @click="backTo">取消</text>
						<view class="cu-bar">
							<view class="search-form">
								<text class="cuIcon-search" style="font-size: 44upx;"></text>
								<input :placeholder="place" @click="backTo" name="searchValue">
							</view>
						</view>
					</view>
				</view>
				<!-- 导航栏 -->
				<scroll-view scroll-x class=" nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'text-orange text-bold text-xl cur':''" v-for="(item,index) in scrollList"
					 :key="index" @tap="tabSelect" :data-id="index">
						{{item.text}}
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 导航内容 -->
		<swiper :indicator-dots="false" :autoplay="false" class="swiper" :current="TabCur" ref="swiper" @change="changeScroll">
			<block v-for="(item,index) in scrollList" :key="index" class="content-out bg-white">
				<swiper-item>
					<scroll-view scroll-y="true" class="swiper-scroll">
						<view class="scroll-content">
							<view class="cu-card article no-card" v-for="(s,index) in scrollList[index].searchLists">
								<view class="cu-item shadow">
									<view class="title">
										<view class="text-cut">{{s.title}}</view>
									</view>
									<view class="content">
										<image :src="s.src" mode="aspectFill"></image>
										<view class="desc">
											<view class="text-content"> {{s.title}}</view>
											<view>
												<view class="cu-tag bg-red light sm round">{{s.add[0]}}</view>
												<view class="cu-tag bg-green light sm round">{{s.add[1]}}</view>
											</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				scrollList: [],
				searchValue:'',
				place: ''
			}
		},
		onLoad(option) {
			this.getPlace(option)
			this.getscrollList()
			this.getsearchLists()
			console.log(option)
		},
		methods: {
			getsearchLists() {
				uni.request({
					url: 'http://localhost:3000/search/searchlists?searchValue='+this.searchValue,
					method: 'get',
					dataType: 'json',
					success: (res) => {				
							this.scrollList[0].searchLists =res.data.data.zonghe
							this.scrollList[1].searchLists =res.data.data.gonglue
							this.scrollList[2].searchLists =res.data.data.menpiao
							this.scrollList[3].searchLists =res.data.data.zhusu
							this.scrollList[4].searchLists =res.data.data.meishi
							this.scrollList[5].searchLists =res.data.data.wenda
							this.scrollList[6].searchLists =res.data.data.user
						console.log(res.data.data.zonghe)
					}
				});
			},
			getscrollList() {
				let data = [{
					id: 0,
					text: "综合",
					searchLists: [],
				}, {
					id: 1,
					text: "攻略",
					searchLists: [],
				}, {
					id: 2,
					text: "景点门票",
					searchLists: [],
				}, {
					id: 3,
					text: "附近住宿",
					searchLists: [],
				}, {
					id: 5,
					text: "附近美食",
					searchLists: [],
				}, {
					id: 6,
					text: "问答",
					searchLists: [],
				}, {
					id: 7,
					text: "用户",
					searchLists: [],
				}]
				this.scrollList = data
			},
			changeScroll(e) {
				// 令data中定义的currentTab等于当前swiper的current的值，来改变scroll
				this.TabCur = e.target.current;
			},
			getPlace(option) {
				let data = option.searchValue;
				this.searchValue = option.searchValue;
				this.place = data;
			},
			backTo() {
				uni.navigateBack({
					delta: 1
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
		}
	}
</script>

<style>
	.contentAll {
		font-family: "苹方";
		color: #333333;
		flex-direction: column;
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

	.bottom {
		display: flex;
		position: relative;
		top: 40upx;
		height: 88upx;
		width: 750upx;
		padding: 0 30upx;
	}

	.l-icon {
		font-size: 50upx;
		line-height: 44px;
	}

	.bottom .cu-item {
		height: 100%;
		width: 750upx;
	}

	/* 头部导航栏 */
	.d-top {
		z-index: 1;
		height: 115px;
		width: 750upx;
		background-color: #FFFFFF;
		flex-direction: column;
		position: fixed;
	}

	.cu-bar {
		height: 88upx;
	}

	.cu-bar .search-form {
		border-radius: 30px;
	}

	.nav {
		margin-top: 25px;
	}

	.nav .cu-item {
		padding: 0 5px;
	}

	/* 搜索框 */
	.cu-bar {
		top: -48px;
		width: 280px;
		margin: 0 auto;
	}

	.search-form {
		background-color: #CCCCCC;
		color: #ffffff;
		border-radius: 20px;
	}

	.sousuo {
		text-align: center;
		width: 36px;
		font-size: 36upx;
		line-height: 44px;
		float: right;
	}

	.swiper {
		height: 100vh;
	}

	.swiper-scroll {
		height: 100%;
	}
</style>
