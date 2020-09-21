using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Buy
{
    /// <summary>
    /// 优惠劵适用对象表
    /// </summary>
    [Table("QDP_COMMON_BUY_COUPON_FORS")]
    public class CouponForsModel : BaseModel
    {
        /// <summary>
        /// 优惠劵ID
        /// </summary>
        [Key, Column(Order = 0)]
        public string CID { get; set; }
        /// <summary>
        /// 店铺ID/用户ID
        /// </summary>
        [Key, Column(Order = 1)]
        public string SID { get; set; }
    }
}