using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Buy
{
    /// <summary>
    /// 优惠劵
    /// </summary>
    [Table("QDP_COMMON_BUY_COUPON")]
    public class CouponModel : BaseModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 所在系统ID或者店铺ID
        /// </summary>
        public string MID { get; set; }
        /// <summary>
        /// 购物券名称
        /// </summary>
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
        /// 发放数量
        /// </summary>
        public int CNUM { get; set; }
        /// <summary>
        /// 购买开始时间
        /// </summary>
        public DateTime BSTARTDATE { get; set; }
        /// <summary>
        /// 购买结束时间
        /// </summary>
        public DateTime BENDDATE { get; set; }
        /// <summary>
        /// 使用开始时间
        /// </summary>
        public DateTime USTARTDATE { get; set; }
        /// <summary>
        /// 使用结束时间
        /// </summary>
        public DateTime UENDDATE { get; set; }
        /// <summary>
        /// 购物券类型1折扣券2代金券
        /// </summary>
        public int CTYPE { get; set; }
        /// <summary>
        /// 优惠金额/比例
        /// </summary>
        public decimal JE { get; set; }
        ///// <summary>
        ///// 购买金额
        ///// </summary>
        //public decimal BUYJE { get; set; }
        /// <summary>
        /// banner图片url
        /// </summary>
        public string BANNERURL { get; set; }
        /// <summary>
        /// 使用产品范围
        /// -1独立产品0套餐1心理课程2心理文章3心理fm4咨询服务5全部
        /// </summary>
        public int USERANGE { get; set; }
        /// <summary>
        /// 适用独立产品ID
        /// </summary>
        public string USERANGEPRO { get; set; }
        /// <summary>
        /// 获取方式1免费领取2收费
        /// </summary>
        public int GETTYPE { get; set; }
        /// <summary>
        /// 个体限制领取上限
        /// </summary>
        public int GETNUM { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string CDIC { get; set; }
        /// <summary>
        /// 购物劵编号
        /// </summary>
        public string CNO { get; set; }
        /// <summary>
        /// 浏览人数
        /// </summary>
        public int VISITNUM { get; set; }
        /// <summary>
        /// 购买数量
        /// </summary>
        public int BUYNUM { get; set; }
        /// <summary>
        /// 累计使用数量
        /// </summary>
        public int USENUM { get; set; }
        /// <summary>
        /// 优惠券状态0待发布1已发布2已禁用3已过期
        /// </summary>
        public int CSTS { get; set; }
        /// <summary>
        /// 创建人ID
        /// </summary>
        public string CUID { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CDATETIME { get; set; }
        /// <summary>
        /// 是否删除1是0否
        /// </summary>
        public int ISDELETE { get; set; }
        /// <summary>
        /// 删除时间
        /// </summary>
        public DateTime? DELDATETIME { get; set; }
    }
}