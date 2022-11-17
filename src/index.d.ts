import { AxiosStatic } from 'axios';

export interface OniApiStatic extends AxiosStatic {
  use?: any;
  env: String
}

declare const OniApi: OniApiStatic;

export default OniApi;