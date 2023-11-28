<template>
	<view>
		<normal-bar>
			<template #content>
				<view class="title">
					{{title}}
				</view>
			</template>
		</normal-bar>
		<scroll-view 
			class="scroll-view" 
			:style="{height: screenHeight+'px'}"
			scroll-y
			:scroll-top="scrollTop"
			scroll-with-animation
		>
			<view id="content">
				<template v-for="item in messageList" :key="item.from">
					<view class="from" v-if="user.userid !== item.from">
						<image src="../friend-list/image/avater.png" class="avatar" />
						<view class="arrow"></view>
						<view 
							class="message" 
							:class="{messageWidth: checkString(item.message) > 30}"
							v-if="item.messageType === 'text'"
						>{{item.message}}</view>
						<char-music :song="item.message" v-else />
					</view>
					<view class="clearfix" v-else>
						<view class="to">
								<view
									class="message" 
									:class="{messageWidth: checkString(item.message) > 30}"
									v-if="item.messageType === 'text'"
								>{{item.message}}</view>
								<char-music :song="item.message" v-else />
								<view class="arrow"></view>
								<image src="../friend-list/image/avater.png" class="avatar" />
						</view>
					</view>
				</template>
				<view style="height: 100rpx;"></view>
			</view>
		</scroll-view>
		<view class="input-send">
			<input type="text" class="input" v-model="inputValue"/>
			<view class="hold"></view>
			<view class="send" @click="send">发送</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,computed,nextTick} from "vue"
	import { onLoad,onReady } from "@dcloudio/uni-app"
	import {checkString} from"@/utils/format.js"
	import { storeToRefs } from "pinia"
	import {useProfileStore} from "@/store/profile.js"
	const profileStore = useProfileStore()
	const {receiveList,user,lookuser} = storeToRefs(profileStore)
	
	const screenHeight = ref(677)
	const inputValue = ref("")
	
	const scrollTop = ref(677)
	onLoad(() => {
		uni.getSystemInfo({
			success(res) {
				screenHeight.value = res.screenHeight - res.statusBarHeight - 40
			}
		})
	})
	onReady(() => {
		computeHeight()
	})
	const messageList = computed(() => {
		return receiveList.value[lookuser.value].message
	})
	const title = computed(() => {
		return receiveList.value[lookuser.value].nickname
	})
	
	function send() {
		const data = {
			from: user.value.userid,
			fromNickname: user.value.nickname,
			to: lookuser.value,
			toNickname: title.value,
			date: (new Date()).getTime(),
			message: inputValue.value,
			messageType: "text"
		}
		profileStore.sendMessage(data)
		inputValue.value = ""
		nextTick(() => {
			computeHeight()
		})
	}
	function computeHeight() {
		const query = uni.createSelectorQuery();
		query.select('#content').boundingClientRect();
		query.exec(function (res) {
			scrollTop.value = res[0].height
		});
	}
</script>

<style lang="scss">
	.title{
		text-align: center;
	}
	.clearfix::after{
		content: " ";
		clear: both;
		display: table;
	}
	.scroll-view{
		.from,.to{
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;
		}
		.from{
			.arrow{
				border-right: 10rpx solid #fff;
			}
			.message{
				background-color: #fff;
			}
		}
		.to{
			float: right;
			.arrow{
				border-left: 10rpx solid #37c204;
			}
			.message{
				background-color: #37c204;
			}
		}
		.message{
			padding: 10rpx 14rpx;
			border-radius: 10rpx;
			font-size: 26rpx;
			line-break: anywhere;
		}
		.messageWidth{
			width: 400rpx;
		}
		.avatar{
			width: 70rpx;
			height: 70rpx;
		}
		.arrow{
			border: 10rpx solid transparent;
		}
	}
	.scroll-view ::-webkit-scrollbar{
		display: none;
	}
	.input-send{
		width: 100%;
		padding: 10rpx 30rpx;
		display: flex;
		border-top: 1px solid #e7e7e7;
		border-bottom: 1px solid #e7e7e7;
		background-color: #fff;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		.input{
			width: 80%;
			height: 64rpx;
			padding-left: 10rpx;
			border: 1px solid #ebebeb;
			border-radius: 10rpx;
			background-color: #fff;
		}
		.hold{
			width: 2%;
		}
		.send{
			width: 18%;
			background-color: #37c204;
			line-height: 64rpx;
			text-align: center;
			color: #fff;
			border-radius: 10rpx;
		}
	}
</style>
