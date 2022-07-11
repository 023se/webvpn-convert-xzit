# 说名
本程序借鉴于[webvpn-dlut](https://github.com/ESWZY/webvpn-dlut)

```webvpn.xzit.edu.cn```是徐工院的WebVPN，提供了从校外访问校园网环境资源的接口，可供访问校内资源。

但是登录后，由于链接为加密状态，仅能访问该系统门户所提供的站点。

此程序用Python实现加密链接与普通链接的转换方式。


# 代码结构
源代码为Python文件：“webvpn.py”

代码分为四个函数：

```python
        getCiphertext(plaintext, key = key_, cfb_iv = iv_, size = 128) #利用明文生成密文
        getPlaintext(ciphertext, key = key_, cfb_iv = iv_, size = 128) #利用密文得到明文
        getVPNUrl(url)        #从普通的url转换成webvpn的url
        getOrdinaryUrl(url)   #从webvpn的url反推回普通的url
```

# 运行方式

如果缺少相关Python库，在命令行执行
```pip install -r requirements.txt```

并直接运行 ```python webvpn.py``` 

可以得到一个知网论文网页的webvpn网址和一个webvpn网址对应的原先的网址。

# 适用性

理论上来说，可以应用到所有使用该系统的WebVPN上。在此提供一种移植的思路：

将

```python
institution = 'webvpn.dlut.edu.cn'
```

改为

```python
institution = 'webvpn.xxx.edu.cn'
```

即可切换为XXX的WebVPN。GL

# 感谢
[webvpn-dlut](https://github.com/ESWZY/webvpn-dlut) ：本程序在其基础上进行修改而成