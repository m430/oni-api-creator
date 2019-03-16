import OniApi from '../src/index';
import Auth from './auth';

const api = {
  Auth
}

OniApi.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
)
OniApi.use(api);

test('test OniApi', () => {
  return api.Auth.login({
    data: {
      username: 'root',
      password: "F781A7EA5252604FCDA90263F8FB3E8E"
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