
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost/viralyIO/api/includes/actions.php',
});

export default axiosInstance;
