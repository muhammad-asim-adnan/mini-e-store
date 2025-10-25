import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';


export const getProducts = () => axios.get(`${API_BASE}/all-products`);
export const addProduct = (data: { name: string; price: number; category: string; stock_status: string; }) =>
  axios.post(`${API_BASE}/store-product`, data);