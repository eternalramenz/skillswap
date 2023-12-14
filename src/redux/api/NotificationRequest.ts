import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

export const createNotification = (id:string , data:any) => API.post(`/notification/${id}`,data)
export const createTradeNotification = (id:string , data:any) => API.post(`/notification/trade/${id}`,data)
export const fetchNotificationCount = (id:string ) => API.get(`/notification/count/${id}`)
export const updateNotification = (data:any) => API.put(`/notification/`,data)


