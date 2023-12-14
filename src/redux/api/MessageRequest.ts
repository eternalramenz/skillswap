import axios from 'axios';

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

export const fetchMessages = (chatId:string) => API.get(`/message/${chatId}`)
export const addMessage = (data:any) => API.post(`/message/`, data)