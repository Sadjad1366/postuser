import axios from 'axios';

const staticURL = "https://dummyjson.com";
export const generateClient = () =>{
   return axios.create({
      baseURL:staticURL,
   })
}
