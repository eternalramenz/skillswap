import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server-ev9h.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})

export const createNotification = (id:string , data:any) => API.post(`/notification/${id}`,data)
export const createTradeNotification = (id:string , data:any) => API.post(`/notification/trade/${id}`,data)
export const fetchNotificationCount = (id:string ) => API.get(`/notification/count/${id}`)
export const updateNotification = (data:any) => API.put(`/notification/`,data)
export const fetchNotifications = (id:string, pageParam: number ) => API.get(`/notification/${id}?cursor=${pageParam}`)


