import axios from 'axios';

const api = axios.create({
    baseURL: 'https://randomuser.me/api/',
})


export async function searchPatients(){
  const response = await api.get("?results=5000")
  console.log(response.data);
  
}