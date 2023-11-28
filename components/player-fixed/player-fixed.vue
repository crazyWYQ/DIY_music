<template>
	<view 
		class="player-fixed" 
		@click="goToPlayer" 
		v-if="!isFrist"
		:style="'bottom: '+windowBottom+'px;'"
	>
		<view class="image" :style="isRotate">
			<image src="./image/ic_disc.png" class="black-bgc" mode="widthFix"/>
			<image :src="song.picUrl" class="bgc" mode="widthFix"/>
		</view>
		<view class="info">
			<text class="name">{{song.name}}</text>	
			<text class="line"></text>
			<text class="singer">{{song.authorName}}</text>
		</view>
		<view class="btn">
			<view class="rotate-bgc" @click.stop="playOrPause" :style="schedule">
				<view class="rotate-cover">
					<image src="./image/play.png" class="pause" v-if="!isPlaying"/>
					<image src="./image/pause.png" class="play" v-else/>
				</view>
			</view>
			<image src="./image/musiclist.png" class="list" @click.stop="openList"/>
		</view>
	</view>
	<!-- 占位 -->
	<view class="hold-player" v-if="!isFrist"></view>
	<!-- 弹出层 -->
	<list-pop />
</template>

<script setup>
	import {storeToRefs} from "pinia"
	
	import {usePlayerStore} from "@/store/playerStore.js"
	const playerStore = usePlayerStore()
	const {isPlaying,songList,currentSongIndex,isFrist,sliderValue} = storeToRefs(playerStore)
	
	import {computed,onMounted,ref} from "vue"
	
	const windowBottom = ref(50)
	const isShow = ref(false)
	onMounted(()=>{
		const res = uni.getSystemInfoSync()
		windowBottom.value = res.windowBottom
		// 监听弹出层关闭
		uni.$on("closeList",(data) => {
			uni.$emit("openOrCloseList",data)
		})
	})
	// 角度值
	const schedule = computed(() => {
		let value = parseInt(sliderValue.value / 100 * 360)
		return `background-image: conic-gradient(#2c2c2c 0deg,#2c2c2c ${value}deg,#ccc ${value}deg,#ccc 360deg);`
	})
	// 是否旋转
	const isRotate = computed(()=>{
		return isPlaying.value ? "animation-play-state: running;" : "animation-play-state: paused;"
	})
	// 当前播放的歌曲
	const song = computed(()=>{
		return songList.value[currentSongIndex.value]
	})
	// 播放或停止
	function playOrPause() {
		if(isPlaying.value)
			playerStore.songPause()
		else
			playerStore.resumePlay()
	}
	// 去播放页
	function goToPlayer() {
		uni.navigateTo({
			url: "/pages/player/player"
		})
	}
	
	function openList() {
		uni.$emit("openOrCloseList",{isShow:true})
	}
	
	
	
</script>

<style lang="scss">
	.player-fixed{
		width: 100%;
		box-sizing: border-box;
		padding: 4rpx 30rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		position: fixed;
		left: 0;
		z-index: 100;
		.image{
			width: 80rpx;
			height: 80rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			animation: rotate-Image 10s linear infinite; 
			.black-bgc{
				width: 100%;
			}
			.bgc{
				width: 66%;
				border-radius: 100%;
				position: absolute !important;
				left: 17%;
			}
		}
		.info{
			flex: 1;
			display: flex;
			align-items: center;
			.name{
				margin-left: 6rpx;
				font-size: 28rpx;
			}
			.line{
				display: block;
				width: 18rpx;
				height: 4rpx;
				margin: 0 6rpx;
				background-color: #666;
			}
			.singer{
				color: #666;
				font-size: 26rpx;
			}
		}
		.btn{
			width: 150rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.rotate-bgc{
				height: 54rpx;
				width: 54rpx;
				box-sizing: border-box;
				border-radius: 50%;
				padding: 4rpx;
				.rotate-cover{
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background-color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					.play,.pause{
						width: 30rpx;
						height: 30rpx;
					}
					.pause{
						transform: translateX(2rpx);
					}
				}
			}
			.list{
				width: 70rpx;
				height: 70rpx;
			}
		}
	}
	.hold-player{
		height: 80rpx;
	}
	@keyframes rotate-Image {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>