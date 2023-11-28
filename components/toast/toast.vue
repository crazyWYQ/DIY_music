<template>
	<view class="toast-position" :class="{active:active}">
		<view class="toast">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	defineProps({
		active: Boolean
	})
	
</script>

<style lang="scss">
	.toast-position{
		position: fixed;
		left: 0;
		top: 70%;
		width: 100%;
		justify-content: center;
		z-index: 1000;
		animation: blockOrnone 4s 1 forwards;
		display: none;
	}
	.active{
		display: flex;
	}
	.toast{
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		background-color: #fff;
		color: #333;
	}
	@keyframes blockOrnone {
		0%{
			opacity: 0;
		}
		25%{
			opacity: 1;
		}
		75%{
			opacity: 1;
		}
		100%{
			opacity: 0;
		}
	}
</style>