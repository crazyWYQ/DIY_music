<template>
	<view class="mv-detail">
		<view class="video-box">
			<video 
				:src="mvUrl" 
				autoplay
				class="video"
			/>
		</view>
		<view class="mv-info">
			<view class="name">{{mvInfo.name}}</view>
			<view class="count">{{mvInfo.playCount}}次播放<text class="time">{{mvInfo.publishTime}}</text></view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	import { fetchMvUrl,fetchMvDetail } from "@/services/request.js"
	
	const mvUrl = ref("")
	const mvInfo = ref({
		artistName: "",
		name: "",
		playCount: 0,
		publishTime: "",
		duration: 0,
	})
	
	onLoad((options) => {
		const mv_id = options.mvid
		getMvUrl(mv_id)
		getMvDetail(mv_id)
	})
	
	async function getMvUrl(mv_id) {
		const res = await fetchMvUrl(mv_id)
		mvUrl.value = res.data.data.url
	}
	async function getMvDetail(mv_id) {
		const res = await fetchMvDetail(mv_id)
		const {artistName,name,playCount,publishTime,duration} = res.data.data
		mvInfo.value = {
			artistName,
			name,
			playCount,
			publishTime,
			duration,
		}
	}
</script>

<style lang="scss">
	.mv-detail{
		.video-box{
			height: 450rpx;
			.video{
				width: 100%;
			}
		}
		.mv-info{
			.name{
				font-weight: 600;
				margin: 20rpx 0;
			}
			.count{
				font-size: 24rpx;
				color: #bababa;
				.time{
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
