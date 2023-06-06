import request from "./core/request.js";

export const getSmsRequestDataList = (requestData) => {
    const uri = `/sms/request/data`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: requestData,
    }
    return request.get(uri, config)
}

export const getSmsResultData = (messageId) => {
    const uri = `/sms/result/data/${messageId}`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}