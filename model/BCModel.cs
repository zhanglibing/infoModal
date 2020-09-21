using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common
{
    /// <summary>
    /// 银行卡实体
    /// </summary>
    [Table("QDP_COMMON_BC")]
    public class BCModel : BaseModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 帐号
        /// </summary>
        public string CNO { get; set; }
        /// <summary>
        /// 银行名称
        /// </summary>
        public string CNAME { get; set; }
        /// <summary>
        /// 银行账户名称
        /// </summary>
        public string CKXM { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CDATE { get; set; }
        /// <summary>
        /// 是否默认；1是0否
        /// </summary>
        public int ISMR { get; set; }
        /// <summary>
        /// 图标URl
        /// </summary>
        public string URL { get; set; }
        ///// <summary>
        ///// 是否显示；1是0否
        ///// </summary>
        //public int ISXS { get; set; }
        /// <summary>
        /// 是否删除；1是0否
        /// </summary>
        public int ISDELETE { get; set; }
        /// <summary>
        /// 银行卡图片url
        /// </summary>
        public string CARDURL { get; set; }
        /// <summary>
        /// 所属ID
        /// </summary>
        public string SID { get; set; }
    }
}