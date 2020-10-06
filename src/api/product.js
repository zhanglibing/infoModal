import { post, get} from './Ajax';
import store from '../vuex/store';


/*
* 新增产品
* */
function addProduct(option) {
    return post('/BProduct/AddProduct', option)
}

/*
* 更新产品
* */
function updateProduct(option) {
    return post('/BProduct/UpdateProduct', option)
}


/**
 * 删除产品
 * PID 产品id
 * */

function deteteProduct(option) {
    return post('/BProduct/DelProduct', option);
}

/**
 * 删除产品
 * PID 产品id
 * ISSHELF  是否上架0否1是
 * */

function setProduct(option) {
    return post('/BProduct/SetProductSts', option);
}

/**
 * 查询产品列表
 * PTYPE 产品类别
 * page
 * limit
 * */

function getProductList(option) {
    return post('/BProduct/GetProductList', {
        ...option,
        SHOPID: store.getters.getActiveShopId
    })
}

/**
 * 查询产品
 * PID 产品id
 * */

function getProductById(option) {
    return post('/BProduct/GetProductByID', option);
}

/**
 * 浏览产品
 * PID 产品id
 * */

function viewProductById(option) {
    return post('/BProduct/SetProductViscount', option)
}

/**
 Title
 Short
 Full
 CATEGORYID
 PUBLISHED:1,
 FILEURL: 关联文件
 ALLOWCOMMENTS:false,
 * */


function addContent(option) {
    return post('/Content/AddContent', option)
}

function updateContent(option) {
    return post('/Content/UpdateContent', option)
}

/*
*获取详情
* cid
* */
function getContent(option) {
    return post('/Content/GetContent', option)
}

/*
* 删除
* cid
* */
function delContent(option) {
    return post('/Content/DeleteContent', option)
}

/*
* 获取列表
* page
* limit
* categoryId 分类
* */
function delContentList(option) {
    return post('/Content/SelectContent', option)
}

export default {
    addProduct,
    updateProduct,
    deteteProduct,
    setProduct,
    getProductList,
    getProductById,
    viewProductById,
    addContent,
    updateContent,
    delContent,
    getContent,
    delContentList,
}
