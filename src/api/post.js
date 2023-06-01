import request from "./core/request.js";

export const getList = (param) => {
    let uri = `/posts`
    const config = {
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NDI0ODY2fQ.QhXaLPrRDX4dbMVSyuFKIcX3nK4o1DVrdHC6lCCxC4Q',
        },params: param
    }
    return request.get(uri, config)
}

export const deleteList = (requestData) => {
    const uri = '/posts/resources'
    const config = {
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NDI0ODY2fQ.QhXaLPrRDX4dbMVSyuFKIcX3nK4o1DVrdHC6lCCxC4Q',
        },
    }
    return request.post(uri, requestData, config)
}
