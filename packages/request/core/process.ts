import qs from "qs";
import { Response, Config } from "../type";
export function processCode(this: any, code: number) {
  switch (code) {
    case 200:
      this.Config.onSucess!({
        data: this.responseInstance,
        code,
        msg: this.responseInstance.statusText,
      });
      break;
    case 201:
      this.Config.onSucess!({
        data: this.responseInstance,
        code,
        msg: this.responseInstance.statusText,
      });
      break;
    case 202:
    case 204:
    case 206:
    case 304:
      this.Config.onSucess!({
        data: this.responseInstance,
        code,
        msg: this.responseInstance.statusText,
      });
      break;
    case 400:
      this.Config.onFail!({
        data: this.responseInstance,
        code,
        msg: "请求错误",
      });
      break;
    case 401:
      this.Config.onFail!({
        data: this.responseInstance,
        code,
        msg: "未授权，请重新登录",
      });
      break;
    case 403:
      this.Config.onFail!({
        data: this.responseInstance,
        code,
        msg: "拒绝访问",
      });
      break;
    case 404:
      this.Config.onFail!({
        data: this.responseInstance,
        code,
        msg: `请求地址出错: ${this.responseInstance.url}`,
      });
      break;
    case 500:
      this.Config.onFail!({
        data: this.responseInstance,
        code,
        msg: "服务器内部错误",
      });
      break;
    case 501:
      this.Config.onFail!({
        data: this.responseInstance,
        code,
        msg: "服务未实现",
      });
      break;
    case 502:
      this.Config.onFail!({
        data: this.responseInstance,
        code,
        msg: "网关错误",
      });
      break;
    case 503:
      this.Config.onFail!({
        data: this.responseInstance,
        code,
        msg: "服务不可用",
      });
      break;
  }
}
export function processBody(this: any) {
  //1. 如果是GET请求，将data拼接到url上
  //2. content-type为application/json，将data转为json字符串
  //3. content-type为application/x-www-form-urlencoded，将data转为query字符串
  //4. content-type为multipart/form-data，直接返回data (利用fetch，自动处理formData)
  if (this.Config.method === "GET") {
    this.Config.url = `${this.Config.url}?${qs.stringify(this.Config.data)}`;
  }
  switch (this.headers.get("Content-Type")) {
    case "application/json":
      this.Config.data = JSON.stringify(this.Config.data);
      break;
    case "application/x-www-form-urlencoded":
      this.Config.data = qs.stringify(this.Config.data);
      break;
    case "multipart/form-data":
      if (!(this.Config.data instanceof FormData)) {
        const formData = new FormData();
        for (const key in this.Config.data) {
          formData.append(key, this.Config.data[key]);
        }
        this.Config.data = formData;
      }
      this.headers.delete("Content-Type");
    default:
      break;
  }
}

export function processError(this: any, error: Error) {
  //1. 请求超时
  //2. 请求取消
  if (error.message === "请求取消") {
    this.Config.onAbort!({
      data: this.responseInstance,
      code: -1,
      msg: "请求取消",
    } as Response);
  } else
    this.Config.onTimeout!({
      data: this.responseInstance,
      code: -2,
      msg: "请求超时",
    } as Response);
}

export function processUrl(this: any, url: string) {
  // 以http或者https开头的url不做处理
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  // 其他的url加上baseURL
  if (this.Config.baseURL) {
    return `${this.Config.baseURL}${url}`;
  }
}
export function processConfig(this: any, Config: Config) {
  this.Config = {
    ...this.defaultConfig,
    ...Config,
    url: this.processUrl(Config.url!),
  };
}

export function processRequest(this: any) {
  this.headers = new Headers(this.Config.headers);
  this.processBody();
  let config;
  if (this.Config.data) {
    config = {
      ...this.Config,
      body: this.Config.data,
      headers: this.headers,
      method: this.Config.method,
      signal: this.controller.signal,
    };
  } else {
    config = {
      ...this.Config,
      headers: this.headers,
      method: this.Config.method,
      signal: this.controller.signal,
    };
  }
  this.requestInstance = new Request(this.Config.url!, config);
}

export function cancelRequest(
  this: any,
  // callback?: (this: AbortSignal, ev: Event) => void,
  reson: string = "请求取消"
) {
  // if (callback) {
  //   this.controller.signal.onabort = callback;
  // }
  this.controller.abort(reson);
}

export function handdleTimeout(this: any) {
  if (this.Config.timeout) {
    setTimeout(() => {
      // this.cancelRequest(this.Config.onTimeout, "请求超时");
      this.cancelRequest("请求超时");
    }, this.Config.timeout);
  }
}
