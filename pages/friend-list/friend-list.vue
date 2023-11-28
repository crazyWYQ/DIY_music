<template>
	<view>
		<normal-bar>
			<template #content>
				<view class="title">我的好友</view>
			</template>
			<template #right>
				<image src="./image/add-black.png" class="black-add" @click="addFriend"/>
			</template>
		</normal-bar>
		<view class="friend-list">
			<template v-if="userlist.length">
				<user-item  
					v-for="user in userlist" 
					:key="user.userid" 
					:user="user" 
					:data-targetUser="user"
					@click="tapUserItem"
				/>
				<view class="user-sum">{{userlist.length}}个好友</view>
			</template>
			<view v-else class="vacant">好友列表空空如也噢</view>
		</view>
	</view>
</template>

<script setup>
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	
	import {ref,getCurrentInstance} from "vue"
	const _this = getCurrentInstance().appContext.config.globalProperties 
	const userlist = ref([])
	import {getMyFriend} from "@/services/request.js"
	import {onLoad} from "@dcloudio/uni-app"
	const type = ref("")
	let song = {}
	onLoad(async function(options) {
		type.value = options.type
		const res = await getMyFriend()
		userlist.value = res.data.result 
		const eventChannel = _this.getOpenerEventChannel();  
		eventChannel.on("shareSong",data => {
			song = data
		})
	})

	function addFriend() {
		uni.navigateTo({
			url: "/pages/search/search"
		})
	}
	function tapUserItem(event) {
		const user = profileStore.user
		const targetUser = event.currentTarget.dataset.targetUser
		if(type.value === "share"){
			profileStore.sendMessage({
				from: user.userid,
				fromNickname: user.ickname,
				to: targetUser.userid,
				toNickname: targetUser.nickname,
				date: (new Date()).getTime(),
				message: song,
				messageType: "music"
			})
		}else{
			console.log("chat")
		}
	}
</script>

<style lang="scss">
	.friend-list{
		margin-top: 20rpx;
		.user-sum{
			margin-top: 20rpx;
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			color: #999;
		}
	}
	.black-add{
		width: 50rpx;
		height: 50rpx;
	}
	.title{
		text-align: center;
	}
	.vacant{
		margin-top: 50%;
		text-align: center;
		color: #ccc;
	}
</style>
