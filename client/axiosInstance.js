import axios from 'axios';


// Edit it to your Base API
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

export default axiosInstance;