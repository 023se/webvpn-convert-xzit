<template>
	<el-menu :default-active="activeIndex" class="menu-area" mode="horizontal" :ellipsis="false" @select="handleSelect">
		<el-menu-item index="log" disabled>徐工院webvpn链接转换</el-menu-item>
		<div class="flex-grow" />
		<el-menu-item index="encryption">加密</el-menu-item>
		<el-menu-item index="decryption">解密</el-menu-item>
	</el-menu>
	<el-row :gutter="20">
		<el-col :span="10" :offset="7">
			<el-card class="card-area" v-if="pagename==='encryption'">
				<template #header>
					<span>加密</span>
				</template>
				<div>
					<el-input v-model="rawUrl_en" placeholder="请输入完整网址(包含协议,以http://或https://开头)">
						<template #prepend>
							加密前网址：
						</template>
					</el-input>

					<el-row justify="space-evenly"><el-button @click="encrypt()" style="margin-top: 20px;margin-bottom: 20px;" type="primary" plain>转换——加密</el-button></el-row>

					<el-input v-model="vpnUrl_en" placeholder="加密后网址">
						<template #prepend>
							加密后网址：
						</template>
					</el-input>
				</div>
			</el-card>
			<el-card v-if="pagename==='decryption'" class="card-area">
				<template #header>
					<span>解密</span>
				</template>
				<div>
					<el-input v-model="vpnUrl_de" placeholder="请输入完整网址(包含协议,以http://或https://开头)">
						<template #prepend>
							加密的网址：
						</template>
					</el-input>
					<el-row justify="space-evenly"><el-button @click="decrypt()" style="margin-top: 20px;margin-bottom: 20px;" type="primary" plain>转换——解密</el-button></el-row>

					<el-input v-model="rawUrl_de" placeholder="原网址">
						<template #prepend>
							解密后网址：
						</template>
					</el-input>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import AES from "@/assets/js/aes-tools.js";
	
	let pagename=ref('encryption')
	
	const activeIndex = ref('encryption')
	const handleSelect = (key: string, keyPath: string[]) => {
	  pagename.value=key
	}
	
	let rawUrl_en=ref('')
	let vpnUrl_en=ref('')
	let rawUrl_de=ref('')
	let vpnUrl_de=ref('')
	let encrypt=()=>{
		try{
			console.log(rawUrl_en.value)
			vpnUrl_en.value=AES.encryptUrl(rawUrl_en.value)
			console.log(vpnUrl_en)
		}catch(e){
			vpnUrl_en.value='输入的网址有误'
		}
	}
	let decrypt=()=>{
		try{
			rawUrl_de.value=AES.decryptUrl(vpnUrl_de.value)
		}catch(e){
			rawUrl_de.value='输入的网址有误'
		}
	}
</script>

<style lang="scss" scoped>
.flex-grow {
	flex-grow: 1;
}
.menu-area{
	opacity: 0.6 ;
}
.card-area {
	margin-top: 400px;
	opacity: 0.92 ;
	background-color: #f5f5f5;
}
</style>
