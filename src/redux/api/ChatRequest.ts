import axios from 'axios';

const API = axios.create({baseURL: "https://skillswap-server-ev9h.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})

export const userChats = (currentUserId:string) => API.get(`/chat/${currentUserId}`)
export const fetchContacts = (currentUserId: string) => API.get(`/chat/contacts/${currentUserId}`)
