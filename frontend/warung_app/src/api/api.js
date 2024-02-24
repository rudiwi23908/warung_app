import axios from "axios";

const BASE_URL = "http://localhost:3000";
// axios.defaults.withCredentials = true;
export const getBarang = async () => {
  const response = await axios.get(`${BASE_URL}/barang`);
  return response.data;
};

export const addBarang = async (data) => {
  const response = await axios.post(`${BASE_URL}/barang`, data);
  return response.data;
};

// Tambahkan fungsi untuk update dan delete barang

export const updateBarang = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/barang/${id}`, data);
  return response.data;
};

export const deleteBarang = async (id) => {
  const response = await axios.delete(`${BASE_URL}/barang/${id}`);
  return response.data;
};
