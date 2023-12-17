import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})

export const createComment = (data:any) => API.post(`/comment/`,data)
export const updateComment = (data:any, id:string) => API.put(`/comment/${id}`, data)

export const deleteComment = (userId:string, id:string) => API.delete(`/comment/${userId}?commentId=${id}`,)

export const likeComment = (data:any, id:string) => API.put(`/comment/like/${id}`, data)

export const fetchProfileComments = (id:string , pageParam: number ) => API.get(`/comment/${id}?cursor=${pageParam}`)
