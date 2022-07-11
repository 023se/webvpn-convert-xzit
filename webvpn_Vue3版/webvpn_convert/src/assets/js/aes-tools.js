import CryptoJS from 'crypto-js'
let baseUrl = "https://webvpn.xzit.edu.cn:10443/"
let key = CryptoJS.enc.Utf8.parse("CASB2021EnLink!!"); //秘钥,Utf8字节数组
let iv = CryptoJS.enc.Utf8.parse("CASB2021EnLink!!");

function encrypt(url) {
	// 加密
	let urlData = CryptoJS.enc.Utf8.parse(url);
	let encrypted = CryptoJS.AES.encrypt(urlData, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	let resultUrl = encrypted.ciphertext.toString(); //加密后的数据
	return resultUrl
}

function decrypt(url) {
	// 解密
	//传入示例
	// url="webvpnc68bb25041f315b90855189668475414"
	let encryptUrl = url.replace('webvpn', '')

	let encryptedHexStr = CryptoJS.enc.Hex.parse(encryptUrl);
	let urlData = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	let decrypted = CryptoJS.AES.decrypt(urlData, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8); //解密后的数据
	let host = decryptedStr.toString();
	return host
}

function getHost(url) {
	//传入示例
	// url="https://www.baidu.com/index.html"
	let reHost = new RegExp('://.*?/', 'ig')
	let host_list = url.match(reHost)
	if (host_list === null) {
		// 可能不以/结尾 url="https://www.baidu.com"
		url = url + '/'
		host_list = url.match(reHost)
	}
	let host = host_list[0]
	host = host.split('://')[1].split('/')[0]
	return host
}

function encryptUrl(url) {
	//传入示例 
	// url = "https://www.baidu.com/index.html"
	let host = getHost(url)
	
	let encryptUrl = encrypt(host)
	let vpnUrl = baseUrl + url.replace('://', '/').replace(host, `webvpn${encryptUrl}`)
	return vpnUrl
}

function decryptUrl(url) {
	// 传入示例
	// url = "https://webvpn.xzit.edu.cn:10443/http/webvpnc68bb25041f315b90855189668475414/3269/list.psp"
	let msg=''
	let reBaseUrl=new RegExp(`^${baseUrl}`,'ig')
	let nowUrl=url.match(reBaseUrl)
	if (nowUrl===null){
		msg='这不是徐工院webvpn的链接，无法转换'
		return msg
	}
	url = url.replace(reBaseUrl,'')
	let protocol = url.split('/')[0]
	let host = url.split('/')[1]
	host = decrypt(host)
	let pathname_list = url.split('/').slice(2)
	let pathname=pathname_list.join('/')
	let rawUrl=`${protocol}://${host}/${pathname}`
	return rawUrl

}
export default {
	//加密
	encryptUrl,
	//解密
	decryptUrl,
}
