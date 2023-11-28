<template>
	<normal-bar>
		<template #content>
			<view class="title">
				好友申请
			</view>
		</template>
	</normal-bar>
	<view class="apply-list">
		<template v-if="applyList.length > 0">
			<user-item 
				v-for="(user,index) in applyList"
				:key="index"
				btn_text="通过"
				type="add"
				:user="user"
			/>
		</template>
	</view>
</template>

<script setup>
	import { ref } from "vue"
	import {storeToRefs} from "pinia"
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	const { applyList } = storeToRefs(profileStore)
</script>

<style lang="scss">
	.title{
		text-align: center;
	}
</style>
