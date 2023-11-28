import { defineStore } from "pinia"
import { ref } from "vue"
import { fetchlyrics } from "@/services/request.js"

const innerAudioContext = uni.createInnerAudioContext()

export const usePlayerStore = defineStore('player',()=>{
	// 歌曲id
	const songId = ref(0)
	// 歌曲名称
	const songName = ref("")
	// 是否第一次播放
	const isFrist = ref(true)
	// 歌词列表
	const lyricsList = ref([])
	// 播放列表
	const songList = ref([]) 
	// 当前歌曲下标
	const currentSongIndex = ref(0)
	// 播放了多少时间
	const currentTime = ref(0)
	// 是否在播放
	const isPlaying = ref(true)
	// 播放模式
	const playType = ref(0)
	// 滑块值
	const sliderValue = ref(0)
	// 是否在滑动
	const ischanging = ref(false)
	// 指针
	const needleRotate = ref(0)
	
	// 播放歌曲
	function playSong( id, index ) {
		songId.value = id
		innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
		innerAudioContext.autoplay = true
		currentSongIndex.value = index
		if(isFrist){
			isFrist.value = false
			innerAudioContext.onTimeUpdate(()=>{
				if(!ischanging.value){
					currentTime.value = parseInt(innerAudioContext.currentTime * 1000)
					sliderValue.value = parseInt(currentTime.value / songList.value[currentSongIndex.value].duration * 100)
				}
			})
			innerAudioContext.onWaiting(() => {
				innerAudioContext.pause()
			})
			innerAudioContext.onCanplay(()=>{
				innerAudioContext.play()
			})
			innerAudioContext.onPause(() => {
				isPlaying.value = false
			})
			innerAudioContext.onPlay(() => {
				isPlaying.value = true
			})
			innerAudioContext.onEnded(() => {
				let index = currentSongIndex.value
				if(playType.value === 0){
					// 列表播放
					index = getIndex(index+1)
				}else if(playType.value === 1){
					// 随机播放
					do{
						index = parseInt(Math.random() * songList.value.length)
						index = getIndex(index)
					}while(index === currentSongIndex.value)
				}
				playSong(songList.value[index].id,index)
			})
		}
	}
	// 改变播放进度
	function changeSliderValue(value) {
		innerAudioContext.seek(value)
	}
	// 判断下标是否合法
	function getIndex( index ){
		if(index < 0) index = songList.value.length-1
		if(index > songList.value.length-1) index = 0
		return index
	}
	// 继续播放
	function resumePlay() {
		innerAudioContext.play()
	}
	// 暂停
	function songPause() {
		innerAudioContext.pause()
	}
	// 获取歌词
	async function getLyrics( id ){
		if( songName.value !== songList.value[currentSongIndex.value].name ){
			songName.value = songList.value[currentSongIndex.value].name
			const res = await fetchlyrics( id )
			lyricsList.value = analyzeLyc(res.data.lrc.lyric)
		}
	}
	// 解析歌词
	function analyzeLyc( lyricsStr ) {
		const list = []
		lyricsStr.split("\n").forEach( item => {
			let arr = item.split("]")
			if(arr.length < 2 || arr[1].trim() === '')
				return
			let text = arr[1].trim()
			if(text !== ""){
				const Reg = /\[(\d{2}):(\d{2})\.(\d{1,3})\]/
				let result = Reg.exec(item)
				let m = result[1] * 60 * 1000
				let s = result[2] * 1000
				let ms = 0
				if(result[3].length === 3){
					ms = result[3] * 1
				}else if(result[3].length === 2){
					ms = result[3] * 10
				}else if(result[3].length === 1){
					ms = result[3] * 100
				}
				list.push({
					time: m + s + ms,
					text
				})
			}
		})
		return list
	}
	return { 
			lyricsList, 
			getLyrics, 
			playSong, 
			currentTime, 
			currentSongIndex,
			songList,
			isPlaying,
			isFrist,
			resumePlay,
			songPause,
			getIndex,
			playType,
			sliderValue,
			ischanging,
			changeSliderValue,
			needleRotate,
			songId
		}
})