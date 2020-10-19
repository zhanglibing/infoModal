import {axios,HOST,post} from './Ajax'
//获取用户列表
async function getUserList(params) {
    return new Promise((resolve, reject) => {
        axios.get('user/list', {params}).then(res => {
            let {code, data} = res;
            if (code == 200) {
                resolve(data)
            }
            reject('error')
        })
    })
}

//设置权限
async function updatePermission(params) {
    return new Promise((resolve, reject) => {
        axios.post(`/user/updatePermission`, {...params,}).then(res => {
            let {code, data,message} = res;
            if (code == 200) {
                resolve(message)
            }
            reject(data)
        })
    })
}


//删除用户
async function deleteUserById(id) {
    return new Promise((resolve, reject) => {
        axios.delete('user/delete/'+id,{params:{}}).then(res => {
            if (res.code == 200) {
                resolve('ok')
            }
            reject('error')
        })
    })
}



//获取用户信息
async function getUserInfo(id) {
    return new Promise((resolve, reject) => {
        axios.get('user/getInfoById/'+id).then(res => {
            let {code, data} = res;
            if (code == 200) {
                resolve(data)
            }
            reject('error')
        })
    })
}

//保存用户 、新建用户
async function saveAddUser(params) {
    return new Promise((resolve, reject) => {
        axios.post(`user/createOrUpdate`, {...params,}).then(res => {
            let {code, data,message} = res;
            if (code == 200) {
                resolve(message)
            }
            reject(message);
        })
    })
}
//修改用户密码
async function changePsd(params) {
    return new Promise((resolve, reject) => {
        axios.post('user/changePsd', {...params}).then(res => {
            let {code} = res;
            if (code == 200) {
                resolve('ok')
            }
            reject(res.data)
        })
    })
}

async function setNewPsd(params) {
    return new Promise((resolve, reject) => {
        axios.post('user/setNewPsd', {...params,}).then(res => {
            let {code,message} = res;
            if (code == 200) {
                resolve('ok')
            }
            reject(message)
        })
    })
}
/*---------------------------------------用户角色-------------------------------*/
//获取用户角色
async function getRoleList(bool) {
    //isGetNew 判断是否用药获取最新   角色列表新增的时候要获取最新并保存最新数据
    return new Promise((resolve, reject) => {
        axios.get('role/list').then(res => {
            let {code, data} = res;
            if (code == '200') {
                resolve(data);
            } else {
                reject('请求失败');
            }
        })
    });
};

//更新、新增角色
async function saveRole(params) {
    return new Promise((resolve, reject) => {
        axios.post(`role/addOrEdit`, params).then(res => {
            let {code} = res;
            if (code == '200') {
                resolve('ok');
            }
            reject('error')
        })

    });
};

//删除角色
async function deleteRoleById(id) {
    return new Promise((resolve, reject) => {
        axios.delete('role/delete/'+id,{params:{}}).then(res => {
            if (res.code == '200') {
                resolve('ok');
            }
            reject('error')
        })

    });
};

//删除角色
async function deleteCaptcha(params) {
    return new Promise((resolve, reject) => {
        axios.post('user/deleteCaptcha/',params).then(res => {
            if (res.code == '200') {
                resolve('ok');
            }
            reject('error')
        })

    });
};

export default {
    getUserList,
    deleteUserById,
    changePsd,
    setNewPsd,
    getUserInfo,
    getRoleList,
    saveRole,
    deleteRoleById,
    saveAddUser,
    updatePermission,
    deleteCaptcha,
}
