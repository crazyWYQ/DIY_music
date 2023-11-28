const jwt = require("jsonwebtoken")

function setToken(info) {
	const signKey = "diymusic"
	return new Promise((resolve,reject) => {
		const token = jwt.sign(info,signKey,{expiresIn: 60 * 60 * 24})
		resolve(token)
	})
}

module.exports.setToken = setToken
