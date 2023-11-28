<template>
	<view class="list-pop-item" @click="playSong">
		<view 
			class="shake-parent" 
			v-if="itemData.id === songId"
		>
			<shake active shake_bgc/>
		</view>
		<view 
			class="content content-active"
			:class="{content_active:itemData.id === songId}"
		>
			<text class="name">
				{{itemData.name}}
				<text 
					class="dian"
				>
				</text>
				<text 
					class="artiseName"
				>{{itemData.authorName}}</text>
			</text>
		</view>
		<image 
			src="./image/cancel.png" 
			class="image"
			@click.stop="deleteSong"
		/>
	</view>
</template>

<script setup>
	import { storeToRefs } from "pinia"
	import { usePlayerStore } from "@/store/playerStore.js"
	const playerStore = usePlayerStore()
	const {songId,songList} = storeToRefs(playerStore)
	import { defineProps } from "vue"
	const props = defineProps({
		itemData: Object,
		index: Number
	})
	function playSong() {
		playerStore.playSong(props.itemData.id,props.index)
	}
	function deleteSong() {
		songList.value.splice(props.index,1)
	}
</script>

<style lang="scss">
	.list-pop-item{
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		.shake-parent{
			position: relative;
			width: 80rpx;
		}
		.content{
			width: 92%;
			display: flex;
			align-items: center;
			.name{
				color: #333;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				.artiseName{
					font-size: 24rpx;
					color: #bfbfbf;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.dian{
					display: inline-block;
					width: 4rpx;
					height: 4rpx;
					border-radius: 4rpx;
					margin: 0 14rpx;
					margin-bottom: 10rpx;
					background-color: #ccc;
				}
			}
		}
		.content_active{
			.name{
				color: #d81e06;
				.artiseName{
					color: #d81e06;
				}
				.dian{
					background-color: #d81e06;
				}
			}
		}
		.image{
			width: 60rpx;
			height: 60rpx;
		}
	}
</style>