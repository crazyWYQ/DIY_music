import { hy_request,wy_request,local_request } from "@/services/index.js"

export const fetchMenuList = () => hy_request.get({
	url: "/personalized",
	data: {
		limit: 12
	}
})

export const fetchMusicList = (limit) => hy_request.get({
	url: "/personalized/newsong",
	data: {
		limit
	}
})

export const fetchRankingList = ( id ) => hy_request.get({
	url: "/playlist/detail",
	data: {
		id
	}
})

// 获取歌曲详情
export const fetchSongDetail = ( ids ) => hy_request.get({
	url: "/song/detail",
	data: {
		ids
	}
})

// 获取星评
export const fetchStarList = () => wy_request.get({
	url: "/starpick/comments/summary"
})

// 获取歌词
export const fetchlyrics = (id) => hy_request.get({
	url: "/lyric",
	data: {
		id
	}
})

// 获取mv地址
export const fetchMvUrl = (id) => hy_request.get({
	url: "/mv/url",
	data: {
		id
	}
})

// 获取mv数据
export const fetchMvDetail = (mvid) => hy_request.get({
	url: "/mv/detail",
	data: {
		mvid
	}
})


// 登录
export const login = (data) => local_request.post({
	url: "/user/login",
	data
})

// 注册
export const register = (data) => local_request.post({
	url: "/user/register",
	data
})

// 添加喜欢
export const addLikeSong = (data) => local_request.token_post({
	url: "/music/addLikeSong",
	data
})
// 获取喜欢的歌曲
export const getMyLike = () => local_request.token_get({
	url: "/music/getMyLike",
})


// 创建新的歌单
export const createNewMenu = (data) => local_request.token_post({
	url: "/music/createMenu",
	data
})

// 获取我的歌单
export const getMyMenu = () => local_request.token_get({
	url: "/music/myMenu"
})

// 添加歌曲到歌单
export const addSongToMenu = (data,menuid) => local_request.token_post({
	url: `/music/addSongToMenu/${menuid}`,
	data
}) 

// 校验token是否有效
export const isTokenEffective = () => local_request.token_get({
	url: "/user/tokenEffective"
})

// 查找用户
export const findUser = (data) => local_request.token_get({
	url: "/user/findUser",
	data
})

// 获取好友
export const getMyFriend = () => local_request.token_get({
	url: "/user/getMyFriend"
})

// 添加好友
export const addFriend = (data) => local_request.token_post({
	url: "/user/addFriend",
	data
})
// 通过好友
export const passFriend = (data) => local_request.token_post({
	url: "/user/passFriend",
	data
})



// 获取用户数据
export const fetchUserMessage = () => local_request.token_get({
	url: "/user/message"
})