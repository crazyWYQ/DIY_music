<template>
	<view class="login-box">
		<view class="login-banner box-width">
			<image 
				src="./image/logo.png" 
				class="logo"
			/>
			<view class="title">DIY音乐</view>
		</view>
		<view class="login-content box-width">
			<view class="info">
				<image src="./image/username.png" class="input-image"/>
				<input 
					type="text" 
					class="input"
					focus
					v-model="username"
					placeholder="账号"
				/>
			</view>
			<view class="info">
				<image src="./image/password.png" class="input-image"/>
				<input 
					type="text" 
					class="input"
					:password="isShowPassword"
					v-model="password"
					placeholder="密码"
				/>
				<image 
					src="./image/close.png"
					class="password-eye"
					v-show="isShowPassword"
					@click="showPassword"
				/>
				<image
					src="./image/open.png"
					class="password-eye"
					v-show="!isShowPassword"
					@click="showPassword"
				/>
			</view>
			<template v-if="isRegister">
				<view class="info">
					<image src="./image/confirm.png" class="input-image"/>
					<input 
						type="text" 
						class="input"
						:password="isShowPassword_confirm"
						v-model="check_password"
						placeholder="确认密码"
					/>
					<image
						src="./image/close.png"
						class="password-eye"
						mode="widthFix"
						v-if="isShowPassword_confirm"
						@click="showPassword_comfirm"
					/>
					<image
						src="./image/open.png"
						class="password-eye"
						mode="widthFix"
						v-else
						@click="showPassword_comfirm"
					/>
				</view>
				<view class="info">
					<image src="./image/nickname.png" class="input-image"/>
					<input 
						type="text" 
						class="input"
						placeholder="昵称"
						v-model="nickname"
					/>
				</view>
			</template>
		</view>
		<view 
			class="goto-register" 
			:class="{register_class: isRegister}"
			@click="changePage"
		>{{text}}></view>
		<view class="login-btn box-width" @click="loginOrRegister">{{type}}</view>
	</view>
</template>

<script setup>
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	
	import { ref,computed } from "vue"
	import {login,register} from "@/services/request.js"
	const isShowPassword = ref(true)
	const isShowPassword_confirm = ref(true)
	const type = ref("Login")
	
	const username = ref("")
	const password = ref("")
	const check_password = ref("")
	const nickname = ref("")
	
	const isRegister = computed(() => {
		return type.value === "Register" ? true : false
	})
	const text = computed(() => {
		return type.value === "Register" ? "去登录" : "去注册"
	})
	
	function changePage() {
		isShowPassword.value = true
		isShowPassword_confirm.value = true
		type.value = type.value === "Login" ? "Register" : "Login"
	}
	
	async function loginOrRegister() {
		if(type.value === "Login"){ // 登录
			profileStore.Login({
				username: username.value,
				password: password.value
			})
			// try{
			// 	const res = await login({
			// 		username: username.value,
			// 		password: password.value
			// 	})
			// 	uni.setStorageSync("token",res.data.result.token)
			// 	uni.setStorageSync("userid",res.data.result.userid)
			// 	uni.setStorageSync("nickname",res.data.result.nickname)
			// 	uni.$emit("updateUser",{nickname:res.data.result.nickname})
			// 	uni.switchTab({
			// 		url: "/pages/profile/profile"
			// 	})
			// }catch(err){
			// 	console.log(err)
			// }
		}else{ // 注册
			profileStore.Register({
				username: username.value,
				password: password.value,
				nickname: nickname.value
			})
			type.value = "Login"
			// try{
			// 	const res = await register({
			// 			username: username.value,
			// 			password: password.value,
			// 			nickname: nickname.value
			// 	})
			// 	type.value = "Login"
			// }catch(err){
			// 	console.log(err)
			// }
		}
	}
	
	function showPassword() {
		isShowPassword.value = !isShowPassword.value
	}
	function showPassword_comfirm() {
		isShowPassword_confirm.value = !isShowPassword_confirm.value
	}
</script>

<style lang="scss">
	page{
		padding: 0;
		height: 100%;
	}
	.login-box{
		height: 100%;
		background-color: #2b3d53;
		display: flex;
		flex-direction: column;
		align-items: center;
		.login-banner{
			height: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.logo{
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 20rpx;
			}
			.title{
				font-size: 60rpx;
				font-weight: 600;
				color: #efefef;
			}
		}
		.login-content{
			display: flex;
			flex-direction: column;
			align-items: center;
			.info{
				display: flex;
				box-sizing: border-box;
				padding: 20rpx 0;
				border-top: 1px solid #8e9daf;
				width: 75%;
				.input-image{
					width: 40rpx;
					height: 40rpx;
				}
				.input{
					margin-left: 8rpx;
					font-size: 28rpx;
					color: #8e9daf;
				}
				.password-eye{
					width: 40rpx;
					height: 40rpx;
				}
			}
			.info:last-child{
				border-bottom: 1px solid #8e9daf;
			}
		}
		.goto-register{
			padding: 100rpx 0 40rpx;
			text-align: center;
			font-size: 28rpx;
			color: #009a9a;
		}
		.register_class{
			padding: 40rpx 0 20rpx;
		}
		.login-btn{
			margin-top: 20rpx;
			background-color: #009a9a;
			padding: 20rpx 0;
			text-align: center;
			color: #b5c9df;
		}
		.box-width{
			width: 70%;
		}
	}
</style>
