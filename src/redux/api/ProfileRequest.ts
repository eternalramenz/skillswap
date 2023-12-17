import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})

export const fetchProfilePosts = (id:string, pageParam: number) => API.get(`/profile/post/${id}?cursor=${pageParam}`)
export const fetchProfilePortfolios = (id:string, pageParam: number ) => API.get(`/profile/portfolio/${id}?cursor=${pageParam}`)

export const fetchInfo = (id:string) => API.get(`/profile/${id}`)

export const uploadPortfolio = (data:any) => API.post('/profile/portfolio', data)
export const updatePortfolio = (id:string,data:any) => API.put(`/profile/portfolio/${id}`, data)
export const deletePortfolio = (id:string,data:any) => API.delete(`/profile/portfolio/${id}`, data)

export const uploadPost = (data:any) => API.post('/post', data)
export const updatePost = (id:string, data:any) => API.put(`/post/${id}`, data)
export const deletePost = (id:string, data:any) => API.delete(`/post/${id}`, data)

export const uploadProfilePicture = (id:string, data:any) => API.put(`/profile/display/${id}`, data)

export const uploadCoverPicture = (id:string, data:any) => API.put(`/profile/cover/${id}`, data)
export const removeCoverPicture =(id:string) => API.put(`/profile/cover/remove/${id}`)

