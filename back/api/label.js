import {axios,post} from './Ajax';


/*
* 获取标签列表
* page,
* limit,
* lname, 类型名称
* lttype  //组类型
* */
function getLabelList(option) {
    return post('/Lable/GetAllLableType', option);
}


function addLabel(option) {
    return post('/Lable/AddLableType', option);
}

function updateLabel(option) {
    return post('/Lable/UpdateLableType', option);
}

/*
* 删除标签
* */
function deleteLabel(ltId) {
    return post('/Lable/DelLableType', {ltId});
}

/*
* 获取标签组详情
* */
function getLabelDetails(ltId) {
    return post('/Lable/GetLableTypeByLtId', {ltId});
}

/*
* 获取标签子标签列表
* page,
* limit,
* lname, 类型名称
* ltId  标签组ID
* */
function getChildLabelList(option) {
    return post('/Lable/GetAllLable', option);
}


/*
* 新增子标签
* */
function addChildLabel(option) {
    return post('/Lable/AddLable', option);
}

/*
* 跟新子标签
* */
function updateChildLabel(option) {
    return post('/Lable/UpdateLable', option);
}

/*
* 删除子标签
* */
function deleteChildLabel(lId) {
    return post('/Lable/DelLable', {lId});
}

/*
* 获取子标签详情
* */
function getChildLabel(lId) {
    return post('/Lable/GetLableByLtId', {lId});
}

/*
* 设置标签关系(设置标签页面专用)
* lids 标签id
* pids  用户id 或者产品id
* */
function setLabels(option) {
    return post('/Lable/SetLablesForPid', option);
}

/*
* 查询所有标签，如果是单个则返回是否已选中(设置标签页面专用)
* pid  用户id 或者产品id
* */
function getLabels(option) {
    return post('/Lable/SelectAllLables', option);
}

export default {
    getLabelList,
    addLabel,
    updateLabel,
    deleteLabel,
    getLabelDetails,
    getChildLabelList,
    addChildLabel,
    deleteChildLabel,
    updateChildLabel,
    getChildLabel,
    setLabels,
    getLabels,

}
