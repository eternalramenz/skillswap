import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

export const fetchTimelinePost = (id:string) => API.get(`/post/${id}/discover`)
export const likePost = (id:string, userId:string) => API.put(`/post/${id}/like`, {userId: userId})