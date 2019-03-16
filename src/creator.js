import axios from "axios";
import { getMethodType, getPathParams, stringify } from './util';
import Axios from "axios";

let prepareAjaxMethod = (url) => (options = {}) => {

  let config = getMethodType(url);
  let pathParams = getPathParams(config.url);
  let newUrl = pathParams.reduce((originUrl, pathParam) => {
    let paramVal = options.pathParams[pathParam];
    if (paramVal) {
      return originUrl.replace(`{${pathParam}}`, paramVal);
    } else {
      throw new Error(`${url} has invalid path params.`);
    }
  }, config.url);

  config.url = newUrl;

  if (options.queryParams) {
    newUrl = `${newUrl}?${stringify(options.queryParams)}`;
  }
  delete options.pathParams;
  delete options.queryParams;

  options = Object.assign( config , options);

  return axios(options);
};

export function use(apiObj) {
  Object.keys(apiObj).forEach(key => {
    if (typeof key === 'string') {
      apiObj[key] = prepareAjaxMethod(apiObj[key])
    } else if (typeof key === 'object') {
      apiObj[key] = generate(apiObj[key]);
    } else {
      throw new Error('the api definination is error.');
    }
  })
};

axios.use = use;

export default axios;