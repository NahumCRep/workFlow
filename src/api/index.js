import axios from "axios"
import { URL } from "../config"


const instance = axios.create({
    baseURL: URL
})

const get = async (url) => {
    return await instance.get(url, {
        withCredentials: true,
    })
}

const post = async (url, data) => {
    return await instance.post(url, data, {
        withCredentials: true,
    })
}

const postComment = async (url, data) => {
    return await instance.post(url, data, {
        withCredentials: true, 
        headers: { 'content-type': 'multipart/form-data' }
    })
}

const put = async (url, data) => {
    return await instance.put(url, data, {
        withCredentials: true,
    })
}

// crear otro del que reciba data para eliminar los grupos
const del = async (url, data) => {
    return await instance.delete(url, {
        withCredentials: true,
    })
}


export default instance
export { get, post, put, del, postComment }