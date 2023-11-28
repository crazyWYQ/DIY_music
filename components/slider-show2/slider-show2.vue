<template>
	<swiper class="slider-show2" display-multiple-items="3" previous-margin="10rpx">
		<swiper-item class="item" v-for="item in list" :key="item.id">
			<view class="menu-item" @click="toSongList(item.id)">
				<image class="image" :src="item.picUrl"/>
				<view class="count">
					<image src="./icon/play.png" class="imageIcon"/>
					<view class="text">{{formatCount(item.playCount)}}</view>
				</view>
				<image src="./icon/play.png" class="big"/>
			</view>
		</swiper-item>
	</swiper>
</template>

<script setup>
	import { defineProps } from "vue"
	import { formatCount } from "@/utils/format.js"
	const props = defineProps({
		list: Array
	})
	function toSongList(id){
		uni.navigateTo({
			url: `/pages/song-list/song-list?type=menu&id=${id}`
		})
	}
</script>

<style lang="scss">
	.slider-show2{
		height: 220rpx;
		margin-left: -30rpx;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		.item{
			.menu-item{
				padding-left: 20rpx;
				width: 100%;
				height: 100%;
				overflow: hidden;
				position: relative;
				.image{
					width: 220rpx;
					border-radius: 20rpx;
					height: 100%;
				}
				.count,.big{
					position: absolute;
					z-index: 10;
				}
				.count{
					top: 10rpx;
					right: 30rpx;
					display: flex;
					align-items: center;
					.imageIcon{
						width: 30rpx;
						height: 30rpx;
					}
					.text{
						font-size: 24rpx;
						font-weight: 600;
						color: #fff;
					}
				}
				.big{
					width: 50rpx;
					height: 50rpx;
					bottom: 10rpx;
					right: 20rpx;
				}
			}
		}
	}
</style>