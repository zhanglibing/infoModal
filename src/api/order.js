import { post,get} from "./Ajax";

/**
 *  购物车内生成订单
 * scids 购物车id  array string
 * mid
 * sid
 * */
function addOrderFromCart(option) {
    return post('/Order/CreateSOrderForScart', option);
}

/**
 *  获取订单内单个商品的可用购物券
 * orderid
 * productid
 * */
function getCouponByOrderProduct(option) {
    return post('/Order/SelectCouponUseByOrderProduct', option);
}
/**
 *  设置订单内单个商品的购物券
 * orderid
 * productid
 * couponid
 * */
function setCouponByOrderProduct(option) {
    return post('/Order/SetCouponUseByOrderProduct', option);
}

/**
 *  查询某客户的订单列表（分页、分状态）
 * mid
 * sid
 * oname 产品名称
 * cbdate  开始时间
 * cedate  结束时间
 * osts 订单状态；默认全部-1；全部-1待支付1已完成2已取消3
 * page
 * limit
 * */
function getOrderList(option) {
    return post('/Order/GetOrderList', option);
}

/**
 *  获取单个订单详情查询及订单内产品列表
 * orderid
 * */
function getOrderDetail(option) {
    return post('/Order/GetOrder', option);
}
/**
 *  客户主动取消订单
 * orderid
 * */
function cancelOrder(option) {
    return post('/Order/CancelOrder', option);
}
/**
 *  支付成功后回调方法处理订单状态功后将订单状态标记为已支付 失败后更改订单状态记为待支付
 * orderid
 * sts 是否成功1成功2失败
 * */
function setPayState(option) {
    return get('/Order/PaySuccess', option);
}
/**
 *  更改订单支付类型接口（返回支付连接，返回相应的二维码链接，默认余额）
 * orderid
 * paytype 支付类型，1余额2支付宝3微信
 * */
function setPayType(option) {
    return post('/Order/ChangeOrderForOrder', option);
}
/**
 *  使用余额结算订单
 * orderid
 * atype  账户类型；1账户余额（默认）
 * */
function payByYe(option) {
    return post('/Order/PayOrderByYE', option);
}
/**
 *  生成正式订单信息 返回默认支付连接；默认余额
 * orderid
 * omsg  买家留言
 * */
function createOrder(option) {
    return post('/Order/CreateOrderForSOrder', option);
}


export default {
    addOrderFromCart,
    getCouponByOrderProduct,
    getOrderList,
    getOrderDetail,
    cancelOrder,
    setPayState,
    setPayType,
    payByYe,
    createOrder,
    setCouponByOrderProduct,
}
