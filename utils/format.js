function formatCount(count,flag = true) {
	if(count > 10000 && count < 100000000){
		count = parseInt( count/10000 )
		return flag ? count + "万" : count + "万人在听"
	}else if(count > 100000000){
		count = parseInt( count/100000000 )
		return flag ? count + "亿" : "超" + count + "亿次播放"
	}
	return count
}

function formatTime( time ) {
	// 毫秒转为秒
	time = parseInt(time / 1000)
	
	let m = parseInt(time / 60)
	if(m < 10) m = "0" + m
	let s = time % 60
	if(s < 10) s = "0" + s
	return m + ":" + s
}
function checkString(str) {
	let length = 0
	for(let s of str){
		length += 1
		if(s.charCodeAt(0)>225) length += 1
	}
	return length
}

function formatMessageTime(time) {
	let date = new Date(time)
	let y = date.getFullYear();  // 获取年份
	let m = date.getMonth() + 1;  // 获取月份（注意月份从0开始，所以需要加1）
	m = m < 10 ? '0' + m : m;  // 将月份补齐成两位数
	let d = date.getDate();  // 获取日期
	d = d < 10 ? '0' + d : d;  // 将日期补齐成两位数
	let h = date.getHours();  // 获取小时
	h = h < 10 ? '0' + h : h;  // 将小时补齐成两位数
	let minute = date.getMinutes();  // 获取分钟
	minute = minute < 10 ? '0' + minute : minute;  // 将分钟补齐成两位数
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute;  // 返回格式化的日期时间
}

export {
	formatCount,
	formatTime,
	checkString,
	formatMessageTime
}