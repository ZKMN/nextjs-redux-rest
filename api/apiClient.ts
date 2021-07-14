import axios from "axios";
import { config } from "config";

const apiClient = axios.create({
  timeout: config.api.timeout,
  baseURL: config.api.url,
  headers: {},
});

apiClient.interceptors.request.use((requestConfig) => requestConfig);
apiClient.interceptors.response.use((response) => Promise.resolve(response.data));

export default apiClient;
