import { AxiosStatic } from 'axios';

export interface OniApiStatic extends AxiosStatic {
  use?: any;
}

declare const OniApi: OniApiStatic;

export default OniApi;