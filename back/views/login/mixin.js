import {checkPhone} from "@/utils/utils";
export default {
    data() {
        return {
            loading: false,
            username: "",
            count: 60,
            timer: null,
        };
    },
    methods: {
        // 发送短信验证码
        async sendMsg() {
            if (!this.checkUserName()) {
                return false;
            }
            try {
                await this.api.login.sendMsg({ToPhoneNumber: this.username});
                this.setTime();
                this.$message.success("短信已发送成功");
            } catch (e) {
                this.$message.error(e);
            }
        },
        //设置倒计时
        setTime() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.count = 59;
            this.timer = setInterval(() => {
                this.count--;
                if (this.count == 0) {
                    clearInterval(this.timer);
                    this.count = 60;
                }
            }, 1000);
        },
        // 核对手机号
        checkUserName() {
            if (!this.username) {
                this.$message.error("账号不能为空");
                return false;
            }
            if (!checkPhone(this.username)) {
                this.$message.error("请输入正确的手机号");
                return false;
            }
            return true;
        },
        // 校验参数  注册和找回密码
        check() {
            if (!this.checkUserName()) {
                return false;
            }
            if (!this.pwd) {
                this.$message.error('密码不能为空');
                return false;
            }
            if (this.pwd.length < 8) {
                this.$message.error('密码长度最少8位');
                return false;
            }
            if (!this.repwd) {
                this.$message.error('确认密码不能为空');
                return false;
            }
            if (this.pwd !== this.repwd) {
                this.$message.error('两次输入密码不一致');
                return false;
            }
            if (!this.smscode) {
                this.$message.error('短信验证码不能为空');
                return false;
            }
            return true;
        },
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = null;
    },
    mounted() {
        console.log("mixin mounted", this.name);
    },
};
