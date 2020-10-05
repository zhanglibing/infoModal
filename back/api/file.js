import {axios,post} from './Ajax';


/*
* 获取标签列表 获取上传地址和凭证
* title 视频标题
* fileName 视频源文件名
* CateId 课程:1000132346;FM:1000132347
* */
function getUploadURL(params) {
    // const option = {
    //     title: 'test',
    //     fileName: 'test',
    //     CateId: '1000132346',
    // }
    return post('/Media/GetUploadURL',params);
}

function getPlayURL(params) {
    return post('/Media/GetPlayURL',params);
}

export default {
    getUploadURL,
    getPlayURL,
}
