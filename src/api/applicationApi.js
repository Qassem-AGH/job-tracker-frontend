import axios from 'axios';
const BASE = 'https://localhost:7047/api';
export const getApplications    = async ()       => (await axios.get(`${BASE}/applications`)).data;
export const createApplication  = async (a)      => (await axios.post(`${BASE}/applications`, a)).data;
export const updateApplication  = async (id, a)  => await axios.put(`${BASE}/applications/${id}`, a);
export const deleteApplication  = async (id)     => await axios.delete(`${BASE}/applications/${id}`);
