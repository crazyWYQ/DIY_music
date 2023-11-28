import { defineStore } from "pinia"
import { ref } from "vue"
import { fetchStarList } from "@/services/request.js"

export const useStarStore = defineStore('star',() => {
	const starList = ref([])
	async function getStarList() {
		const res = await fetchStarList()
		const temp = res.data.data.blocks[0].creatives
		// console.log(temp)
		let list = []
		for (let item of temp) {
			let i = item.resources[0].resourceExtInfo.songData
			let user = item.resources[0].resourceExtInfo.users[0]
			list.push({
				likedCount: item.resources[0].likedCount,
				songId: i.id,
				songName: i.album.name,
				duration: i.duration,
				picUrl: i.album.picUrl,
				singer: i.artists[0].name,
				singerId: i.artists[0].id,
				title: item.uiElement.mainTitle.titleDesc,
				author: user.nickname
			})
		}
		starList.value = list
	}
	return { starList,getStarList }
})