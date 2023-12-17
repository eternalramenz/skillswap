import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})



export const setupProfile = (id:string, data:any) => API.put(`/user/setup/${id}`, data)

export const followRequest = (id:string, userId:string) => API.post(`/user/${id}/follow`, {currentUserId: userId})
export const declineRequest = (id:string, userId:string) => API.put(`/user/${id}/follow/decline`,  {currentUserId: userId})
export const followAccept = (id:string, userId:string) => API.put(`/user/${id}/follow/accept`,  {currentUserId: userId})
export const unFollow = (id:string, userId:string) => API.put(`/user/${id}/unfollow`, {currentUserId: userId})

export const generateBio = (data:any) => API.post(`/user/ai/bio`, data).then((response) => {
  return response.data.text;
})
export const generateReview = (data:any) => API.post(`/user/ai/review`, data).then((response) => {
  return response.data.text;
})

export const fetchSearchUsers = (query:string, cursor:number) => API.get(`/user/search?searchQuery=${query}&cursor=${cursor}`)

export const fetchInformation = (id:string) => API.get(`/user/account/${id}`) 


export const updateAccount = (id:number, data:string) => API.put(`/user/${id}`, data)

export const fetchPendingFollowersList = (id:string) => API.get(`/user/followers/list/${id}`)

export const fetchFollowerStatus = (userId:string, id:string) => API.get(`/user/follower/status/${userId}?id=${id}`)
export const fetchFollowingStatus = (userId:string, id:string) => API.get(`/user/following/status/${userId}?id=${id}`)

export const fetchProfileFollowings = (id:string, pageParam:number) => API.get(`/user/followings/${id}?cursor=${pageParam}`)
export const fetchProfileFollowers = (id:string, pageParam:number) => API.get(`/user/followers/${id}?cursor=${pageParam}`)

export const fetchPendingFollowers = (id:string, pageParam: number) => API.get(`/user/followers/pending/${id}?cursor=${pageParam}`)

