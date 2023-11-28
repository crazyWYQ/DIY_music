<template>
	<!-- 轮播图 -->
	<swiper class="swiper" next-margin="40rpx" previous-margin="10rpx">
		<template v-for="(item,index) in list" :key="index">
			<swiper-item class="item">
				<view class="content" :class="{changeContent: type}">
					<album-header 
						:title="list[index][0].listname" 
						:rightText="formatCount(list[index][0].playCount,false)" 
						arrow_right
						v-if="!type"
					/>
					<template v-for="(song,index) in item" :key="song.id">
						<view
							:data-index="index"
							:data-song="song"
							@click="songItemClick"
						>
							<song-item1
								:active="type" 
								:itemData="song"
							/>
						</view>
					</template>
				</view>
			</swiper-item>
		</template>
	</swiper>
</template>

<script setup>
	import { storeToRefs } from "pinia"
	import { usePlayerStore } from "@/store/playerStore.js"
	const playerStore = usePlayerStore()
	const { songList, currentSongIndex } = storeToRefs( playerStore )
	
	import { useRankingStore } from "@/store/rankingStore.js"
	const rankingStore = useRankingStore()
	const {originList,upList,newList,netHotList} = storeToRefs(rankingStore)
	
	import {useMusicStore} from "@/store/recommonMusic.js"
	const musicStore = useMusicStore()
	const {musicList} = storeToRefs(musicStore)
	
	import { defineProps,ref } from "vue"
	import { formatCount } from "@/utils/format.js"
	const props = defineProps({
		type: Boolean, // 判断要不要显示album
		list: Array
	})
	function songItemClick(event) {
		let {song,index} = event.currentTarget.dataset
		if(props.type){
			songList.value = musicList.value
			for(let i = 0; i < songList.value.length; ++i){
				if(songList.value[i].id === song.id){
					index = i
					break
				}
			}
		}else{
			if(song.listname === "新歌榜"){
				songList.value = newList.value.list
			}else if(song.listname === "原创榜"){
				songList.value = originList.value.list
			}else if(song.listname === "网络热歌榜"){
				songList.value = netHotList.value.list
			}else if(song.listname === "飙升榜"){
				songList.value = upList.value.list
			}
		}
		currentSongIndex.value = index
		playerStore.playSong(song.id,index)
	}
</script>

<style lang="scss">
	// 轮播图
	.swiper{
		margin-left: -30rpx;
		height: 380rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		.item{
			box-sizing: border-box;
			padding-left: 20rpx;
			.content{
				height: 100%;
				background-color: #fff;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 10rpx 30rpx;
				// 注意
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
			.changeContent{
				padding: 0;
				padding-right: 20rpx;
				background-color: transparent;
			}
		}
	}
</style>