<template>
	<!-- 占位 -->
	<view :style="{'height':statusBarHeight + 'px'}"></view>
	<view class="nav">
		<view class="left">
			<uni-icons type="list" size="24" v-if="type"/>
			<uni-icons type="back" size="24" v-else @click="onBackClick"/>
		</view>
		<view class="content" :class="{contentWidth: uniPlatform === 'web'|| uniPlatform === 'app'}">
			<uni-icons type="search" class="search" size="16"/>
			<input 
				type="text" 
				:placeholder="placeholder" 
				class="input" 
				@click="onInputClick"
			/>
			<uni-icons type="scan" class="scan" size="16"/>
		</view>
		<view class="right"  v-if="uniPlatform === 'web'|| uniPlatform === 'app'">
			<uni-icons
				type="mic" 
				size="24" 
				class="mic"
				v-if="type"
				/>
			<view class="text" v-else>搜索</view>
		</view>
	</view>
</template>

<script setup>
	import { storeToRefs } from "pinia"
	import { useGlobalStore } from "@/store/useGlobalStore.js"
	const store = useGlobalStore()
	const { statusBarHeight, uniPlatform } = storeToRefs(store)
	import { onMounted, ref, reactive, defineProps } from "vue"
	const props = defineProps({
		type: Boolean
	})
	let placeholder = "请输入关键字"
	onMounted(()=>{
		
	})
	
	function onInputClick() {
		if(props.type){
			uni.navigateTo({
				url: "/pages/search-detail/search-detail"
			})
		}
	}
	
	function onBackClick() {
		if(props.type){
			
		}else{
			uni.navigateBack()
		}
	}
</script>

<style lang="scss">
	.nav{
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		.content{
			padding: 20rpx 20rpx;
			margin-left: 30rpx;
			margin-right: 20rpx;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: forestgreen;
			background: linear-gradient(220.55deg, #ffdfd9 0%, #8eabb7 100%);
			.input{
				width: 100%;
				font-size: 14px;
				padding-left: 10rpx;
			}
		}
		.right{
			.text{
				font-size: 32rpx;
				color: #333;
				white-space: nowrap;
			}
		}
	}
	.contentWidth{
		width: 100%;	
	}
	:deep(.uniui-list){
		font-size: 24px !important;
	}
	:deep(.input){
		font-size: 12px !important;
	}
	:deep(.uniui-mic){
		font-size: 24px !important;
	}
</style>