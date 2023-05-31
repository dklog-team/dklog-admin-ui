import request from "./core/request.js";

export const getStudents = (data) => {
    const uri = `/students`
    const config = {
        params: data
    }
    return request.get(uri, config)
}

export const registerStudent = (data) => {
    const uri = `/students`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    request.post(uri, data, config);
}