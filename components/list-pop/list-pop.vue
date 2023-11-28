<template>
	<view 
		class="list-pop" 
		:class="{list_pop_active:isShow}"
		:style="'bottom: '+bottom+'px'"
		@touchmove.stop="move"
		@touchstart="start"
		@touchend.stop="end"
	>
		<view class="top">
			<view class="button"></view>
			<view class="text">当前播放</view>
		</view>
		<scroll-view 
			class="list"
			scroll-y
		>
			<template v-for="(song,index) in songList" :key="song.id">
				<list-pop-item :itemData="song" :index="index"/>
			</template>
		</scroll-view>
	</view>
</template>

<script setup>
	import { storeToRefs } from "pinia"
	import { usePlayerStore } from "@/store/playerStore.js"
	const playerStore = usePlayerStore()
	const {songList} = storeToRefs(playerStore)
	
	import { ref,onMounted } from "vue"
	const startPoint = ref(0)
	const bottom = ref(0)
	const isShow = ref(false)
	onMounted(()=>{
		uni.$on("openOrCloseList",(data) => {
			isShow.value = data.isShow
		})
	})
	function start(event) {
		startPoint.value = event.changedTouches[0].pageY
	}
	function move(event) {
		let change = event.changedTouches[0].pageY-startPoint.value
		if(change <= 0) change = 0
		bottom.value = -change
	}
	function end(event) {
		const endPoint = event.changedTouches[0].pageY
		if(endPoint - startPoint.value > 0 && bottom.value !== 0){
			isShow.value = false
			uni.$emit("closeList",{isShow:false})
			setTimeout(()=>{
				bottom.value = 0
			},500)
		}
	}
</script>

<style lang="scss">
	.list-pop{
		padding: 0 30rpx;
		position: fixed;
		z-index: 200;
		left: 0;
		bottom: 0;
		height: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		transition: height 500ms;
		.top{
			height: 10%;
			margin-top: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			.button{
				height: 10rpx;
				width: 80rpx;
				background-color: #ccc;
				border-radius: 10rpx;
			}
			.text{
				margin-top: 10rpx;
				font-weight: 600;
			}
		}
		.list{
			height: 90%;
		}
		.list ::-webkit-scrollbar{
			display: none;
		}
	}
	.list_pop_active{
		height: 70%;
		padding-bottom: 50rpx;
	}
	
</style>