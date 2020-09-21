using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Buy
{
    /// <summary>
    /// 订单详细列表
    /// </summary>
    [Table("QDP_COMMON_BUY_ORDER_ITEM")]
    public class OrderItemModel : BaseModel
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 订单ID
        /// </summary>
        public string OID { get; set; }
        /// <summary>
        /// 产品ID
        /// </summary>
        public string PID { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string TITLE { get; set; }
        /// <summary>
        /// 商品数量
        /// </summary>
        public int NUM { get; set; }
        /// <summary>
        /// 优惠价格
        /// </summary>
        public decimal DPRICE { get; set; }
        /// <summary>
        /// 最终价格
        /// </summary>
        public decimal EPRICE { get; set; }
        /// <summary>
        /// 优惠劵ID
        /// </summary>
        public string SCID { get; set; }
        /// <summary>
        /// 优惠劵名称
        /// </summary>
        public string CNAME { get; set; }
        /// <summary>
        /// 优惠券优惠金额/比例
        /// </summary>
        public decimal? CJE { get; set; }
        /// <summary>
        /// 购物券类型1折扣券2代金券
        /// </summary>
        public int? CTYPE { get; set; }
        /// <summary>
        /// 产品大类型0套餐1心理课程2心理文章3心理fm4咨询服务
        /// </summary>
        public int PTYPE { get; set; }
        /// <summary>
        /// 现价
        /// </summary>
        public decimal XPRICE { get; set; }
        /// <summary>
        /// 展示价格
        /// </summary>
        public decimal ZPRICE { get; set; }
        /// <summary>
        /// banner图片路径
        /// </summary>
        public string BANNERIMGURL { get; set; }
        /// <summary>
        /// 商品来源
        /// </summary>
        public string MID { get; set; }
    }
}