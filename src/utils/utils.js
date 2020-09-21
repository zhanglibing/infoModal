//检查手机号码格式
export const checkPhone=(phone)=> {
    const preg = /^1[3456789]\d{9}$/;
    if(preg.test(phone)) {
        return true;
    }
    return false;
}

// 整理权限
export const getPer=(data)=>{
    //存放所有权限的路径 以及功能权限
    // {'path':{delete:true}}
    const obj = {};
    const init = (child) => {
        if (!child || !child.length) return false;
        child.forEach(({BtnChildren = [], PURL, IsCheck, Children = []}) => {
            const functions = {};
            BtnChildren.forEach(({BNO, IsChecked}) => {
                // 此处返回的功能都是有权限的  不需要判断IsChecked  后台做了处理
                functions[BNO] = true;
            });
            obj[PURL] = functions ;
            // obj[PURL] = IsCheck ? functions : false;
            init(Children);
        });
    };
    init(data);
    return obj;
}
