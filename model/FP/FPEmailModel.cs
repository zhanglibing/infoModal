using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common
{
    /// <summary>
    /// 发票邮寄电子邮件实体
    /// </summary>
    [Table("QDP_COMMON_FP_EMAIL")]
    public class FPEmailModel : BaseModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 邮箱地址
        /// </summary>
        public string EMAIL { get; set; }
        /// <summary>
        /// 是否默认；1是0否
        /// </summary>
        public int ISMR { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CDATE { get; set; }
        /// <summary>
        /// 店铺ID
        /// </summary>
        public string SID { get; set; }
    }
}