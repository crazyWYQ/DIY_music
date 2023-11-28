import { defineStore } from "pinia"
import { ref } from "vue"
export const useGlobalStore = defineStore('global',() => {
	const windowBottom = ref(50)
	const statusBarHeight = ref(48)
	const uniPlatform = ref('web')
	
	return { statusBarHeight, uniPlatform, windowBottom }
})