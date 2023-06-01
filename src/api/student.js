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
    return request.post(uri, data, config);
}

export const deleteStudent = (data) => {
    const uri = `/students/resources`
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return request.post(uri, data, config);
};