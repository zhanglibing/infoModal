using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Buy
{
    /// <summary>
    /// 优惠劵领用表
    /// </summary>
    [Table("QDP_COMMON_BUY_COUPON_USE")]
    public class CouponUseModel : BaseModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 优惠券ID
        /// </summary>
        public string CID { get; set; }
        /// <summary>
        /// 领用ID，用户ID或者店铺ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 领用时间
        /// </summary>
        public DateTime CDATETIME { get; set; }
        /// <summary>
        /// 购物券状态4可使用5已使用6已过期
        /// </summary>
        public int SCSTS { get; set; }
        /// <summary>
        /// 使用时间
        /// </summary>
        public DateTime? USEDATETIME { get; set; }
        /// <summary>
        /// 所在系统ID或者店铺ID
        /// </summary>
        [NotMapped]
        public string MID { get; set; }
        /// <summary>
        /// 购物券名称
        /// </summary>
        [NotMapped]
        public string CNAME { get; set; }
        /// <summary>
        /// 使用门店/用户   1全部2单独设定
        /// </summary>
        public int USEFOR { get; set; }
        /// <summary>
        /// 优惠劵适用对象；店铺ID或用户ID
        /// </summary>
        [NotMapped]
        public List<string> CouponFors { get; set; }
        /// <summary>
        /// 使用开始时间
        /// </summary>
        [NotMapped]
        public DateTime USTARTDATE { get; set; }
        /// <summary>
        /// 使用结束时间
        /// </summary>
        [NotMapped]
        public DateTime UENDDATE { get; set; }
        /// <summary>
        /// 购物券类型1折扣券2代金券
        /// </summary>
        [NotMapped]
        public int CTYPE { get; set; }
        /// <summary>
        /// 优惠金额/比例
        /// </summary>
        [NotMapped]
        public decimal JE { get; set; }
        /// <summary>
        /// banner图片url
        /// </summary>
        [NotMapped]
        public string BANNERURL { get; set; }
        /// <summary>
        /// 使用产品范围
        /// -1独立产品0套餐1心理课程2心理文章3心理fm4咨询服务5全部
        /// </summary>
        [NotMapped]
        public int USERANGE { get; set; }
        /// <summary>
        /// 适用独立产品ID
        /// </summary>
        [NotMapped]
        public string USERANGEPRO { get; set; }
        /// <summary>
        /// 购物劵编号
        /// </summary>
        [NotMapped]
        public string CNO { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        [NotMapped]
        public string CDIC { get; set; }
    }
}