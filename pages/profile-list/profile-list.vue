<template>
	<view>
		<view class="profile-top">{{title}}</view>
		<view class="profile-list">
			<template v-for="(song,index) in list" :key="song.id">
				<song-item2 :itemData="song" :index="index" :song_id="song_id"/>
			</template>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue"
	const list = ref([])
	const type = ref("")
	const title = ref("列表")
	const song_id = ref(0)
	import {onLoad} from "@dcloudio/uni-app"
	
	import {getMyLike} from "@/services/request.js"
	
	import {storeToRefs} from "pinia"
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	const {myMenuList} = storeToRefs(profileStore)
	
	onLoad(async (options)=>{
		if(options.type === "like"){
			title.value = "我的喜欢"
			const res = await getMyLike()
			list.value = res.data.result
		}else if(options.type === "menu"){
			const index = options.index
			title.value = myMenuList.value[index].menuname
			list.value = myMenuList.value[index].list
		}
	})
</script>

<style lang="scss">

</style>
