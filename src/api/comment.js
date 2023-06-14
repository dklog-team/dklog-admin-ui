import request from "./core/request.js";

export const getCommentList = (data) => {
    const uri = `/comments`
    const config = {
        params: data,
    };
    return request.get(uri,config)
};

export const deleteCommentList = (data) => {
    const uri = `/comments/resources`
    const config = {

    };
    return request.post(uri,data,config)
};