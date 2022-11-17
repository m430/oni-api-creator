import axios from './creator';

const OniApi = axios;

if (OniApi.env == 'mp') {
  OniApi.defaults.adapter = function (config) {
    return new Promise((resolve, reject) => {
        wx.request({
          url: config.url,
          method: config.method,
          data: config.data,
          header: config.headers,
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        })
    })
  }
}

export default OniApi;