import { defineStore } from "pinia"
import {ref} from "vue"
import { fetchRankingList,fetchSongDetail } from "@/services/request.js"
export const useRankingStore = defineStore("ranking",()=>{
	const ids = [2884035,19723756,3779629,6723173524]
	const originList = ref({})
	const upList = ref({})
	const newList = ref({})
	const netHotList = ref({})
	const uniteRanking = ref([])
	
	//获取歌单详情
	const menu_detail = ref({})
	
	async function getRanking(){
		const list = []
		for(let id of ids){
			const res = await fetchRankingList( id )
			const obj = getList( res )
			if(id === 2884035){
				originList.value = obj
			}else if(id === 19723756){
				upList.value = obj
			}else if(id === 3779629){
				newList.value = obj
			}else{
				netHotList.value = obj
			}
			list.push(obj.list.slice(0,3))
		}
		uniteRanking.value = list
	}
	function getList( res ){
		let temp = res.data.playlist.tracks
		let playlist = res.data.playlist
		let arr = []
		for(let item of temp){
			arr.push({
				id: item.id,
				mvid: item.mv,
				name: item.name,
				picUrl: item.al.picUrl,
				duration: item.dt,
				authorId: item.ar[0].id,
				authorName: item.ar[0].name,
				listname: playlist.name,
				playCount: playlist.playCount,
			})
		}
		return {
			list: arr,
			coverImgUrl: playlist.coverImgUrl,
			description: playlist.description,
			commentThreadId: playlist.commentThreadId,
			playCount: playlist.playCount,
			shareCount: playlist.shareCount,
			subscribedCount: playlist.subscribedCount,
			commentCount: playlist.commentCount,
			creator: {
				nickname: playlist.creator.nickname,
				backgroundUrl: playlist.creator.backgroundUrl,
				signature: playlist.creator.signature,
				avatarUrl: playlist.creator.avatarUrl
			}
		}
	}
	
	return { uniteRanking,originList,upList,newList,netHotList,menu_detail,getRanking,getList}
})