const express = require("express")
const crypto = require("crypto")
const {getConnection,query} = require("../../utils/mysql/index.js")

const route = express.Router()

async function addSong(req,res,table,value) {
	const {id,mvid,name,picUrl,duration,authorId,authorName,playCount} = req.body
	const songid = id + ""
	const connection = await getConnection()
	let sql = "select songid from song where songid = ?;"
	const hasSong = await query(connection,sql,songid)
	if(!hasSong.length){
		sql = "insert into song(songid,mvid,name,picUrl,duration,authorId,authorName,playCount) values(?,?,?,?,?,?,?,?)"
		const data = [songid,mvid,name,picUrl,duration,authorId,authorName,playCount]
		// console.log("data:",data);
		const dbRes = await query(connection,sql,data)
	}
	sql = `insert into ${table} values(?,?);`
	const dbRes = await query(connection,sql,[value,songid])
	connection.release()
	res.status(200).send({
		result: "添加成功"
	})
}

async function getSong(res,table,value) {
	try{
		const connection = await getConnection()
		const sql = `select song.songid,mvid,name,picUrl,duration,authorId,authorName,playCount from ${table} join song on ${table}.songid = song.songid where userid = ?;`
		const queryRes = await query(connection,sql,value)
		connection.release()
		res.send({
			result: queryRes
		})
	}catch(err){
		res.send({
			result: err
		})
	}
}



// 添加喜欢的歌曲
route.post("/music/addLikeSong",async (req,res) => {
	const userid = req.auth.userid
	addSong(req,res,"user_song",userid)
})

// 获取我喜欢的歌曲
route.get("/music/getMyLike",async (req,res) => {
	const userid = req.auth.userid
	getSong(res,'user_song',userid)
})

// 创建歌单
route.post("/music/createMenu",async (req,res) => {
	try{
		const {menuname} = req.body
		const userid = req.auth.userid
		const menuid = crypto.createHash("md5").update("diymusic"+menuname+userid).digest("hex")
		const connection = await getConnection() 
		let sql = "insert into menu values(?,?,?);"
		const insertRes = await query(connection,sql,[menuid,menuname,userid])
		connection.release()
		res.status(200).send({
			result: {
				message: "创建成功",
				menu: {
					menuid,
					menuname,
					list: []
				}
			}
		})
	}catch(err){
		res.status(500).send({
			result: "出错了"
		})
	}
})

// 获取歌单列表
route.get("/music/myMenu",async (req,res) => {
	const userid = req.auth.userid
	try{
		const conection = await getConnection()
		const sql = "SELECT menu.menuid, menuname, song.* FROM menu LEFT JOIN menu_song ON menu.menuid = menu_song.menuid LEFT JOIN song ON menu_song.songid = song.songid WHERE userid = '2530dfed23780d9f66b196ec51438fb7' ORDER BY menu.menuid;"
		const dbRes = await query(conection,sql,userid)
		conection.release()
		res.status(200).send({
			result: dbRes
		})
	}catch(err){
		res.status(500).send({
			result: err
		})
	}
})

//添加歌曲到歌单
route.post("/music/addSongToMenu/:menuid",(req,res) => {
	const menuid = req.params.menuid
	addSong(req,res,"menu_song",menuid)
})

// 获取歌单的歌曲
route.get("/music/menuDetail",async (req,res) => {
	const menuid = req.params.menuid
	getSong(res,'menu_song',menuid)
})

exports.useMusicRoute = route