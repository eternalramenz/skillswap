import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server-ev9h.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})

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

export const fetchAllTrades = (id:string, pageParam: number ) => API.get(`/trade/${id}?cursor=${pageParam}`)
export const fetchInvitedTrades = (id:string, pageParam: number ) => API.get(`/trade/invited/${id}?cursor=${pageParam}`)
export const fetchRequestedTrades = (id:string, pageParam: number ) => API.get(`/trade/requested/${id}?cursor=${pageParam}`)
export const fetchAcceptedTrades = (id:string, pageParam: number ) => API.get(`/trade/accepted/${id}?cursor=${pageParam}`)
export const fetchCancelledTrades = (id:string, pageParam: number ) => API.get(`/trade/cancelled/${id}?cursor=${pageParam}`)
export const fetchCompletedTrades = (id:string, pageParam: number ) => API.get(`/trade/completed/${id}?cursor=${pageParam}`)

export const fetchTradeLogs = (id: string, pageParam: number) => API.get(`/trade/logs/${id}?cursor=${pageParam}`)
