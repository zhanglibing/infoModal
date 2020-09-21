using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Account
{
    /// <summary>
    /// 店铺账户充值记录表
    /// </summary>
    [Table("QDP_COMMON_ACCOUNT_IN")]
    public class SAccountInModel : BaseModel
    {
        /// <summary>
        /// 充值流水编号
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 充值类型
        /// </summary>
        public int PAYTYPE { get; set; }
        /// <summary>
        /// 充值金额
        /// </summary>
        public decimal NUM { get; set; }
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