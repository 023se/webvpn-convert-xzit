<template>
	<view >
		<uni-easyinput class="firstInpt" type="textarea" autoHeight v-model="vpnUrl" placeholder="请输入完整的网址,(包含协议,例如http://)" />
		<button class="convertButton" @click="convert()">转换——解密</button>
		<uni-easyinput class="firstInpt" disabled autoHeight  type="textarea"  v-model="rawUrl" placeholder="" />
	</view>
</template>

<script>
	import AES from "@/assets/js/aes-tools.js";
	export default {
		data() {
			return {
				rawUrl:'',
				vpnUrl:'',
			}
		},
		methods: {
			convert(){
				try{
					this.rawUrl=AES.decryptUrl(this.vpnUrl)
				}catch(e){
					this.rawUrl='输入的网址有误'
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.firstInpt{
		background-color: rgb(210,210,210);
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		margin-left: 35rpx;
		width: 680rpx;
	}
	.convertButton{
		width: 650rpx;
	}
</style>
