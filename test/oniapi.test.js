import OniApi from '../src/index';
import Auth from './auth';

OniApi.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

OniApi.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
)
OniApi.use(Auth);


test('test OniApi', () => {
  return Auth.login({
    data: {
      username: 'root',
      password: "dsds"
    }
  }).then(res => {
    expect(res.errorCode).toBe(0);
    if (res.errorCode === 0) {
      console.log(res.data);
    }
  }).catch(err => {
    console.log(err);
  })
})