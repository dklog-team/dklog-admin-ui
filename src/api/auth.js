import request from "./core/request.js";

export const signIn = (data) => {
    const uri = `/auth/login`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.post(uri, data, config)
}

export const test = () => {
    const uri = `/auth/test`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}