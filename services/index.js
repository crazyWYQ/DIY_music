class Request{
	constructor( baseUrl ) {
		this.baseUrl = baseUrl
	}
	get( options ){
		const url = options.url
		return uni.request({
			...options,
			url: this.baseUrl + url,
			method: "GET"
		})
	}
	post( options ){
		const url = options.url
		return uni.request({
			...options,
			url: this.baseUrl + url,
			method: "POST"
		})
	}
	token_get( options ) {
		const token = uni.getStorageSync("token")
		const url = options.url
		return uni.request({
			...options,
			url: this.baseUrl + url,
			method: "GET",
			header: {'Authorization':"Bearer "+token}
		})
	}
	token_post( options ) {
		const token = uni.getStorageSync("token")
		const url = options.url
		return uni.request({
			...options,
			url: this.baseUrl + url,
			method: "POST",
			header: {'Authorization':"Bearer "+token}
		})
	}
}

export const hy_request = new Request("http://codercba.com:9002")

export const wy_request = new Request("http://192.168.93.158:3000")

export const local_request = new Request("https:192.168.156.158:8091")