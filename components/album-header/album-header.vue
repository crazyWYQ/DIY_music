<template>
	<view class="album">
		<view class="left" @click="onMenuClick">
			<text class="title">{{title}}</text>
			<uni-icons type="right" size="14" class="icon" v-if="arrow_right"/>
		</view>
		<view class="right">
			<text class="text" v-if="rightText">{{rightText}}</text>
			<uni-icons type="more-filled" size="20" v-else/>
		</view>
	</view>
</template>

<script setup>
	import { defineProps } from "vue"
	const props = defineProps({
		title: String,
		rightText: String,
		arrow_right: {
			type: Boolean,
			default: false
		}
	})
	function onMenuClick() {
		if(props.arrow_right){
			let type = ""
			if(props.title === "原创榜"){
				type = "origin"
			}else if(props.title === "飙升榜"){
				type = "up"
			}else if(props.title === "新歌榜"){
				console.log("新歌榜1")
				type = "new"
			}else {
				type = "hot"
			}
			uni.navigateTo({
				url: `/pages/song-list/song-list?type=${type}`
			})
		}
	}
</script>

<style lang="scss">
	.album{
		box-sizing: border-box;
		padding-bottom: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left{
			.title, .icon{
				font-size: 30rpx;
				font-weight: 600;
				margin-right: 2rpx;
			}
		}
		.right{
			color: #999;
			.text{
				font-size: 22rpx;
			}
		}
	}
	:deep(.uniui-right){
		font-size: 28rpx !important;
		font-weight: 600 !important;
	}
</style>