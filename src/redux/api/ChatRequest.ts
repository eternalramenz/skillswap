import axios from 'axios';

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

export const userChats = (currentUserId:string) => API.get(`/chat/${currentUserId}`)
export const fetchContacts = (currentUserId: string) => API.get(`/chat/contacts/${currentUserId}`)