from Crypto.Cipher import AES
from binascii import hexlify, unhexlify

key_ = b'CASB2021EnLink!!'
iv_ = b'CASB2021EnLink!!'
institution = 'webvpn.xzit.edu.cn:10443'  # Change the hostname here like 'webvpn.xxx.edu.cn'


def PKCS5_7Padding(data):
    needSize = 16 - len(data) % 16
    if needSize == 0:
        needSize = 16
    return data + needSize.to_bytes(1, 'little') * needSize


def unpadding(data: bytes):
    n = len(data)
    if n == 0:
        return data
    paddingNum = data[-1]
    return data[:-paddingNum]


def getCiphertext(plaintext, key=key_, cfb_iv=iv_):
    '''From plantext hostname to ciphertext'''
    message = plaintext.encode('utf-8')

    cfb_cipher_encrypt = AES.new(key, AES.MODE_CBC, cfb_iv, )  # Must include segment_size
    mid = cfb_cipher_encrypt.encrypt(PKCS5_7Padding(message))
    return hexlify(mid).decode()


def getPlaintext(ciphertext, key=key_, cfb_iv=iv_):
    '''From ciphertext hostname to plaintext'''

    message = unhexlify(ciphertext.encode('utf-8'))

    cfb_cipher_decrypt = AES.new(key=key, mode=AES.MODE_CBC, iv=cfb_iv)
    cfb_msg_decrypt = cfb_cipher_decrypt.decrypt(message)
    cfb_msg_decrypt = unpadding(cfb_msg_decrypt)
    return cfb_msg_decrypt.decode('utf-8')


def getVPNUrl(url):
    '''From ordinary url to webVPN url'''

    parts = url.split('://')
    pro = parts[0]
    add = parts[1]

    hosts = add.split('/')
    cph = getCiphertext(hosts[0])
    fold = '/'.join(hosts[1:])

    return 'https://' + institution + '/' + pro + '/webvpn' + cph + '/' + fold


def getOrdinaryUrl(url):
    '''From webVPN url to ordinary url'''

    parts = url.split('/')
    pro = parts[3]
    key_cph = parts[4]
    if key_cph[:16] == hexlify(iv_).decode('utf-8'):
        print(key_cph[:32])
        return None
    else:
        hostname = getPlaintext(key_cph[6:])
        fold = '/'.join(parts[5:])
        return pro + "://" + hostname + '/' + fold


if __name__ == '__main__':
    url = 'https://www.baidu.com/'
    print('From ordinary url: \n' + getVPNUrl(url))

    VPNUrl = 'https://webvpn.xzit.edu.cn:10443/http/webvpnc68bb25041f315b90855189668475414/3269/list.psp'
    print('\nFrom webVPN url: \n' + getOrdinaryUrl(VPNUrl))
