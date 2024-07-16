// import axios from 'axios';

// export const client = axios.create({
//   baseURL: 'https://sw-api.starnavi.io',
// });
import axios, { AxiosInstance } from 'axios';

let client: AxiosInstance;

if (process.env.NODE_ENV === 'test') {
  const mockAxios = require('jest-mock-axios').default;
  client = mockAxios;
} else {
  client = axios.create({
    baseURL: 'https://sw-api.starnavi.io',
  });
}

export { client };
