import { defineStore } from "pinia"
import { ref } from "vue"
import { fetchMusicList } from "@/services/request.js"
export const useMusicStore = defineStore("recommendMusic",() => {
	const uniteMusic = ref([])
	const musicList = ref([])
	
	async function getMusicList(limit) {
		const res = await fetchMusicList(limit)
		const list = []
		for(let item of res.data.result){
			list.push({
				id: item.song.id,
				mvid: item.song.mvid,
				name: item.name,
				listname: "推荐音乐",
				picUrl: item.picUrl,
				duration: item.song.duration,
				authorId: item.song.album.artists[0].id,
				authorName: item.song.album.artists[0].name,
				playCount: 0
			})
		}
		musicList.value = list
		let i = 0, temp = []
		while(i <= 9) {
			temp.push(list.slice(i,i+3))
			i+=3
		}
		uniteMusic.value = temp
	}
	
	return {uniteMusic,musicList,getMusicList}
})