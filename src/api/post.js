import request from "./core/request.js";

export const
    getList = (param) => {
    let uri = `/posts`
    const config = {
        params: param
    }
    return request.get(uri, config)
}

export const deleteList = (requestData) => {
    const uri = '/posts/resources'
    const config = {

    }
    return request.post(uri, requestData, config)
}
