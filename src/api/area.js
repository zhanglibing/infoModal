import {post, get} from "./Ajax";

/*
* 获取所有地址
* */
function getAreas() {
    return get("/Areas/GetAreas");
}

/**
 * aid  可为空
 * */
function getAreasByAid(aid = "") {
    return get("/Areas/GetAreasByAid", {aid});
}

export default {
    getAreas,
    getAreasByAid,
};
