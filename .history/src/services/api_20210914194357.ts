import axios from 'axios';

const api = axios.create({
    baseURL: 'https://randomuser.me/api/',
})


export async function searchPatients(page: number){
  const response = await api.get(`?seed=test&results=50&page=${page}`)
  return response.data
}