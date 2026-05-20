import axios from 'axios';

const BASE = 'https://localhost:7047/api';

export const getJobs = async () =>
  (await axios.get(`${BASE}/jobs`)).data;

export const createJob = async (job) =>
  (await axios.post(`${BASE}/jobs`, job)).data;

export const updateJob = async (id, job) =>
  await axios.put(`${BASE}/jobs/${id}`, job);

export const deleteJob = async (id) =>
  await axios.delete(`${BASE}/jobs/${id}`);