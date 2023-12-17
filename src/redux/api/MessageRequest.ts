import axios from 'axios';

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})

export const fetchMessages = (chatId:string) => API.get(`/message/${chatId}`)
export const addMessage = (data:any) => API.post(`/message/`, data)