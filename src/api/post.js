import request from "./core/request.js";
export const getList = () => {
    const uri = `/posts`
    const config = {
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NDI0ODY2fQ.QhXaLPrRDX4dbMVSyuFKIcX3nK4o1DVrdHC6lCCxC4Q',
        },
    }
    return request.get(uri, config)
}

export const getSortList = (param, keywordParam) => {
    let uri
    if(keywordParam === null){
        uri = `/posts?column=${param.reqColumn}&sortDirection=${param.reqDir}`
    }else{
        uri = `/posts?column=${param.reqColumn}&keyword=${keywordParam.reqKeyword}&keywordType=${keywordParam.reqKeywordType}&sortDirection=${param.reqDir}`
    }
    const config = {
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NDI0ODY2fQ.QhXaLPrRDX4dbMVSyuFKIcX3nK4o1DVrdHC6lCCxC4Q',
        },
    }
    return request.get(uri, config)
}

export const deleteList = (requestData) => {
    const uri = '/posts/resources'
    const config = {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NDI0ODY2fQ.QhXaLPrRDX4dbMVSyuFKIcX3nK4o1DVrdHC6lCCxC4Q',
        },
    }
    return request.post(uri, requestData, config)
}
