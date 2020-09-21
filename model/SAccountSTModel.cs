using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Account
{
    /// <summary>
    /// 店铺账户对账单
    /// </summary>
    [Table("QDP_COMMON_ACCOUNT_ST")]
    public class SAccountSTModel : BaseModel
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 店铺ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime STDATE { get; set; }
        /// <summary>
        /// 账户类型1账户余额
        /// </summary>
        public int ATYPE { get; set; }
        /// <summary>
        /// 是否支出1是0否   1支出0收入
        /// </summary>
        public int ISZC { get; set; }
        /// <summary>
        /// 资金流类型;1充值2消费3提现
        /// </summary>
        public int STTYPE { get; set; }
        /// <summary>
        /// 业务ID，订单ID
        /// </summary>
        public string DID { get; set; }
        /// <summary>
        /// 发生金额
        /// </summary>
        public decimal JE { get; set; }
        /// <summary>
        /// 账户余额
        /// </summary>
        public decimal YE { get; set; }
    }
}