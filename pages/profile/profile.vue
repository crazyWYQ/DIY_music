<template>
	<view class="profile">
		<view class="profile-info public-class">
			<image 
				src="./image/profile.png" 
				mode="widthFix"
				class="profile-image"
			/>
			<view 
				class="name" 
				@click="logout"
				v-if="isLogin"
			>{{user.nickname}}</view>
			<view 
				class="name" 
				@click="login"
				v-else
			>
				<view class="text">立即登录</view>
				<image 
					src="./image/right.png" 
					class="image-right" 
					mode="widthFix"
				/>
			</view>
		</view>
		
		<view class="func public-class">
			<view class="item" @click="goFriendList">
				<image src="./image/friend.png" class="func-image" mode="widthFix"/>
				<view class="func-text">我的好友</view>
			</view>
			<view class="item" @click="goSongList" data-type="like">
				<image src="./image/like.png" class="func-image" mode="widthFix" />
				<view class="func-text">我的喜欢</view>
			</view>
			<view class="item" @click="goSongList">
				<image src="./image/favor.png" class="func-image" mode="widthFix" />
				<view class="func-text">我的收藏</view>
			</view>
		</view>
		
		<view class="frofile-menu public-class">
			<view class="menu-top">
				<view class="left">创建歌单</view>
				<image src="./image/add.png" class="right" mode="widthFix" @click="createMenu"/>
			</view>
			<template v-for="(menu,index) in myMenuList" :key="menu.menuid">
				<view class="menu-item" @click="goSongList" data-type="menu" :data-index="index">
					<image :src="menu.list[0].picUrl" mode="widthFix" class="menu-item-image" v-if="menu.list.length"/>
					<image src="./image/Music-Doc.png" mode="widthFix" class="menu-item-image" v-else/>
					<view class="menu-item-info">
						<view class="item-name">{{menu.menuname}}</view>
						<view class="item-sum">{{menu.list.length}}首</view>
					</view>
				</view>
			</template>
		</view>
	
	</view>
</template>

<script setup>
	import {storeToRefs} from "pinia"
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	const {myMenuList,isLogin,user} = storeToRefs(profileStore)
	

	import {createNewMenu,isTokenEffective} from "@/services/request.js"
	import { ref } from "vue"
	import {onLoad} from "@dcloudio/uni-app"
	onLoad(()=>{
		// 检查是否登录
		if(!isLogin.value){
			console.log("访问了");
			profileStore.checkIsLogin()
		}
	})
	function login() {
		uni.navigateTo({
			url: "/pages/login/login"
		})
	}
	function logout() {
		// 关闭客户端对服务端的连接
		profileStore.closeConnect()
		// 将缓存清除
		uni.clearStorage()
		uni.navigateTo({
			url: "/pages/login/login"
		})
	}
	
	function goFriendList () {
		uni.navigateTo({
			url: "/pages/friend-list/friend-list"
		})
	}
	
	function goSongList(event) {
		const {type,index} = event.currentTarget.dataset
		let url = `/pages/profile-list/profile-list?type=${type}`
		if(type === "menu"){
			url = url + `&index=${index}`
		}
		uni.navigateTo({
			url
		})
	}
	// 创建歌单
	function createMenu() {
		console.log("createMenu")
		uni.showModal({
			title: '创建新的歌单',
			editable: true,
			placeholderText: "输入歌单名称",
			success(data) {
				const menuname = data.content
				if(data.confirm) {
					for(let item of myMenuList.value){
						if(item.menuname === menuname){
							console.log("歌单名称重复了")
							return
						}
					}
					createNewMenu({menuname}).then((data)=>{
						const menu = {
							...data.data.result.menu
						}
						myMenuList.value.push(menu)
					})
				}
			}
		})
	}
</script>

<style lang="scss">
	.profile{
		.public-class{
			background-color: #fff;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
		}
		.profile-info{
			margin: 110rpx 0 20rpx;
			display: flex; 
			flex-direction: column;
			align-items: center;
			.profile-image{
				width: 100rpx;
				border-radius: 100rpx;
				transform: translateY(-50%);
			}
			.name{
				font-weight: 600;
				font-size: 32rpx;
				transform: translateY(-50%);
				display: flex;
				align-items: center;
				.image-right{
					width: 32rpx;
				}
			}
		}
		.func{
			padding: 20rpx 0;
			display: flex;
			justify-content: space-around;
			.item{
				display: flex;
				flex-direction: column;
				align-items: center;
				.func-image{
					width: 66rpx;
				}
				.func-text{
					font-size: 26rpx;
				}
			}
		}
		.frofile-menu{
			padding: 20rpx 30rpx;
			.menu-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left{
					font-size: 24rpx;
					color: #bfbfbf;
				}
				.right{
					width: 40rpx;
				}
			}
			.menu-item{
				display: flex;
				align-items: center;
				margin: 10rpx 0 20rpx;
				.menu-item-image{
					width: 70rpx;
					border-radius: 10rpx;
				}
				.menu-item-info{
					font-size: 28rpx;
					margin-left: 10rpx;
					.item-sum{
						font-size: 24rpx;
					color: #8a8a8a;
					}
				}
			}
		}
	}
</style>
