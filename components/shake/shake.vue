<template>
	<view class="shake-music" :class="{active}">
			<view class="item" :class="{shake_bgc:shake_bgc}"></view>
			<view class="item" :class="{shake_bgc:shake_bgc}"></view>
			<view class="item" :class="{shake_bgc:shake_bgc}"></view>
			<view class="item" :class="{shake_bgc:shake_bgc}"></view>
			<view class="item" :class="{shake_bgc:shake_bgc}"></view>
	</view>
</template>
<script setup>
	import { defineProps,computed } from "vue"
	const props = defineProps({
		active: Boolean,
		shake_bgc: Boolean
	})
</script>
<style lang="scss">
	.shake-music{
		width: 40rpx;
		height: 30rpx;
		display: none;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.item{
			width: 4rpx;
			border-radius: 4rpx;
			background-color: #fff;
			animation: play 1.5s ease-in-out infinite;
			&:nth-child(1){
				animation-delay: -1s;
			}
			&:nth-child(2){
				animation-delay: -.6s;
			}
			&:nth-child(3){
				animation-delay: -.4s;
			}
			&:nth-child(4){
				animation-delay: -.6s;
			}
			&:nth-child(5){
				animation-delay: -1s;
			}
		}
		.shake_bgc{
			background-color: #d81e06;
		}
	}
	.active{
		display: flex;
	}
	@keyframes play {
		0%, 100%{
			height: 6rpx;
		}
		50% {
			height: 30rpx;
		}
	}
</style>