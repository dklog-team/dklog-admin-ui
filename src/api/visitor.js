import request from "./core/request.js";

export const getTodayCount = () => {
    const uri = `/visitor/count/today`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}

export const getYesterdayCount = () => {
    const uri = `/visitor/count/yesterday`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}

export const getAllCount = () => {
    const uri = `/visitor/count/all`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}

export const getCountStatistics = () => {
    const uri = `/visitor/count/statistics`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}