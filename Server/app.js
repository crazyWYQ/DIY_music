const express = require("express")
const app = express()
const fs = require("fs")

const httpsOption = {
	key: fs.readFileSync("./utils/ssl/server.key"),
	cert: fs.readFileSync("./utils/ssl/server.crt"),
}
const https = require("https").Server(httpsOption,app)

const port = 8091

const io = require("socket.io")(https,{cors:true})

const cors = require("cors")
const axios = require("axios")
const {expressjwt:expJwt} = require("express-jwt")
app.use(cors()) // 处理跨域

//解析请求体
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// socket服务器

// 用于储存用户的数据
const data = JSON.parse(fs.readFileSync("./static/data.json"))
const dataMap = new Map(Object.entries(data))
exports.dataMap = dataMap
// 在线用户
const onlineUser = new Map()

// 检查对象是否存在
function check(obj,data,nickname,userid) {
	if(!obj){
		obj = {
			userid,
			nickname,
			message: [],
			newMassage: 0
		}
	}
	obj.message.push(data)
	return obj
}




io.on("connection",(socket) => {
	const userid = socket.handshake.query.userid
	const socketid = socket.id
	console.log("a user connection",userid);
	// 将新连接的用户放入
	onlineUser.set(userid,socketid)
	
	socket.on("apply-friend",(data) => {
		
		const {userid1,userid2,nickname} = data
		// 判断对方是否在线
		if(onlineUser.has(userid2)){
			// 如果在线的话就给他发消息
			console.log(onlineUser.get(userid2));
			let targetSocket = io.sockets.sockets.get(onlineUser.get(userid2))
			targetSocket.emit("system-message",{
				userid: userid1,
				nickname,
				isPass: false
			})
		}else{
			// 未查看的消息加一
			dataMap.get(userid2).newApply += 1
		}
		dataMap.get(userid2).apply_friend.unshift({
			userid: userid1,
			nickname,
			isPass: false
		})
	})
	socket.on("user-message",(data) => {
		console.log(data);
		const {from,to} = data
		// 判断用户是否在线
		if(onlineUser.has(to)){
			// 在线
			// 将信息转发
			let targetSocket = io.sockets.sockets.get(onlineUser.get(to))
			targetSocket.emit("user-message",data)
		}
		// 不管是否在线，将信息存入他们的消息容器中
		const {nickname: fromNickname,receive : fromReceive} = dataMap.get(from)
		const {nickname: toNickname,receive : toReceive} = dataMap.get(to)
		//存入发送方
		fromReceive[to] = check(fromReceive[to],data,toNickname,to)
		// 存入接收方
		toReceive[from] = check(toReceive[from],data,fromNickname,from)
		toReceive[from].newMassage += 1
	})
	socket.on("clearNewMessage",(data) => {
		dataMap.get(data.userid).receive[data.targetid].newMassage = 0
	})
	socket.on("disconnect",(reason) => {
		const userid = socket.handshake.query.userid
		// 断开连接，将其从在线名单删除
		onlineUser.delete(userid)
		console.log("duankai",userid);
	})
})




// 判断token是否有效
app.use(expJwt({
		secret: 'diymusic',//秘钥和生成token的保持一致
		algorithms: ['HS256'] //签名算法（6.0以上版本必须加，否则报错）
}).unless({
		path: ['/user/login','/user/register']//登录和注册接口不验证
}))

// 路由
const { useUserRoute } = require("./router/user/index.js")
app.use( useUserRoute )

const { CLIENT_LONG_FLAG } = require("mysql/lib/protocol/constants/client")
const { useMusicRoute } = require("./router/music/index.js")
app.use( useMusicRoute )

// 按Ctrl+c会触发
process.on('SIGINT', (code) => { 
	//退出前做点操作
	fs.writeFile('./static/data.json',JSON.stringify(Object.fromEntries(dataMap.entries())),()=>{
		console.log("保存完成");
		// 结束进程
		process.exit(0);
	})
});

//   捕获错误的路由需要放在所有路由的后面
app.use((err, req, res, next)=> {
		if(err.name == "UnauthorizedError"){
			res.status(401).send({result: "无效的token..."});
		}else {
			console.log("出错啦",err);
			res.status(500).send({status:'fail'});
		}
});

https.listen(port,()=>{
	console.log("https Start !!!",port);
})