import request from "./core/request.js";

export const
    getList = (pageNum) => {
    let uri = `/images`
    const config = {
        params: {pageNum}
    }
    return request.get(uri,config)
}
