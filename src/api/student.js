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

export const updateStudent = (data) => {
    const uri = `/students/${data.studentId}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return request.put(uri, data, config);
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

export const getStudentAuthData = () => {
    const uri = `/students/auth/data`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}