<template>
	<view class="search">
		<normal-bar>
			<template #content>
				<input 
					type="text" 
					class="search-input" 
					placeholder="输入要添加好友的账号"
					focus
					@input="onInputValue"
				/>
			</template>
			<template #right>
				搜索
			</template>
		</normal-bar>
		<view class="search-list">
			<template v-if="userlist.length">
				<user-item 
					v-for="user in userlist"
					:key="user.userid"
					:user="user"
					type="add"
					btn_text="添加"
				/>
			</template>
			<view v-if="flag" class="not-fount">该用户没有找到</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue"
	import {findUser} from "@/services/request.js"
	const userlist = ref([])
	const flag = ref(false)
	let timer = -1
	function onInputValue(event) {
		clearTimeout(timer)
		timer = setTimeout(async function() {
			const value = event.detail.value
			if(value === "") return
			const res = await findUser({nickname:event.detail.value})
			const data = res.data.result
			if(data!=="该用户不存在"){
				userlist.value = data
				flag.value = false
			}else{
				flag.value = true
				userlist.value = []
			}
		},500)
	}
</script>

<style lang="scss">
	.search{
		.search-input{
			margin: 0 20rpx;
			padding-left: 20rpx;
			height: 50rpx;
			border-radius: 25rpx;
			border: 1px solid #333;
			font-size: 26rpx;
		}
		.search-list{
			padding-top: 20rpx;
			.not-fount{
				text-align: center;
			}
		}
	}
</style>
