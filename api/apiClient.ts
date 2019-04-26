import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

// insert your UpCloud username & password here!
const UPCLOUD_USERNAME = 'INSERT_USERNAME_HERE';
const UPCLOUD_PASSWORD = 'INSERT_PASSWORD_HERE';

// use CORS proxy, so we don't get CORS errors such as "No 'Access-Control-Allow-Origin' header is present"
const API_URL =
  'https://cors-anywhere.herokuapp.com/https://api.upcloud.com/1.2';

let axiosInstance: AxiosInstance | null = null;

function getAxios(): AxiosInstance {
  if (axiosInstance === null) {
    axiosInstance = axios.create();
  }

  return axiosInstance;
}

async function request(
  config: AxiosRequestConfig,
): Promise<{ status: number; data: any }> {
  const requestConfig = {
    ...config,
    auth: {
      username: UPCLOUD_USERNAME,
      password: UPCLOUD_PASSWORD,
    },
    url: `${API_URL}${config.url || ''}`,
  };

  const response: AxiosResponse = await getAxios().request(requestConfig);
  const { data, status } = response;

  return { status, data };
}

export { request };
