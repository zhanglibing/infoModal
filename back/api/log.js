import {axios, post} from './Ajax';


/*
* 获取日志列表
* */
function getLogList(option) {
    return post('/Log/GetAllLogByMid', option);
}

/*
* 获取日志列表
* */
function getLogDetail(lid) {
    return post('/Log/GetLogByLid', {lid});
}


export default {
    getLogList,
    getLogDetail
}
