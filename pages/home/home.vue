<template>
	<nav-bar type/>
	<album-header title="推荐歌单"/>
	<slider-show2 :list="menuList"/>
	
	<album-header title="每日推荐"/>
	<slides-show :type="true" :list="uniteMusic"/>
	<toast />
	
	<album-header title="排行榜"/>
	<slides-show :type="false" :list="uniteRanking"/>
	
	<!-- <album-header title="星评馆"/>
	<slider-show3 :list="starList"/> -->
	<player-fixed />
</template>

<script setup>
	// 仓库
	import { storeToRefs } from "pinia"
	import { useGlobalStore } from "@/store/useGlobalStore.js"
	import { useMusicStore } from "@/store/recommonMusic.js"
	import { useRankingStore } from "@/store/rankingStore.js"
	import { useStarStore } from "@/store/starStore.js"
	const globalStore = useGlobalStore()
	const musicStore = useMusicStore()
	const rankingStore = useRankingStore()
	const starStore = useStarStore()
	const { statusBarHeight, uniPlatform } = storeToRefs(globalStore)
	const { uniteMusic } = storeToRefs(musicStore)
	const { uniteRanking } = storeToRefs(rankingStore)
	const { starList } = storeToRefs(starStore)
	
	import { ref } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	import { fetchMenuList, fetchMusicList } from "@/services/request.js"
	const menuList = ref([])
	onLoad(() => {
		uni.getSystemInfo().then(res => {
			globalStore.statusBarHeight = res.statusBarHeight
			globalStore.uniPlatform = res.uniPlatform
			globalStore.windowBottom = res.windowBottom
		})
		// 获取推荐歌单
		getMenu()
		// 获取每日推荐音乐数据
		musicStore.getMusicList(24)
		// 获取排行榜数据
		rankingStore.getRanking()
		// 获取星评
		// starStore.getStarList()
	})
	// 获取歌单数据
	async function getMenu() {
		const res = await fetchMenuList()
		menuList.value = res.data.result
	}
</script>