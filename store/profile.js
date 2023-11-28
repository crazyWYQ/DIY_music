import {defineStore} from "pinia"
import {ref} from "vue"
import {getMyMenu,isTokenEffective,login,register,fetchUserMessage} from "@/services/request.js"

import io from "@hyoga/uni-socket.io"
let socket = {}


export const useProfileStore = defineStore('profile',() => {
	const myMenuList = ref([])
	const myLikeList = ref([])
	const isLogin = ref(false)
	const user = ref({
		nickname: "",
		userid: ""
	})
	const applyList = ref([])
	const newApply = ref(0)
	
	const receiveList = ref({})
	
	const newMessage = ref({})
	
	const lookuser = ref("")
	
	async function getUserMessage() {
		const res = await fetchUserMessage()
		applyList.value = res.data.result.apply_friend
		receiveList.value = res.data.result.receive
		newApply.value = res.data.result.newApply
		for(let key in receiveList.value){
			newMessage.value[key] = {
				new: receiveList.value[key].newMassage,
				isshow: false
			}
		}
	}
	
	async function Login(data) {
		const res = await login(data)
		const {userid,nickname,token} = res.data.result
		uni.setStorageSync("token",token)
		isLogin.value = true
		// 获取我的歌单列表
		getMyMenuList()
		// 连接socket服务器
		Socket(userid)
		// 获取用户消息
		getUserMessage()
		user.value = {
			userid,
			nickname
		}
		uni.switchTab({
			url: "/pages/profile/profile"
		})
	}
	
	async function Register(data) {
		const res = await register(data)
	}
	
	
	async function checkIsLogin() {
		try{
			const res = await isTokenEffective()
			if(res.statusCode === 200){ // 说明token有效
				const {userid} = res.data.result
				user.value = res.data.result
				isLogin.value = true
				// 连接socket服务器
				Socket(userid)
				// 获取用户消息
				getUserMessage()
			}else{ // 说明token无效，需要重新登录
				isLogin.value = false
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
		}catch(err){
			console.log(err);
		}
	}
	
	function formatSong(item) {
		let song = {
			...item
		}
		delete song.menuid
		delete song.menuname
		if(song.songid)
			return song
		return false
	}
	
	async function getMyMenuList() {
		const res = await getMyMenu()
		const arr = []
		res.data.result.forEach(item => {
			if(!arr.length){
				arr.push({
					menuid: item.menuid,
					menuname: item.menuname,
					list: []
				})
				const song = formatSong(item)
				if(song) arr[arr.length - 1].list.push(song)
			}else{
				let flag = 1
				for(let arritem of arr){
					if(arritem.menuid === item.menuid){
						const song = formatSong(item)
						if(song) arritem.list.push(song)
						flag = 0
						break
					}
				}
				if(flag){
					arr.push({
						menuid: item.menuid,
						menuname: item.menuname,
						list: []
					})
					const song = formatSong(item)
					if(song) arr[arr.length - 1].list.push(song)
				}
			}
		})
		myMenuList.value = arr
	}
	
	function sendFriendApply(data) {
		socket.emit("apply-friend",data)
	}
	function sendMessage(data) {
		socket.emit("user-message",data)
		const {toNickname,to} = data
		addMessage(toNickname,to,data)
	}
	function closeConnect() {
		socket.disconnect()
	}
	function clearNewMessage(data) {
		socket.emit("clearNewMessage",data)
	}
	function Socket(userid) {
		socket = io("wss://192.168.156.158:8091",{
			transports: ['websocket','polling'],
			timeout: 5000,
			query: {
				userid
			}
		})
		socket.on('connect', () => {
		  console.log('ws 已连接');
			socket.on("system-message",(data) => {
				applyList.value.unshift(data)
				newApply.value += 1
			})
			socket.on("user-message",(data) => {
				const {from,fromNickname} = data
				if(lookuser.value !== from)
					newMessage.value[from].new += 1
				addMessage(fromNickname,from,data)
			})
		});
	}
	function addMessage(nickname,userid,data) {
		if(!receiveList.value[userid]){
			receiveList.value[userid] = {
				userid,
				nickname,
				message: []
			}
		}
		if(!newMessage.value[userid]){
			newMessage.value[userid] = {
				new: 0,
				isshow: false
			}
		}
		receiveList.value[userid].message.push(data)
	}
	
	return {
		myLikeList,
		myMenuList,
		isLogin,
		user,
		applyList,
		newApply,
		receiveList,
		newMessage,
		lookuser,
		
		getMyMenuList,
		checkIsLogin,
		Login,
		Register,
		getUserMessage,
		sendFriendApply,
		sendMessage,
		closeConnect,
		clearNewMessage
	}
})