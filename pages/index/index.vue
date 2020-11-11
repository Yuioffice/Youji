<template>
	<view class="content">
		<view style="height: 360upx;">
			<!-- 轮播 -->
			<swiper class="square-dot" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000">
				<swiper-item v-for="(item,index) in banner" :key="index">
					<view class="swiper-item">
						<image class="swiperimg" mode="aspectFill" :src="item.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="status_bar">
				<div class="top"></div>
			</view>
			<view class="bottom">
				<view class="cu-item">
					<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
						<text class="text-white cuIcon-location l-icon">
							<view class="picker" style="font-size:30upx;font-weight: bold;">
								{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
							</view>
						</text>
					</picker>
					<text class="text-white cuIcon-roundadd l-icon" style="margin-left: 390upx;" @click="publishTo">
					</text>
				</view>
			</view>
		</view>
		<!-- 搜索框 -->
		<view class="cu-bar">
			<view class="search-form" @tap="selectTo">
				<text class="cuIcon-search" style="font-size: 44upx;"></text>
				<input confirm-type="search" placeholder="请输入你想去的地方吧~">
			</view>
		</view>
		<!-- 导航图标 -->
		<view class="icon-father">
			<view v-for="(item,index) in iconLists" :key="index" class="icon-item">
				<image mode="" :src="item.url"></image>
				<view style="text-align: center;">{{item.name}}</view>
			</view>
		</view>
		<!-- 条形导航 -->
		<view class="box-father">
			<view v-for="(item,index) in boxLists" :key="index" class="box-out">
				<view class="reac-box bg-white">
					<view class="box-left">
						<text class="box-title">{{item.title}}</text>
						<view class="box-content">{{item.content}}</view>
					</view>
					<view class="box-right">
						<image :src="item.src" mode="aspectFill" class="box-img bg-blue"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 导航栏 -->
		<view class="all-group">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-orange text-bold text-xl cur':''" v-for="(item,index) in scrollList"
				 :key="index" @tap="tabSelect" :data-id="index">
					{{item.text}}
				</view>
			</scroll-view>
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
												<text class="text-orange cuIcon-like u-icon text-sl">
													{{s.likes}}
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				aheight: '',
				banner: [],
				scrollLeft: 0,
				title: 'Hello',
				scrollList: [],
				iconLists: [],
				boxLists: [],
				multiArray: [
					['重庆市', '四川省', '湖北省', '湖南省'],
					['重庆'],
				],
				multiIndex: [0, 0],
				tabnum: 0,
				count: ""
			}
		},
		onLoad() {
			this.getbanners();
			this.geticonLists();
			this.getData();
		},
		methods: {
			getData(){
				uni.request({
				    url: 'http://localhost:3000/', 
					 method:'get',
					 dataType:'json',
				    success: (res) => {
						console.log(res.data.data.result)
						// 获取导航条
						this.boxLists = res.data.data.result;
						  console.log(this.boxLists);
						  // 获取首页攻略内容
						  console.log(res.data.data.content)
						  this.scrollList = res.data.data.content
				    }
				});
			},
			selectTo(){
				uni.navigateTo({
					url:'../basics/select'
				})
			},
			publishTo(){
				uni.navigateTo({
					url:'../basics/publish'
				})
			},
			// 获取轮播图数据
			getbanners() {
				let data = [{
					url: "../../static/重庆旅游banner.jpg",
					action: ""
				}, {
					url: "../../static/bg-2.jpg",
					action: ""
				}];
				this.banner = data;
			},
			// 获取图标列表
			geticonLists() {
				let data = [{
					url: "../../static/icon/gonglue.png",
					name: "攻略"
				}, {
					url: "../../static/icon/lvyou.png",
					name: "旅游"
				}, {
					url: "../../static/icon/meishi.png",
					name: "美食"
				}, {
					url: "../../static/icon/zhusu.png",
					name: "住宿"
				}, {
					url: "../../static/icon/menpiao.png",
					name: "景点●门票"
				}];
				this.iconLists = data;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
			changeScroll(e) {
				// 令data中定义的currentTab等于当前swiper的current的值，来改变scroll
				this.TabCur = e.target.current;
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						switch (data.multiIndex[0]) {
							case 0:
								data.multiArray[1] = ['重庆'];
								break;
							case 1:
								data.multiArray[1] = ['成都', '乐山', '绵阳', '宜宾', '甘孜藏族自治州', '雅安', '南充', '广安', '眉山', '资阳', '阿坝藏族羌族自治州', '凉山彝族自治州'];
								break;
							case 2:
								data.multiArray[1] = ['武汉', '黄冈', '孝感', '宜昌', '襄阳', '黄石', '咸宁', '十堰', '随州', '荆门'];
								break;
							case 3:
								data.multiArray[1] = ['长沙', '张家界', '衡阳', '湘潭', '怀化', '邵阳', '岳阳', '常德'];
								break;
						}
						data.multiIndex[1] = 0;
						data.multiIndex[2] = 0;
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
		}
	}
</script>

<style>
	.content {
		font-family: "苹方";
		color: #333333;
	}

	.swiper {
		height: 100vh;
	}

	.swiper-scroll {
		height: 100%;
	}

	/* 导航内容 */
	.u-icon {
		margin: auto 0;
		height: 20px;
		width: 150upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: right;
	}

	.u-title {
		font-size: 24upx;
		line-height: 24px;
		margin: auto 0 auto 5px;
		height: 20px;
		width: 55px;
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
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20upx;
	}

	/* 导航栏 */
	.nav .cu-item {
		margin: 0 5upx;
	}

	.nav {
		margin-top: 30upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	.box-img {
		height: 47px;
		width: 47px;
		border-radius: 35px;
	}

	.box-right {
		width: 35%;
		padding: 5px;
	}

	.box-left {
		width: 65%;
	}

	.box-title {
		font-size: 30upx;
		font-weight: bold;
	}

	.box-content {
		font-size: 24upx;
	}

	.box-father {
		display: flex;
		flex-wrap: wrap;
		margin-left: 30upx;
		margin-right: 30upx;
		margin-top: 20px;
	}

	.box-out:nth-child(1),
	.box-out:nth-child(3) {
		margin-right: 14upx;
	}

	.box-out:nth-child(1),
	.box-out:nth-child(2) {
		margin-bottom: 14upx;
	}

	.reac-box {
		display: flex;
		width: 169px;
		height: 70px;
		border-radius: 5px;
		padding: 12upx;
		box-shadow: 0px 2px 3px #DDDDDD;
	}

	.icon-father {
		display: flex;
		justify-content: space-around;
		margin-top: -18px;
	}

	.icon-item {
		text-align: center;
	}

	.icon-item image {
		width: 92.4upx;
		height: 64.8upx;
	}

	.cu-bar {
		height: 60px;
		top: -25px;
	}

	.search-form {
		border-radius: 10upx;
		box-shadow: 0 3px 3px #DDDDDD;
	}

	.search-form input {
		height: 60px;
		line-height: 60px;
		font-size: 20upx;
	}

	.l-icon {
		font-size: 50upx;
	}

	.swiperimg {
		width: 750upx;
		position: absolute;
		opacity: 0.9;
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
		opacity: 0.2;
		background-color: #DDDDDD;
	}

	/* 导航栏图标 */
	.cuIcon-location {
		width: 240upx;
		display: flex;
		line-height: 24px;
		text-align: center;
	}

	.bottom {
		position: relative;
		top: -320upx;
		height: 88upx;
		padding: 0 30upx;
	}

	.bottom .cu-item {
		display: flex;
		height: 30px;
	}

	.square-dot image {
		opacity: 0.7;
	}

	.square-dot {
		height: 360upx;
		background-color: #333333;
	}
</style>
