import axios from 'axios';

const BASE = 'https://localhost:7047/api';

export const getCompanies = async () =>
  (await axios.get(`${BASE}/companies`)).data;

export const createCompany = async (company) =>
  (await axios.post(`${BASE}/companies`, company)).data;

export const updateCompany = async (id, company) =>
  await axios.put(`${BASE}/companies/${id}`, company);

export const deleteCompany = async (id) =>
  await axios.delete(`${BASE}/companies/${id}`);