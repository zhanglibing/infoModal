const OSS = require('ali-oss')

export function client() {
    //后端提供数据
    return new OSS({
        accessKeyId: "LTAI4FriDndJf7wkogKyriTU",
        accessKeySecret: 'koQWBfOBnXUcuTl1dMozszOSN6w9IH',
        // stsToken: '',
        region: 'oss-cn-shanghai', // oss地区
        bucket: "pictures-xfmf",
    })
}

// bucket:pictures-xfmf
// bucket域名:pictures-xfmf.oss-cn-shanghai.aliyuncs.com
// AccessKeyId:LTAI4FriDndJf7wkogKyriTU
// AccessKeySecret:koQWBfOBnXUcuTl1dMozszOSN6w9IH
