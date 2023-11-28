<template>
	<normal-bar>
		<template #left>
			<view></view>
		</template>
		<template #content>
			<view class="title">DIY音乐</view>
		</template>
	</normal-bar>
	<user-item type="msg" :num="newApply" @click="clearNewApply"/>
	<view class="message-list">
		<template v-for="receive in receiveList" :key="receive.userid">
			<message-item :info="receive"/>
		</template>
	</view>
</template>

<script setup>
	import {storeToRefs} from "pinia"
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	const {isLogin,newApply,receiveList} = storeToRefs(profileStore)
	import {onLoad} from "@dcloudio/uni-app"
	onLoad(() => {
		if(!isLogin) profileStore.checkIsLogin()
	})
	function clearNewApply() {
		newApply.value = 0
		uni.navigateTo({
			url: "/pages/friend-apply/friend-apply"
		})
	}
</script>

<style lang="scss">
	.title{
		font-weight: 600;
		text-align: center;
	}
	.message-list{
		margin-top: 20rpx;
	}
</style>
