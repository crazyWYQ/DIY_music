<template>
	<view 
		@touchend="end" 
		class="song-list" 
		v-if="JSON.stringify(songs).length >= 10"
		:style="'background: url('+songs.coverImgUrl+');'"
	>
		<songlist-navbar 
			:statusBarHeight="statusBarHeight" 
			:uniPlatform="uniPlatform"
			:navbar_data="navbardata"
		/>
		<play-all isActive :isHide="isHideAll" :nav_top="statusBarHeight" :count="songs.list.length"/>
		<view class="cover">
			<view :style="{height:statusBarHeight+44+'px'}"></view>
			<view class="page-top">
				<view class="top">
					<image class="top-left" :src="songs.coverImgUrl" />
					<view class="top-right">
						<view class="menuName">{{songs.list[0].listname}}</view>
						<view class="author">
							<image :src="songs.creator.avatarUrl" class="avatar" />
							<view class="name">{{songs.creator.nickname}}</view>
						</view>
					</view>
				</view>
				<view class="content">持续更新，点赞收藏</view>
				<view class="bottom">
					<view class="item">
						<image src="./image/share.png" class="icon" />
						<text class="text">{{songs.shareCount}}</text>
					</view>
					<view class="item">
						<image src="./image/send.png" class="icon" />
						<text class="text">{{songs.commentCount}}</text>
					</view>
					<view class="item">
						<image src="./image/favor.png" class="icon" />
						<text class="text">{{songs.subscribedCount}}</text>
					</view>
				</view>
			</view>
			<view class="list">
				<play-all :isActive="false" :isHede="false" :count="songs.list.length"/>
				<template v-for="(song,index) in songs.list" :key="song.id">
					<view
						:data-index="index"
						@click="songItemClick"
					>
						<song-item2
							:index="index" 
							:itemData="song"
							:song_id="song_id"
						/>
					</view>
				</template>
			</view>
		</view>
		<player-fixed />
	</view>
</template>

<script setup>
	import { storeToRefs } from "pinia"
	//使用全局变量
	import { useGlobalStore } from "@/store/useGlobalStore.js"
	const globalStore = useGlobalStore()
	const { statusBarHeight, uniPlatform } = storeToRefs(globalStore)
	//引入榜单数据
	import { useRankingStore } from "@/store/rankingStore.js" 
	const rankingStore = useRankingStore()
	const { originList,upList,newList,netHotList,menu_detail } = storeToRefs(rankingStore)
	
	// 引入播放数据
	import { usePlayerStore } from "@/store/playerStore.js"
	const playerStore = usePlayerStore()
	const { songList, currentSongIndex } = storeToRefs(playerStore)
	
	//api
	import { fetchRankingList } from "@/services/request.js"
	
	import { ref } from "vue"
	import { onLoad, onPageScroll } from "@dcloudio/uni-app"
	//歌曲列表
	const songs = ref({})
	//导航数据
	const navbardata = ref({
		coverImgUrl: "",
		description: "",
		isCover: false, 
		isBg: false
	})
	const song_id = ref(0)
	//控制滚动
	let scrollTop = ref(0)
	let isScroll = false
	let timer_scroll = -1
	//控制播放全部的状态
	const isHideAll = ref(true)
	
	onLoad(async( options )=>{
		const { type, id } = options
		if(type === "menu"){
			const res = await fetchRankingList(id)
			songs.value = rankingStore.getList(res)
			menu_detail.value = songs.value
		}else if(type === "origin"){
			songs.value = originList.value
		}else if(type === "hot"){
			songs.value = netHotList.value
		}else if(type === "new"){
			songs.value = newList.value
		}else if(type === "up"){
			songs.value = upList.value
		}else if(type === "favor"){
			
		}else if(type === "like"){
			
		}
	})
	
	function songItemClick(event) {
		const {index} = event.currentTarget.dataset
		songList.value = [...songs.value.list]
		currentSongIndex.value = index
		song_id.value = songs.value.list[index].id
		playerStore.playSong(songs.value.list[index].id,index)
	}
	
	onPageScroll(( options )=>{
		scrollTop.value = options.scrollTop
		if(options.scrollTop === 0){
			changeNavBarData("",false,false)
		}else if(options.scrollTop > 0 && options.scrollTop <= 200){
			changeNavBarData("",false,true)
		}else{
			changeNavBarData(songs.value.coverImgUrl,true,true)
		}
		//控制播放全部是否隐藏
		if(options.scrollTop >= statusBarHeight.value+200){
			isHideAll.value = false
		}else isHideAll.value = true
	})
	
	function changeTop( scrollTop ){
		if(scrollTop === 0 || scrollTop === 200){
			return
		}
		if(scrollTop > 50 && scrollTop < 200) {
			uni.pageScrollTo({
				duration: 200,
				scrollTop: 200,
			})
		}
		if(scrollTop <= 50){
			uni.pageScrollTo({
				duration: 200,
				scrollTop: 0,
			})
		}
	}
	
	function end() {
		setTimeout(()=>{
			changeTop(scrollTop.value)
		},100)
	}
	
	function changeNavBarData(coverImgUrl,isBg,isCover) {
		navbardata.value.coverImgUrl = coverImgUrl
		navbardata.value.isBg = isBg
		navbardata.value.isCover = isCover
	}
</script>

<style lang="scss">
	page{
		padding: 0;
	}
	.song-list{
		.cover{
			width: 100%;
			backdrop-filter: blur(20px);
			background-color: rgba(0, 0, 0, .3);
			.page-top{
				height: 400rpx;
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				transition: height 2s;
				font-size: 24rpx;
				color: #fff;
				.top{
					display: flex;
					.top-left{
						width: 200rpx;
						height: 200rpx;
						border-radius: 20rpx;
					}
					.top-right{
						margin-left: 20rpx;
						.menuName{
							margin: 10rpx 0 20rpx;
							font-size: 30rpx;
							font-weight: 600;
						}
						.author{
							display: flex;
							align-items: center;
							font-size: 24rpx;
							.avatar{
								width: 60rpx;
								height: 60rpx;
								border-radius: 60rpx;
							}
							.name{
								margin-left: 4rpx;
							}
						}
					}
				}
				.content{
					margin: 20rpx 0 30rpx;
				}
				.bottom{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.item{
						width: 30%;
						background-color: #d3d3d3;
						padding: 10rpx 0;
						border-radius: 30rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						.icon{
							width: 40rpx;
							height: 40rpx;
						}
						.text{
							margin-left: 10rpx;
							font-weight: 600;
							color: #fff;
						}
					}
					.item:last-child{
						background-color: #d81e06;
					}
				}
			}
			
			.list{
				background-color: #fff;
				border-radius: 30rpx 30rpx 0 0;
			}
			.bgc{
				background-color: red;
			}
		}
	}
</style>
