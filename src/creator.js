import axios from "axios";
import { getMethodType, getPathParams } from './util';
import qs from 'qs';

let prepareAjaxMethod = (url) => (options = {}) => {

  let config = getMethodType(url);
  let pathParams = getPathParams(config.url);
  let newUrl = pathParams.reduce((originUrl, pathParam) => {
    let paramVal = options.pathParams[pathParam];
    if (typeof paramVal === 'boolean') paramVal = `${paramVal}`;
    if (paramVal) {
      return originUrl.replace(`{${pathParam}}`, paramVal);
    } else {
      throw new Error(`${url} has invalid path params.`);
    }
  }, config.url);

  if (options.queryParams) {
    newUrl = `${newUrl}?${qs.stringify(options.queryParams)}`;
  }

  config.url = newUrl;
  let newOptions = { ...options };
  delete newOptions.pathParams;
  delete newOptions.queryParams;


  newOptions = Object.assign(config, newOptions);

  return axios(newOptions);
};

export function use(apiObj) {
  Object.keys(apiObj).forEach(key => {
    if (typeof apiObj[key] === 'string') {
      apiObj[key] = prepareAjaxMethod(apiObj[key])
    } else if (typeof apiObj[key] === 'object') {
      use(apiObj[key]);
    } else {
      throw new Error('the api definination is error.');
    }
  })
};

axios.use = use;

export default axios;