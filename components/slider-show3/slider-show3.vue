<template>
	<swiper class="starComment" next-margin="40rpx" previous-margin="10rpx">
			<swiper-item class="item" v-for="item in list" :key="item.songid">
				<view class="item-content" :style="'background: url('+item.picUrl+');'">
					<view class="top">
						<image :src="item.picUrl" class="image" />
						<view class="text">
							<text>{{item.songName}}</text>
							<text class="line">—</text>
							<text class="singerName">{{item.singer}}</text>
						</view>
						<image src="./icon/play.png" class="icon" v-if="!isPlay"/>
						<shake :active="isPlay" v-else/>
					</view>
					<view class="bgc">
						<view class="content">
							<view class="content-text">
								{{item.title}}
							</view>
						</view>
						<view class="bottom">
							<view class="left">
								{{item.likedCount}}人觉得赞
							</view>
							<view class="right">
								<image src="./icon/good.png" class="good-icon" />
								<view class="good-text">
									赞一下
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
	</swiper>
</template>

<script setup>
	import { defineProps,ref } from "vue"
	defineProps({
		list: Array 
	})
	// 控制动画跟着音乐播发
	const isPlay = ref(false)
</script>

<style lang="scss">
	.starComment{
		height: 300rpx;
		margin-left: -30rpx;
		color: #fff;
		.item{
			box-sizing: border-box;
			padding-left: 20rpx;
			.item-content{
				height: 100%;
				box-sizing: border-box;
				border-radius: 20rpx;
				background-color: green;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				.top{
					backdrop-filter: blur(20px);
					background-color: rgba(0, 0, 0, .3);
					height: 50rpx;
					display: flex;
					align-items: center;
					padding: 10rpx 30rpx;
					.image{
						width: 50rpx;
						height: 50rpx;
					}
					.text{
						flex: 1;
						font-size: 24rpx;
						margin-left: 10rpx;
						.singerName{
							font-size: 20rpx;
							color: #dcdcdc;
						}
						.line{
							margin: 0 8rpx;
							font-size: 20rpx;
						}
					}
					.icon{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.bgc{
					flex: 1;
					display: flex;
					flex-direction: column;
					backdrop-filter: blur(20px);
					background-color: rgba(0, 0, 0, .2);
					.content{
						flex: 1;
						padding: 20rpx 30rpx;
						display: flex;
						align-items: center;
						.content-text{
							// 让文本显示3行
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
						}
					}
					.bottom{
						padding: 10rpx 30rpx 20rpx;
						line-height: 24rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.left{
							font-size: 24rpx;
							color: #ececec;
						}
						.right{
							display: flex;
							align-items: center;
							.good-icon{
								width: 30rpx;
								height: 30rpx;
							}
							.good-text{
								font-size: 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>