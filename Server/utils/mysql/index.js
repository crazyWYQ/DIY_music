const pool = require("./mysql.js")

function getConnection() {
	return new Promise((resolve,reject) => {
		pool.getConnection((err,connection) => {
			if(err) {
				reject(err)
			}else {
				resolve(connection)
			}
		})
	})
}

function query(connection,sql,val) {
	return new Promise((resolve,reject) => {
		connection.query(sql,val,(err,rows) => {
			if(err) {
				reject(err)
			}else{
				resolve(rows)
			}
		})
	})
}





module.exports = {
	getConnection,
	query
}