<template>
	<view class="message-item" @click="goToChat">
		<view class="message-item-left">
			<view class="num-box" v-if="num > 0">
				<view class="num" v-if="num < 100">{{num}}</view>
				<view 
					class="num" 
					style="transform: translateY(-25%);"
					v-else
				>...</view>
			</view>
			<slot name="left">
				<image src="./image/avater.png" class="message-item-image"/>
			</slot>
		</view>
		<view class="message-item-content">
			<view class="content-top">
				<view class="name">{{info.nickname}}</view>
				<view class="date">{{time}}</view>
			</view>
			<view class="content-bottom">{{message}}</view>
		</view>
	</view>
</template>

<script setup>
	import {defineProps,computed} from "vue"
	import {formatMessageTime} from "@/utils/format.js"
	import {storeToRefs} from "pinia"
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	const {newMessage,user,lookuser} = storeToRefs(profileStore)
	const props = defineProps({
		info: Object
	})
	const num = computed(() => {
		return newMessage.value[props.info.userid].new
	})
	const message = computed(() => {
		const arr = props.info.message
		const index = arr.length-1
		const messageType = arr[index].messageType
		return messageType === "text" ? arr[index].message : "分享了音乐:"+arr[index].message.name
	})
	const time = computed(() => {
		const arr = props.info.message
		const index = arr.length-1
		let date = formatMessageTime(arr[index].date)
		return date.split(" ")[1]
	})
	function goToChat() {
		const {isshow} = newMessage.value[props.info.userid]
		newMessage.value[props.info.userid].new = 0
		if(!isshow) {
			profileStore.clearNewMessage({
				userid: user.value.userid,
				targetid: props.info.userid
			})
			newMessage.value[props.info.userid].isshow = true
		}
		const userid = props.info.userid
		lookuser.value = userid
		uni.navigateTo({
			url: `/pages/chat/chat?userid`
		})
	}
</script>

<style lang="scss">
	.message-item{
		padding: 8rpx 20rpx 8rpx 10rpx;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		background-color: #fff;
		.message-item-left{
			width: 80rpx;
			position: relative;
			.message-item-image{
				width: 100%;
				height: 80rpx;
			}
			.num-box{
				width: 30rpx;
				height: 30rpx;
				border-radius: 100%;
				background-color: red;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 0;
				z-index: 10;
				.num{
					font-size: 24rpx;
					color: #fff;
				}
			}
		}
		.message-item-content{
			flex: 1;
			margin-left: 20rpx;
			.content-top{
				display: flex;
				justify-content: space-between;
				.name{
					font-size: 28rpx;
				}
				.date{
					font-size: 24rpx;
					color: #bcbcbc;
				}
			}
			.content-bottom{
				margin-top: 6rpx;
				font-size: 24rpx;
				color: #bcbcbc;
			}
		}
	}
</style>