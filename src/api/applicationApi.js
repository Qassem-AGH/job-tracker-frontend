import axios from 'axios';

const BASE = 'https://localhost:7047/api';

export const getApplications = async () =>
  (await axios.get(`${BASE}/applications`)).data;

export const createApplication = async (app) =>
  (await axios.post(`${BASE}/applications`, app)).data;

export const updateApplication = async (id, app) =>
  await axios.put(`${BASE}/applications/${id}`, app);

export const deleteApplication = async (id) =>
  await axios.delete(`${BASE}/applications/${id}`);