import axios from 'axios';

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile')
  if(profile){
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }
  return req;
})

export const fetchTraders = (id:string, pageParam: number) => API.get(`/trader/${id}?cursor=${pageParam}`)
