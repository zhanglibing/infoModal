using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Buy
{
    /// <summary>
    /// 订单表
    /// </summary>
    [Table("QDP_COMMON_BUY_ORDER")]
    public class OrderModel : BaseModel
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 所属人ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 订单状态 待支付1已完成2已取消3
        /// </summary>
        public int OSTS { get; set; }
        /// <summary>
        /// 订单编号
        /// </summary>
        public string ONO { get; set; }
        /// <summary>
        /// 商品名称
        /// </summary>
        public string ONAME { get; set; }
        /// <summary>
        /// 系统ID/店铺ID
        /// </summary>
        public string MID { get; set; }
        /// <summary>
        /// 支付类型1余额2支付宝3微信4其他
        /// </summary>
        public int PAYTYPE { get; set; }
        /// <summary>
        /// 订单总金额
        /// </summary>
        public decimal ALLJE { get; set; }
        /// <summary>
        /// 实际支付金额
        /// </summary>
        public decimal ALLSJE { get; set; }
        /// <summary>
        /// 优惠金额
        /// </summary>
        public decimal DISJE { get; set; }
        /// <summary>
        /// 买家留言
        /// </summary>
        public string OMSG { get; set; }
        /// <summary>
        /// 交易号
        /// </summary>
        public string JYNO { get; set; }
        /// <summary>
        /// 付款时间
        /// </summary>
        public DateTime? PAYTIME { get; set; }
        /// <summary>
        /// 创建日期
        /// </summary>
        public DateTime CDATETIME { get; set; }
        /// <summary>
        /// 创建人
        /// </summary>
        public string CUID { get; set; }
        /// <summary>
        /// 是否删除1是0否
        /// </summary>
        public int ISDEL { get; set; }
        /// <summary>
        /// 删除时间
        /// </summary>
        public DateTime? DELDATE { get; set; }
        /// <summary>
        /// 订单下的产品列表
        /// </summary>
        public List<OrderItemModel> OrderItemModels { get; set; }
    }
    /// <summary>
    /// 订单列表
    /// </summary>
    [Table("QDP_COMMON_BUY_ORDER")]
    public class ShortOrderModel : BaseModel
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 订单状态 待支付1已完成2已取消3
        /// </summary>
        public int OSTS { get; set; }
        /// <summary>
        /// 订单编号
        /// </summary>
        public string ONO { get; set; }
        /// <summary>
        /// 商品名称
        /// </summary>
        public string ONAME { get; set; }
        /// <summary>
        /// 订单总金额
        /// </summary>
        public decimal ALLJE { get; set; }
        /// <summary>
        /// 实际支付金额
        /// </summary>
        public decimal ALLSJE { get; set; }
        /// <summary>
        /// 优惠金额
        /// </summary>
        public decimal DISJE { get; set; }
        /// <summary>
        /// 创建日期
        /// </summary>
        public DateTime CDATETIME { get; set; }
    }
}