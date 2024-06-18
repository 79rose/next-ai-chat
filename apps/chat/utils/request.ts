import useUserStore from '@/hooks/useUser';
import axios from 'axios';
let baseURL;
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://localhost:3000';
} else {
  baseURL = 'http://localhost:3000';
}

axios.defaults.baseURL = baseURL;
// 拦截器
axios.interceptors.response.use(
  (response) => {
    // switch (response.status) {
    //   case 401:
    //     console.log('请先登录');
    //     useAuthModal.setState({ isOpen: true });
    //     toast.error('请先登录');
    //     break;
    // }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  (config) => {
    const { token } = useUserStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
