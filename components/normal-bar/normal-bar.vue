<template>
	<view class="normal-bar-box">
		<!-- 占位 -->
		<placeholder />
		<view class="normal-bar">
			<view class="left">
				<slot name="left">
					<image
						src="./image/arrowleft.png" 
						class="normal-image"
						@click="goBack"
					/>
				</slot>
			</view>
			<view class="content">
				<slot name="content"></slot>
			</view>
			<view class="right">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	defineProps({
		text: String
	})
	
	function goBack() {
		uni.navigateBack()
	}
</script>

<style lang="scss">
	.normal-bar-box{
		.normal-bar{
			height: 40px;
			display: flex;
			align-items: center;
			.left{
				width: 80rpx;
				display: flex;
				align-items: center;
				.normal-image{
					width: 50rpx;
					height: 50rpx;
				}
			}
			.content{
				flex: 1;
			}
			.right{
				width: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>