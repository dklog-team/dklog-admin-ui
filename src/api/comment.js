import request from "./core/request.js";

export const getCommentList = () => {
    const url = `/comments`
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjg1NDI1NTgyfQ.6SOrwY9n0QzBNkl0Tew0RxvnUjmdBNx_YqqFMVntk4s'
        },
    };
    return request.get(url,config)
};