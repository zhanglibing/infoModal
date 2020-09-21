using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common
{
    /// <summary>
    /// 发票邮寄地址类
    /// </summary>
    [Table("QDP_COMMON_FP_ADDRESS")]
    public class FPAddressModel : BaseModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 地区编码
        /// </summary>
        public string AREAID { get; set; }
        /// <summary>
        /// 地区编码名称
        /// </summary>
        public string ADDERSSSTR { get; set; }
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
        /// 业务ID：商店ID/用户ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 是否默认；1是0否
        /// </summary>
        public int ISMR { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CDATE { get; set; }
    }
}