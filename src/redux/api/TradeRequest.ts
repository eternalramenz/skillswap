import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})



export const fetchExistingTrade = (id:string, userId:string) => API.get(`/trade/existing/${id}?id=${userId}`)
export const createTrade = (id:string, data:any) => API.post(`/trade/${id}`, data)
export const acceptTrade = (data:any) => API.put(`/trade/accept`,data)
export const cancelTrade = (data:any) => API.put(`/trade/cancel`,data)
export const completedTrade = (data:any) => API.put(`/trade/complete`,data)
export const reproposeTrade = (data:any) => API.post(`/trade/repropose`,data)
export const rescheduleTrade = (data:any) => API.post(`/trade/reschedule`,data)
export const editTrade = (data:any) => API.post(`/trade/edit`,data)

export const fetchUpcomingSchedule = (id:string, data:any) => API.get(`/trade/upcoming/${id}?date=${data}`)
export const fetchMessageTrade = (id:string) => API.get(`/trade/message/${id}`)
