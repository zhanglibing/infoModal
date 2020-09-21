using System;
using QDP.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace QDP.JKEntity.Common.Buy
{

    /// <summary>
    /// 购物车
    /// </summary>
    [Table("QDP_COMMON_BUY_SCART")]
    public class ScartModel : BaseModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 所属ID
        /// </summary>
        public string SID { get; set; }
        /// <summary>
        /// 产品ID
        /// </summary>
        public string PID { get; set; }
        /// <summary>
        /// 产品名称
        /// </summary>
        [NotMapped]
        public string PNAME { get; set; }
        /// <summary>
        /// banner图片路径
        /// </summary>
        [NotMapped]
        public string BANNERIMGURL { get; set; }
        /// <summary>
        /// 现价
        /// </summary>
        [NotMapped]
        public decimal XPRICE { get; set; }
        /// <summary>
        /// 原价
        /// </summary>
        [NotMapped]
        public decimal ZPRICE { get; set; }
        /// <summary>
        /// 是否上架
        /// </summary>
        [NotMapped]
        public int ISSHELF { get; set; }
        /// <summary>
        /// 产品类型0套餐1心理课程2心理文章3心理fm4咨询服务
        /// </summary>
        public int PTYPE { get; set; }
        /// <summary>
        /// 数量
        /// </summary>
        public int NUM { get; set; }
        /// <summary>
        /// 系统ID
        /// </summary>
        public string MID { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CDATE { get; set; }
    }
}