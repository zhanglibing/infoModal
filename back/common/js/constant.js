/** 2018/12/10
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:  常量定义
 */


//店铺审核状态
const SHOP_STATE = [
    {value: "1", label: "店铺创建"},
    {value: "2", label: "待审核"},
    {value: "3", label: "审核通过"},
    {value: "4", label: "审核不通过"},
    {value: "5", label: "待提交"},
];

//咨询师审核状态
const Consultant_STATE = [
    {value: 0, label: "未提交审核"},
    {value: 1, label: "待审核"},
    {value: 2, label: "审核通过"},
    {value: 3, label: "审核未通过"},
];

//咨询师审核状态
const Counseling_status = [
    {value: 0, label: "未提交审核"},
    {value: 1, label: "待审核"},
    {value: 2, label: "审核通过"},
    {value: 3, label: "审核未通过"},
];

const SHOP_STATE_MAP = {
    "1": "店铺创建",
    "2": "待审核",
    "3": "审核通过",
    "4": "审核失败",
    "5": "待提交",
};

// 提现审核
const accountWithdrawal = {
    "1": "待审核",
    "2": "审核通过",
    "3": "提现完成",
    "4": "审核不通过",
    "5": "撤销提现",
};

const IDTYPES = [
    {
        label: "心理咨询师二级",
        value: 1,
    },
    {
        label: "心理咨询师三级",
        value: 2,
    },
    {
        label: "婚姻家庭咨询师一级",
        value: 3,
    },
    {
        label: "婚姻家庭咨询师二级",
        value: 4,
    },
    {
        label: "社会工作师",
        value: 5,
    },
    {
        label: "心理治疗师",
        value: 6,
    },
    {
        label: "其他",
        value: 7,
    },
];

const EDU = [
    {
        label: "专科",
        value: 1,
    }, {
        label: "本科",
        value: 2,
    }, {
        label: "硕士",
        value: 3,
    }, {
        label: "博士",
        value: 4,
    }, {
        label: "博士后",
        value: 5,
    },
];
const orderDesc = {
    1: "待支付",
    2: "已完成",
    3: "已取消",
};

const payDesc = {
    1: "余额支付",
    2: "支付宝支付",
    3: "微信支付",
};

export {
    SHOP_STATE,
    SHOP_STATE_MAP,
    EDU,
    IDTYPES,
    Consultant_STATE,
    Counseling_status,
    accountWithdrawal,
    orderDesc,
    payDesc,
};

