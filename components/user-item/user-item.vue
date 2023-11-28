<template>
	<view class="user">
		<image src="./image/avater.png" class="user-image" />
		<view class="user-name">{{text}}</view>
		<view class="msg-sum">
			<view class="num" v-if="type === 'msg'" :class="{hidden: num === 0}">{{num}}</view>
			<view 
				class="add" 
				:class="{hidden: isHidden}"
				v-else-if="type === 'add'" 
				@click.stop="add" 
			>{{btn_text}}</view>
		</view>
	</view>
</template>

<script setup>
	import {storeToRefs} from "pinia"
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	const {user} = storeToRefs(profileStore)
	
	
	import {defineProps,ref,computed} from "vue"
	const isHidden = ref(false)
	import {addFriend,passFriend} from "@/services/request.js"
	const props = defineProps({
		user: Object,
		type: String,
		btn_text: String,
		num: Number
	})
	const text = computed(() => {
		return props.type === "msg" ? "好友申请" : props.user.nickname
	})
	async function add(event) {
		isHidden.value = true
		const userid2 = props.user.userid
		if(props.btn_text === "添加"){
			const userid1 = user.value.userid
			const nickname = user.value.nickname
			profileStore.sendFriendApply({
				userid1,
				userid2,
				nickname
			})
			const res = await addFriend({
				userid:userid2
			})
		}else{ // 回复
			// 发送通过信息
			const data = {
				from: user.value.userid,
				fromNickname: user.value.nickname,
				to: props.user.userid,
				toNickname: props.user.nickname,
				date: (new Date()).getTime(),
				message: "我已通过你的好友申请",
				messageType: "text"
			}
			profileStore.sendMessage(data)
			const res = await passFriend({
				userid: userid2
			})
		}
	}
	// function goToDetail() {
	// 	if(props.type === "msg"){
	// 		uni.navigateTo({
	// 			url: "/pages/friend-apply/friend-apply"
	// 		})
	// 	}else if(props.type === ""){
	// 		console.log("聊天")
	// 	}
	// }
</script>

<style lang="scss">
	.user{
		margin-bottom: 10rpx;
		padding: 0 10rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		.user-image{
			width: 80rpx;
			height: 80rpx;
			border-radius: 100%;
		}
		.user-name{
			flex: 1;
			margin-left: 20rpx;
			font-size: 28rpx;
			line-height: 100rpx;
		}
		.msg-sum{
			width: 80rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.num{
				width: 35rpx;
				line-height: 35rpx;
				text-align: center;
				border-radius: 100%;
				background-color: #d81e06;
				font-size: 24rpx;
				color: #fff;
			}
			.add{
				width: 50rpx;
				line-height: 40rpx;
				padding: 0 6rpx;
				border-radius: 6rpx;
				font-size: 24rpx;
				color: #333;
				border: 1px #ccc solid;
			}
			.hidden{
				display: none;
			}
		}
	}
</style>