<template>
	<view 
		class="play-all" 
		:class="{active:isActive,hide:isHide}"
		:style="{'top':nav_top+44+'px'}"
	>
		<view class="left">
			<image src="./image/play.png" class="play-icon"/>
			<text class="all">播放全部<text class="sum">(<text class="num">{{count}}</text>)</text></text>
		</view>
		<image src="./image/check_list.png" class="more-icon" />
	</view>
</template>

<script setup>
	import { defineProps } from "vue"
	defineProps({
		isActive: Boolean,
		isHide: Boolean,
		nav_top: Number,
		count: Number
	})
</script>

<style lang="scss">
	.play-all{
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 30rpx 10rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left{
			display: flex;
			align-items: center;
			.play-icon{
				height: 50rpx;
				width: 50rpx;
			}
			.all{
				margin-left: 20rpx;
				font-size: 28rpx;
				font-weight: 600;
			}
			.sum{
				font-size: 24rpx;
				margin-left: 10rpx;
				.num{
					margin: 0 4rpx;
				}
			}
		}
		.more-icon{
			height: 50rpx;
			width: 50rpx;
		}
	}
	.active{
		position: fixed;
		z-index: 10;
	}
	.hide{
		display: none;
	}
</style>