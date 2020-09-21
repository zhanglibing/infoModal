using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common
{
    /// <summary>
    /// 发票抬头实体
    /// </summary>
    [Table("QDP_COMMON_FP_TT")]
    public class FPTaiTouModel : BaseModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 开局类型1个人2企业
        /// </summary>
        public int KJTYPE { get; set; }
        /// <summary>
        /// 发票类型1增值税普通发票2增值税专用发票
        /// </summary>
        public int FPTYPE { get; set; }
        /// <summary>
        /// 抬头名称
        /// </summary>
        public string NAME { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CDATE { get; set; }
        /// <summary>
        /// 店铺ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 税号
        /// </summary>
        public string SH { get; set; }
        /// <summary>
        /// 开户银行名称
        /// </summary>
        public string BNAME { get; set; }
        /// <summary>
        /// 基本开户帐号
        /// </summary>
        public string JBH { get; set; }
        /// <summary>
        /// 注册地址
        /// </summary>
        public string ZCDZ { get; set; }
        /// <summary>
        /// 注册固定电话
        /// </summary>
        public string GDDH { get; set; }
    }
}