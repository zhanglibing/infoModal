using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Account
{
    /// <summary>
    /// 账户余额表
    /// </summary>
    [Table("QDP_COMMON_ACCOUNT")]
    public class SAccountModel : BaseModel
    {
        /// <summary>
        /// 店铺ID
        /// </summary>
        [Key]
        public string SID { get; set; }
        /// <summary>
        /// 可用金额
        /// </summary>
        public decimal KYJE { get; set; }
        /// <summary>
        /// 冻结金额
        /// </summary>
        public decimal DJJE { get; set; }
        /// <summary>
        /// 用户标记1用户2店铺
        /// </summary>
        public int ISU { get; set; }
        /// <summary>
        /// 账户类型1账户余额
        /// </summary>
        public int ATYPE { get; set; }
    }
    /// <summary>
    /// 收支模型
    /// </summary>
    public class SAccountInAndOutModel : BaseModel
    {
        /// <summary>
        /// 店铺ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 收入金额
        /// </summary>
        public decimal INJE { get; set; }
        /// <summary>
        /// 支出金额
        /// </summary>
        public decimal OUTJE { get; set; }
        /// <summary>
        /// 账户类型
        /// </summary>
        public int ATYPE { get; set; }
        /// <summary>
        /// 日期
        /// </summary>
        public DateTime SDATE { get; set; }
    }
}