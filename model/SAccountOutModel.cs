using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Account
{
    /// <summary>
    /// 店铺提现表
    /// </summary>
    [Table("QDP_COMMON_ACCOUNT_OUT")]
    public class SAccountOutModel : BaseModel
    {
        /// <summary>
        /// 提现编号w+“日期”+九位数0开始
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 提现的账户类型，1店铺余额
        /// </summary>
        public int ZHTYPE { get; set; }
        /// <summary>
        /// 银行卡ID
        /// </summary>
        public string CID { get; set; }
        /// <summary>
        /// 提现状态；待审核1签收审核2提现完成3审核不通过4撤销提现5
        /// </summary>
        public int STS { get; set; }
        /// <summary>
        /// 审核人
        /// </summary>
        public string SHUID { get; set; }
        /// <summary>
        /// 审核日期
        /// </summary>
        public DateTime? SHDATA { get; set; }
        /// <summary>
        /// 审核意见
        /// </summary>
        public string STSMSG { get; set; }
        /// <summary>
        /// 提现金额
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
        /// <summary>
        /// 提现备注
        /// </summary>
        public string DIC { get; set; }
    }
}