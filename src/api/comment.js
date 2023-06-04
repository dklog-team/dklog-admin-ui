import request from "./core/request.js";

export const getCommentList = (data) => {
    const uri = `/comments`
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NjI2NDYwfQ.aihMsm2qHnmLOS0IKh9JE8sYmpu9ZZ39vyD1X8EFIWY'
        },
        params: data,
    };
    return request.get(uri,config)
};

export const deleteCommentList = (requestData) => {
    const uri = `/comments/resources`
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NjI2NDYwfQ.aihMsm2qHnmLOS0IKh9JE8sYmpu9ZZ39vyD1X8EFIWY'
        },
    };
    return request.post(uri,requestData,config)
};