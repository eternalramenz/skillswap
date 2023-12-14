import axios from 'axios';

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

export const fetchTraders = () => API.get('/traders')
