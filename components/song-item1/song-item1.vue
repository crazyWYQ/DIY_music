<template>
		<view class="song-item" :class="{change: active}">
			<view class="image-box">
				<image :src="itemData.picUrl" class="image"/>
				<shake :active="isPlaying && itemData.id === songId"/>
			</view>
			<view class="num" v-if="!active">1</view>
			<view class="info">
				<view class="top">{{itemData.name}}</view>
				<view class="bottom">{{itemData.authorName}}</view>
			</view>
			<image 
				src="./image/play.png" class="icon" 
				:data-mvid="itemData.mvid"
				@click.stop="goToMvPage"
				v-if="active && itemData.mvid !== 0"
			/>
			<view class="icon text" v-else-if="!active">热门</view>
		</view>
</template>

<script setup>
	import {storeToRefs} from "pinia"
	import {usePlayerStore} from "@/store/playerStore.js"
	const playStore = usePlayerStore()
	const { isPlaying,songId } = storeToRefs(playStore)
	import {defineProps} from "vue"
	const props = defineProps({
		active: Boolean,
		itemData: Object
	})
	
	function goToMvPage(event) {
		const {mvid} = event.currentTarget.dataset
		uni.navigateTo({
			url: `/pages/mv-detail/mv-detail?mvid=${mvid}`
		})
	}
</script>

<style lang="scss">
	.song-item{
		display: flex;
		align-items: center;
		.image-box{
			position: relative;
			.image{
				width: 90rpx;
				height: 90rpx;
				border-radius: 8rpx;
			}
		}
		.num{
			padding-left: 20rpx;
			font-size: 28rpx;
			font-weight: 600;
		}
		.info{
			width: 70%;
			padding-left: 20rpx;
			.top{
				font-size: 30rpx;
			}
			.bottom{
				color: #999;
				font-size: 24rpx;
			}
		}
		.icon{
			width: 50rpx;
			height: 50rpx;
		}
		.text{
			font-size: 24rpx;
			color: red;
		}
	}
	.change{
		margin-bottom: 10rpx;
		.image {
			width: 120rpx;
			height: 120rpx;
		}
		.info{
			width: 70%;
			.bottom{
				margin-top: 10rpx;
			}
		}
	}
	.change:last-child{
		margin-bottom: 0;
	}
</style>