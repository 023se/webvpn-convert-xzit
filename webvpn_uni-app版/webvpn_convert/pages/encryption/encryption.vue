<template>
	<view>
		<uni-easyinput class="firstInpt" type="textarea" autoHeight v-model="rawUrl" placeholder="请输入完整的网址,(包含协议,例如http://)" />
		<button class="convertButton" @click="convert()">转换——加密</button>
		<uni-easyinput class="firstInpt" disabled autoHeight  type="textarea"  v-model="vpnUrl" placeholder="" />
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
					console.log(this.rawUrl);
					this.vpnUrl=AES.encryptUrl(this.rawUrl)
				}catch(e){
					this.vpnUrl='输入的网址有误'
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
