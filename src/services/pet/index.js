import BASE_URI from "@/constants";
import { post, get } from "@/api";

export const createDogService = async (credentials, userId) => {
  const response = await post(`${BASE_URI}v1/users/${userId}/dogs`, { body: credentials });
  return response.data;
};

export const allDogService = async () => {
  const response = await get(`${BASE_URI}v1/dogs`);
  return response.data;
};

export const myDogService = async (userId) => {
  const response = await get(`${BASE_URI}v1/users/${userId}/dogs`);
  return response.data;
};

export const getDogBreedsService = async () => {
  const response = await get(`${BASE_URI}v1/breeds`);
  return response.data;
};

export const getSelectedPetService = async (credentials) => {
  const { userId, petId } = credentials;
  const response = await get(`${BASE_URI}v1/users/${userId}/dogs/${petId}`);
  return response.data;
};