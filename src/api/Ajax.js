/** 2018/10/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
import axios from "axios";
import qs from "qs";
import store from "../vuex/store";
import router from "../router";
import {Message} from "element-ui";

/*
* 9C9A354ED6304B8692B3E7891687CFCD  幸福某方中台
* E28CC980022B4003B52C8427EB55CAC9   咨询师中台
* C7A0AA1BFDD043AAA538DECC3B156821   咨询师c端
* */
const HOST = "http://47.100.204.170:90/api/";
// const apiHost = HOST;
window.apiHost = HOST;
axios.defaults.baseURL = HOST;
axios.defaults.timeout = 50000;
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8", "xml";// 这个无需使用qs转化
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8", "xml";//POST传参序列化
axios.interceptors.request.use((config) => {
    // config.headers.common['Token'] = store.getters.getToken;
    const shopId = store.getters.getActiveShopId;
    const expands = {
        mid: shopId ? shopId : "E28CC980022B4003B52C8427EB55CAC9",
        promid: "9C9A354ED6304B8692B3E7891687CFCD",
        Token: store.state.token || "",
        sid:shopId,
    };
    if (shopId) {
        expands.shopid = shopId;
    }
    if (config.method === "post") {
        config.data = qs.stringify({
            ...expands,
            ...config.data,
        });
        // console.log(config.data)
    } else {

        config.params = {
            ...expands,
            ...config.params,
        };
    }
    return config;
}, (error) => {
    alert("错误的传参");
    return Promise.reject(error);
});


axios.interceptors.response.use(response => {
        // 对响应数据做点什么
        if (response.data.code == 1001) {
            router.push("/");
            return false;
        }
        return response.data;
    },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = "请求错误(400)";
                    break;
                case 401:
                    Message.error("登录失效");
                    setTimeout(() => {
                        router.replace("/");
                    }, 1000);
                case 403:
                    err.message = "拒绝访问(403)";
                    break;
                case 404:
                    err.message = "请求出错(404)";
                    break;
                case 408:
                    err.message = "请求超时(408)";
                    break;
                case 500:
                    err.message = "服务器错误(500)";
                    break;
                case 501:
                    err.message = "服务未实现(501)";
                    break;
                case 502:
                    err.message = "网络错误(502)";
                    break;
                case 503:
                    err.message = "服务不可用(503)";
                    break;
                case 504:
                    err.message = "网络超时(504)";
                    break;
                case 505:
                    err.message = "HTTP版本不受支持(505)";
                    break;
                default:
                    err.message = `连接出错(${err.response.status})!`;
            }
        } else {
            err.message = "连接服务器失败!";
        }
        return Promise.reject(err);
    });

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params}).then(res => {
            let {code, msg} = res;
            if (code == 0) {
                resolve(res);
            }
            reject(msg);
        });
    });
}

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            let {code, data, msg} = res;
            if (code == 0) {
                if (Array.isArray(data)) {
                    resolve(res);
                }
                resolve(data)
            }
            reject(msg);
        });
    });
}

export {
    axios,
    HOST,
};
