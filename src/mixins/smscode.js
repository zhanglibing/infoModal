export default {
    data() {
        return {
            timer: null,
            count: 60,
        }
    },
    methods:{
        // 发送短信验证码
        async sendMsg(ToPhoneNumber) {
            this.setTime();
            try {
                const data = await this.api.login.sendMsg({ToPhoneNumber});
                this.$message.success('短信已发送成功');
            } catch (e) {
                this.$message.error(e)
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
            }, 1000)
        },
    },
}
