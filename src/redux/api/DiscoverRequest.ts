import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})

export const fetchDiscoverPosts = (pageParam: number) => API.get(`/post/discover/post?cursor=${pageParam}`)
export const fetchFollowingPosts = (id:string, pageParam: number) => API.get(`/post/${id}/following?cursor=${pageParam}`)


export const likePost = (id:string, userId:string) => API.put(`/post/${id}/like`, {userId: userId})