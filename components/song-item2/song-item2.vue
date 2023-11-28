<template>
	<view class="song-item2">
		<view class="left">
			<shake 
				:active="isPlaying&&itemData.id===songId"
				shake_bgc
				v-if="isPlaying&&itemData.id===songId"
			/>
			<view 
				class="num"
				v-else
			>{{index + 1}}</view>
		</view>
		<view class="content" :class="{song_item2_color:itemData.id===songId}">
			<view class="content-left">
				<view class="top">{{itemData.name}}</view>
				<view class="bottom">
					<text>{{itemData.authorName}}</text>
					<text class="line">-</text>
					<text>{{itemData.name}}</text>
				</view>
			</view>
			<image 
				class="content-right" 
				src="./image/play.png"
				:data-mvid="itemData.mvid"
				 @click.stop="goToMvpage"
				v-if="itemData.mvid"
			/>
		</view>
		<image src="./image/more.png" class="right"/>
	</view>
</template>

<script setup>
	import {storeToRefs} from "pinia"
	import {usePlayerStore} from "@/store/playerStore.js"
	const playStore = usePlayerStore()
	const { isPlaying,songId } = storeToRefs(playStore)
	import {defineProps} from "vue"
	defineProps({
		itemData: Object,
		index: Number
	})
	
	function goToMvpage(event) {
		const mvid = event.currentTarget.dataset.mvid
		uni.navigateTo({
			url: `/pages/mv-detail/mv-detail?mvid=${mvid}`
		})
	}
</script>

<style lang="scss">
	.song-item2{
		padding: 10rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left{
			width: 60rpx;
			font-weight: 500;
			color: #919191;
			position: relative;
		}
		.content{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.content-left{
				font-weight: 500;
				.top{
					font-size: 28rpx;
				}
				.bottom{
					font-size: 22rpx;
					color: #666;
					.line{
						margin: 0 10rpx;
					}
				}
			}
			.content-right{
				width: 40rpx;
				height: 40rpx;
				margin-right: 30rpx;
			}
		}
		.song_item2_color{
			color: #d81e06 !important;
			.content-left{
				font-weight: 600;
				.bottom{
					color: #d81e06 !important;
				}
			}
		}
		.right{
			width: 20px;
			height: 40rpx;
		}
	}
</style>