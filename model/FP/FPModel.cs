using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common
{
    /// <summary>
    /// 发票表
    /// </summary>
    [Table("QDP_COMMON_FP")]
    public class FPModel : BaseModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 所属系统
        /// </summary>
        public string MID { get; set; }
        /// <summary>
        /// 店铺ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 发票状态1已提交申请2开具中3已邮寄4退票中5已作废
        /// </summary>
        public int STS { get; set; }
        /// <summary>
        /// 发票金额
        /// </summary>
        public string NUM { get; set; }
        /// <summary>
        /// 是否纸质1纸质2电子
        /// </summary>
        public int ISZZ { get; set; }
        /// <summary>
        /// 发票类型1增值税普通发票2增值税专用发票
        /// </summary>
        public int FPTYPE { get; set; }
        /// <summary>
        /// 抬头名称
        /// </summary>
        public string NAME { get; set; }
        /// <summary>
        /// 发票申请时间
        /// </summary>
        public DateTime CDATE { get; set; }
        /// <summary>
        /// 详细地址
        /// </summary>
        public string ADDERSS { get; set; }
        /// <summary>
        /// 收件人
        /// </summary>
        public string SJR { get; set; }
        /// <summary>
        /// 电话
        /// </summary>
        public string PHONE { get; set; }
        /// <summary>
        /// 邮编
        /// </summary>
        public string YOUB { get; set; }
        /// <summary>
        /// 邮件地址
        /// </summary>
        public string EMAIL { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string DIC { get; set; }
        /// <summary>
        /// 物流公司名称
        /// </summary>
        public string WLGS { get; set; }
        /// <summary>
        /// 物流单号
        /// </summary>
        public string WLNUM { get; set; }
        /// <summary>
        /// 退票原因
        /// </summary>
        public int TPYY { get; set; }
        /// <summary>
        /// 退票备注
        /// </summary>
        public string TPDIC { get; set; }
        /// <summary>
        /// 退票物流
        /// </summary>
        public string TPWL { get; set; }
        /// <summary>
        /// 退票物流单号
        /// </summary>
        public string TPWLNUM { get; set; }
    }
}