import axios from 'axios';
const BASE = 'https://localhost:7047/api';
export const getCompanies    = async ()       => (await axios.get(`${BASE}/companies`)).data;
export const createCompany   = async (c)      => (await axios.post(`${BASE}/companies`, c)).data;
export const updateCompany   = async (id, c)  => await axios.put(`${BASE}/companies/${id}`, c);
export const deleteCompany   = async (id)     => await axios.delete(`${BASE}/companies/${id}`);
