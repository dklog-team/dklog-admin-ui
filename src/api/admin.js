import request from "./core/request.js";

export const getUsername = (data) => {
    const uri = `/admin/${data.adminId}`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}