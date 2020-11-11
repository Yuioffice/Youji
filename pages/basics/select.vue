<template>
	<view class="content">
		<view class="status_bar">
			<div class="top"></div>
		</view>
		<view class="bottom">
			<view class="cu-item">
				<text class="text-black cuIcon-back l-icon" @click="backTo()">
				</text>
				<text class="sousuo" @click="search(searchValue)">搜索</text>
				<view class="cu-bar">
					<view class="search-form">
						<text class="cuIcon-search" style="font-size: 44upx;" ></text>
						<input :placeholder="hotSearch.length===0?'请输入你想去的地方吧~':hotSearch" v-model="searchValue">
					</view>
				</view>
			</view>
		</view>
		<!-- 历史搜索 -->
		<view class="lishi" v-show="lishiLists.length !=0">
			<view class="title">
				<text>历史搜索</text>
				<text class="cuIcon-delete" style="font-size: 36upx;" @click="deleteLishi"></text>
			</view>
			<view class="lishi-tag" >
				<view class='cu-tag round' v-for="(item,index) in lishiLists" :key="index">
					{{item}}
				</view>
			</view>
		</view>
		<view class="tuijian">
			<view class="title2">搜索推荐</view>
			<view class="tuijian-tag">
				<view class='cu-tag round' v-for="(item,index) in tuijianLists" :key="index" :class="'line-' + item.name">
					<image :src="item.src" mode="" v-if="item.src!=null"></image>{{item.tagname}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
				hotSearch:"重庆洪崖洞",
				lishiLists:[],
				tuijianLists:[{
					tagname:"我的附近",
					name:"orange",
					src:null
				},{
					tagname:"0元玩周边",
					name:"black",
					src:"../../static/ditu.png"
				},]
			}
		},
		methods: {
			
			getlishiLists(){
				let data= [];
				this.lishiLists = data;
			},
			backTo() {
				uni.navigateBack({
					delta: 1
				})
			},
			deleteLishi(){
				uni.showModal({
					title:"重要提示",
					content:"是否要清除记录",
					cancelText:"取消",
					confirmText:"确定",
					success:(res)=> {
						if(res.confirm){
							uni.removeStorage({
								key:"lishiLists"
							})
							this.lishiLists=[];
						}
						console.log(res)
					}
				})
			},
			search(searchValue){
				console.log(this.lishiLists)
				// this.lishiLists.push(this.searchValue)
				uni.navigateTo({
					url:'../basics/search-list?searchValue='+this.searchValue+""
				})
				this.addSearch();
			},
			// 记录最近搜索词
			addSearch(){
				let idx = this.lishiLists.indexOf(this.searchValue);
				if(idx<0){
					this.lishiLists.unshift(this.searchValue)
				}else{
					this.lishiLists.unshift(this.lishiLists.splice(idx,1)[0])
				}
				uni.setStorage({
					key:"lishiLists",
					data:JSON.stringify(this.lishiLists)
				})
			}
		},
		onLoad(){
			this.getlishiLists();
			uni.getStorage({
				key:"lishiLists",
				success:(res)=>{
					console.log(res)
					this.lishiLists = JSON.parse(res.data)
				}
			})
		}
	}
</script>

<style>
	.content {
		font-family: "苹方";
		color: #333333;
		background-color: #ffffff;
		height: 667px;
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
		background-color: #ffffff;
	}

	.bottom {
		display: flex;
		position: relative;
		top: 40upx;
		height: 88upx;
		width: 750upx;
		padding: 0 30upx;
		background-color: #ffffff;
		border-bottom: 1px solid #DDDDDD;
	}

	.l-icon {
		font-size: 50upx;
		line-height: 44px;
	}

	.bottom .cu-item {
		height: 100%;
		width: 750upx;
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

	.lishi {
		margin-top: 80upx;
		width: 750upx;
		padding: 0 30upx;
	}

	.tuijian {
		width: 750upx;
		padding: 0 30upx;
	}

	.lishi-tag {
		width: 100%;
		padding: 0 30upx;
		margin-top: 10px;
		flex-wrap: wrap;
	}

	.tuijian-tag {
		width: 690px;
		padding: 0 30upx;
		margin-top: 10px;
	}

	.lishi .title {
		font-size: 36upx;
		line-height: 36px;
		width: 100%;
	}

	.lishi .cuIcon-delete {
		float: right;
	}

	.lishi .cu-tag {
		margin:10px 20px 0 0;
		font-size: 28upx;
		line-height: 30px;
		height: 30px;
		padding: 0 16px;
		letter-spacing: 1px;
	}

	.tuijian .cu-tag {
		margin:10px 20px 0 0;
		font-size: 28upx;
		line-height: 30px;
		height: 30px;
		padding: 0 16px;
		letter-spacing: 1px;
	}

	.tuijian .title2 {
		font-size: 36upx;
		line-height: 36px;
		margin-top: 20px;
	}

	.tuijian .cu-tag image {
		width: 50upx;
		height: 50upx;
		border-radius: 20px;
		margin-right: 5px;
	}
</style>
