<template>
	<view class="placeholder" :style="'height: '+statusBarHeight+'px;'"></view>
</template>

<script setup>
	import { storeToRefs } from "pinia"
	import {useGlobalStore} from "@/store/useGlobalStore.js"
	const globalStore = useGlobalStore()
	const {statusBarHeight} = storeToRefs(globalStore)
</script>