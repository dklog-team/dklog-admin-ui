import request from "./core/request.js";

export const getMember = (data) => {
    const uri = `/members/${data}`
    return request.get(uri);
};

export const deleteMember = (data) => {
    const uri = `/members/resources`
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return request.post(uri, data, config);
};