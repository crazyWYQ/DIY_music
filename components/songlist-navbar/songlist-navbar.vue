<template>
	<view class="nav-box" :style="'background: url('+navbar_data.coverImgUrl+');'">
		<view class="cover-bgc" :class="{vague:navbar_data.isBg,Color:navbar_data.isCover}">
			<view :style="{'height':statusBarHeight+'px'}"></view>
			<view class="songlist-navbar" :style="nav_top">
				<image class="icon" src="./image/arrowleft.png" @click="back"/>
				<view class="nav-title">歌单</view>
				<image src="./image/search.png" class="icon" v-if="uniPlatform !== 'mp-weixin'"/>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { computed, defineProps } from "vue"
	const props = defineProps({
		uniPlatform: String,
		statusBarHeight: Number,
		navbar_data: Object
	})
	const nav_top = computed(()=>{
		const top =  props.uniPlatform === "web" ? 0 : props.statusBarHeight + 'px'
		return { top }
	})
	
	function back(){
		uni.navigateBack({
			delta: 1,
		})
	}
</script>

<style lang="scss">
	.nav-box{
		width: 100%;
		position: fixed;
		z-index: 10;
		top: 0;
		.cover-bgc{
			.songlist-navbar{
				height: 44px;
				width: 100%;
				box-sizing: border-box;
				padding: 0 30rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.nav-title{
					flex: 1;
					margin-left: 30rpx;
				}
				.icon{
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		.vague{
			backdrop-filter: blur(20px);
		}
		.Color{
			background-color: rgba(0, 0, 0, .3);
		}
	}
</style>