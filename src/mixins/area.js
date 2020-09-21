export default {
    data() {
        return {
            AREAID:'',  //初始化值  编辑返回的值
            allArea: [],
            areas: [],
            selectArea: [],
            expandTrigger: "click", // click\ hover
            separator: "-",
            props: {
                value: "AID",
                label: "ANAME",
            },
        };
    },
    created() {
        this.getAreas();
    },
    methods: {
        async getAreas() {
            const {data} = await this.api.area.getAreas();
            const list = data.filter(val => val.PID == 0);
            list.forEach(val => {
                val.children = data.filter(v => val.AID == v.PID);
                val.children.forEach(v => {
                    v.children = data.filter(vv => v.AID == vv.PID);
                });
            });
            this.allArea = data;
            this.areas = list;
            if(this.AREAID){
                this.initArea();
            }
        },
        // 初始化渲染
        initArea(AID=this.AREAID) {
            setTimeout(() => {
                const CID = this.allArea.find(v => v.AID === AID).PID;
                const PID = this.allArea.find(v => v.AID === CID).PID;
                this.selectArea = [PID, CID, AID];
            }, 500);
        },
        getAddress2() {
            const [PID, CID, AID] = this.selectArea;
            const p = this.allArea.find(val => val.AID == PID).ANAME;
            const c = this.allArea.find(val => val.AID == CID).ANAME;
            const a = this.allArea.find(val => val.AID == AID).ANAME;
            return `${p}-${c}-${a}`;
        },
        // 验证是否选中区域
        checkArea() {
            return !!this.selectArea.length;
        },
        getAreaId() {
            return this.selectArea[2] || "";
        },
        // 清空已选中的地区
        emptyAddress(){
            this.selectArea=[];
            this.AREAID='';
        }

    },
};
