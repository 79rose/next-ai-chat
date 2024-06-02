export namespace FetchType {
  export type FetchResponse = globalThis.Response;
  export type FetchRequest = globalThis.Request;
  export type FetchHeaders = globalThis.Headers;
}
export interface Config {
  url?: string;
  method?: Method;
  mode?: RequestMode;
  data?: any;
  headers?: FetchType.FetchHeaders;
  timeout?: number;
  cache?: boolean;
  cacheTime?: number;
  // cancel?: boolean;
  responseType?: ResponseType;
  baseURL?: string;
  onSucess?: (response: Response) => void;
  onFail?: (response: Response) => void;
  onAbort?: (response: Response) => void;
  onTimeout?: (response: Response) => void;
  onProgress?: (progressTotal: number, progressNow: number) => void;
}

export type request = <T = any>(Config: Config) => Promise<ResponseNet<T>>;

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "STREAM";

export interface ResponseNet<T = Response> {
  data: T;
  status: number;
  msg: string;
}
export interface Response<T = any> {
  data: T;
  code: number;
  msg: string;
}

export type ResponseType = "arraybuffer" | "blob" | "json" | "text" | "stream";

export interface Fetch {
  request: request;
  defaultConfig: Config;
  Config: Config;
  controller: AbortController;
  requestInstance: FetchType.FetchRequest;
  responseInstance: FetchType.FetchResponse;
  headers: FetchType.FetchHeaders;
  // get: (url: string, data?: any, Config?: Config) => Promise<ResponseNet>;
  // post: (url: string, data?: any, Config?: Config) => Promise<ResponseNet>;
  // put: (url: string, data?: any, Config?: Config) => Promise<ResponseNet>;
  // delete: (url: string, data?: any, Config?: Config) => Promise<ResponseNet>;
  // getStream: (url: string, data?: any, Config?: Config) => Promise<ResponseNet>;
}
