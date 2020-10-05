import {Counseling_status} from "@/common/js/constant";

export default {
    data() {
        return {
            Counseling_status: Counseling_status,
            size: "mini",
            data: [],

            page: 1,
            limit: 10,
            count: 2,
            PNAME: "",
            PSTS: -1,
        };
    },
    created() {
        this.getList();
    },
    methods: {
        handleSelectionChange(val) {
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getList();
        },
        async getList() {
            let params = {
                page: this.page,
                limit: this.limit,
                PTYPE: this.PTYPE, //产品大类型1心理课程2心理文章3心理fm
                PNAME: this.PNAME,
                PSTS: this.PSTS,
            };
            const {data, count} = await this.api.product.getProductList(params);
            this.data = data;
            this.count = count;
        },
        deleteProduct(PID) {
            this.$confirm("确认删除该产品?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.api.product.deteteProduct({PID}).then(res => {
                    this.$message.success("删除成功!");
                    this.getList();
                }).catch(err => {
                    this.$message.error(err);
                });
            }).catch(() => {
            });
        },
        // 上下架产品
        setProduct(PID, ISSHELF) {
            this.$confirm(`${ISSHELF ? "确定要上架此产品吗，上架后，就不能修改产品详情，如果遇到配置错误等情况，只能下架此产品，下架后已购买此产品的用户不会受到影响。" : "确认下架该产品吗"}?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.api.product.setProduct({PID, ISSHELF}).then(res => {
                    this.$message.success("操作成功!");
                    this.getList();
                }).catch(err => {
                    this.$message.error(err);
                });
            }).catch(() => {
            });
        },
    },
};
