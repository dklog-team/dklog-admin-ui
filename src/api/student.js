import request from "./core/request.js";

export const getStudents = (data) => {
    const uri = `/students`
    const config = {
        headers: {
            'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NDI1NDUxfQ.nvRdih_WFpebCNA6JW3Jr8gAPzIXzBY_BZA6yPI25Hk'
        },
        params: data
    }
    return request.get(uri, config)
}

export const getStudentAuthData = () => {
    const uri = `/students/auth/data`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return request.get(uri, config)
}