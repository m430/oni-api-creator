import OniApi from '../src/index';
import Auth from './auth';

const api = {
  Auth
}

OniApi.interceptors.response.use(
  (res) => {
    console.log(res);
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
)
OniApi.use(api);

test('test OniApi', () => {
  return api.Auth.login({
    pathParams: {
      schemaId: 'test1',
      id: 1
    },
    queryParams: {
      a: 1,
      b: 2,
      c: 3,
      d: 'http://baodu.com'
    },
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