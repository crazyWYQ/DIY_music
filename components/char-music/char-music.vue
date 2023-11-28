<template>
	<view class="music-bg" :style="'background: url('+song.picUrl+') no-repeat fixed center;'" @click="goPlayer">
		<view class="music">
			<view class="image" :style="'background-image: url('+song.picUrl+')'" @click.stop="playOrpause">
				<shake :active="isPlaying && song.id === songId" v-if="isPlaying && song.id === songId"/>
				<image src="../slider-show3/icon/play.png" class="music-control" v-else/>
			</view>
			<view class="song-info">
				<view class="song-name">{{song.name}}</view>
				<view class="singer">{{song.authorName}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	import {storeToRefs} from "pinia"
	import {usePlayerStore} from "@/store/playerStore.js"
	const playerStore = usePlayerStore()
	const {songId,isPlaying,songList} = storeToRefs(playerStore)
	const props = defineProps({
		song: Object
	})
	function goPlayer() {
		if(songId.value !== props.song.id){
			songList.value = [props.song]
			playerStore.playSong(props.song.id,0)
		}
		uni.navigateTo({
			url: "/pages/player/player"
		})
	}
	function playOrpause() {
		if(songId.value === props.song.id){
			if(isPlaying.value) playerStore.songPause()
			else playerStore.resumePlay()
		}else{
			songList.value = [props.song]
			playerStore.playSong(props.song.id,0)
		}
	}
</script>

<style lang="scss">
	.music-bg{
		width: 450rpx;
		border-radius: 10rpx;
		overflow: hidden;
		.music{
			padding: 60rpx 20rpx;
			width: 100%;
			height: 100%;
			backdrop-filter: blur(20px);
			background-color: rgba(0, 0, 0, .3);
			display: flex;
			align-items: center;
			color: #fff;
			.image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				background-size: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				.music-control{
					width: 60rpx;
					height: 60rpx;
				}
			}
			.song-info{
				padding-left: 20rpx;
				.song-name{
					font-size: 28rpx;
				}
				.singer{
					margin-top: 10rpx;
					color: #e7e7e7;
					font-size: 24rpx;
				}
			}
		}
	}
</style>