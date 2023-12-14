import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

export const createComment = (data:any) => API.post(`comment/`,data)
export const updateComment = (data:any, id:string) => API.put(`comment/${id}`, data)

export const deleteComment = (userId:string, id:string) => API.delete(`comment/${userId}?commentId=${id}`,)

export const likeComment = (data:any, id:string) => API.put(`comment/like/${id}`, data)

