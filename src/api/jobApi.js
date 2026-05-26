import axios from 'axios';
const BASE = 'https://localhost:7047/api';
export const getJobs    = async ()       => (await axios.get(`${BASE}/jobs`)).data;
export const createJob  = async (j)      => (await axios.post(`${BASE}/jobs`, j)).data;
export const updateJob  = async (id, j)  => await axios.put(`${BASE}/jobs/${id}`, j);
export const deleteJob  = async (id)     => await axios.delete(`${BASE}/jobs/${id}`);
