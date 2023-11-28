const express = require("express")

const fs = require("fs")
const path = require("path")

const crypto = require("crypto")

const {getConnection,query} = require("../../utils/mysql/index.js")

const route = express.Router()

const {setToken} = require("../../utils/token/index.js")

const {dataMap} = require("../../app.js")

async function addFriend(req,res,sql,type = false) {
	const userid = req.auth.userid
	const targetUserId = req.body.userid
	const data = [userid,targetUserId]
	if(type) data.reverse()
	const connection = await getConnection()
	const dbRes =await query(connection,sql,data)
	connection.release()
	res.send({
		result: "添加成功"
	})
}



// 校验token是否有效
route.get("/user/tokenEffective",(req,res) => {
	console.log("访问了tokenEffective");
	const {userid,nickname} = req.auth
	res.status(200).send({
		result: {
			userid,
			nickname
		}
	})
})
// 登录
route.post("/user/login",async (req,res)=>{
	const {username,password} = req.body
	const connection = await getConnection()
	const sql = "select userid, password,nickname from user where username = ?;"
	const dbRes = await query(connection,sql,username)
	connection.release()
	if(dbRes.length){
		if(dbRes[0].password === password){
			// 生成token
			const token = await setToken({
				userid:dbRes[0].userid,
				nickname: dbRes[0].nickname
			})
			res.send({
				result: {
					data: "登录成功",
					token,
					nickname: dbRes[0].nickname,
					userid:dbRes[0].userid
				}
			})
		}else {
			res.status(401).send({
				result: "密码错误"
			})
		}
	}else {
		res.status(401).send({
			result: "用户不存在"
		})
	}
})
// 注册
route.post("/user/register",async(req,res) => {
	const {username,password,nickname} = req.body
	const connection = await getConnection()
	let sql = "select count(username) from user where username = ?;"
	const dbRes = await query(connection,sql,username)
	const count = JSON.parse(JSON.stringify(dbRes))[0]['count(username)']
	if(count){
		res.status(401).send({
			result: "账号已经被注册"
		})
	}
	const userid = crypto.createHash("md5").update('diymusic'+username).digest('hex')
	sql = "insert into user values(?,?,?,?)"
	const Res = await query(connection,sql,[userid,username,password,nickname])
	connection.release()
	const userData = {
		userid,
		nickname,
		apply_friend: [],
		newApply: 0,
		receive: {}
	}
	dataMap.set(userid,userData)
	res.status(200).send({
		result: "注册成功"
	})
})
// 获取好友
route.get("/user/getMyFriend",async (req,res) => {
	const userid = req.auth.userid
	const connection = await getConnection()
	const sql = "SELECT user.nickname AS nickname, user.userid AS userid FROM user JOIN friend ON (user.userid = friend.userid2 OR user.userid = friend.userid1) WHERE (friend.userid1 = ? OR friend.userid2 = ?) AND friend.status = 'accepted';"
	const dbRes = await query(connection,sql,[userid,userid])
	res.send({
		result: dbRes
	})
})
// 查找用户
route.get("/user/findUser",async (req,res) => {
	const friendname = req.query.nickname
	const connection = await getConnection()
	const sql = "select userid,nickname from user where nickname like ?;"
	const dbRes =await query(connection,sql,'%'+friendname+'%')
	connection.release()
	if(dbRes.length)
		res.status(200).send({
			result: dbRes
		})
	else {
		res.status(200).send({
			result: "该用户不存在"
		})
	}
})
// 添加好友
route.post("/user/addFriend",async (req,res) => {
	const sql = "insert into friend(userid1,userid2,status) values(?,?,'pending')"
	addFriend(req,res,sql)
})
// 通过好友申请
route.post("/user/passFriend",async (req,res) => {
	const sql = "update friend set status = 'accepted' where userid1 = ? and userid2 = ?;"
	addFriend(req,res,sql,true)
})
// 获取用户信息
route.get("/user/message",(req,res) => {
	const userid = req.auth.userid
	const data = dataMap.get(userid)
	res.status(200).send({
		result: data
	})
	// 获取完之后， 将新申请的消息数清零
	console.log("开始清理");
	dataMap.get(userid).newApply = 0
})

exports.useUserRoute = route