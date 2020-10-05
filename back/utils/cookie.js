//设置cookie
function setCookie(c_name, value, exdays) {
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie = `${c_name}=${value};path=/;expires=${exdate.toGMTString()}`;
}

//读取cookie
function getCookie(name) {
    if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        let result = arr.find(val => val.includes(name));
        return result ? result.split("=")[1] : "";
    }
    return "";
}


//清除cookie
function clearCookie(cname) {
    setCookie(cname, "", -1);
}

export function saveLogin(username, password) {
    setCookie("username", username, 10);
    setCookie("password", password, 10);
}

export function clearLogin() {
    clearCookie("username");
    clearCookie("password");
}

export function getLogin() {
    console.log({
        password: getCookie("password"),
        username: getCookie("username"),
    });
    return {
        password: getCookie("password").replace(' ',''),
        username: getCookie("username").replace(' ',''),
    };
}
