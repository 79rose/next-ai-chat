import {
  Fetch as FetchClassType,
  Response,
  ResponseNet,
  Config,
  request,
  FetchType,
  Method,
} from "../type";
import {
  processBody as ProcessBody,
  processError as ProcessError,
  processUrl as ProcessUrl,
  processConfig as ProcessConfig,
  processRequest as ProcessRequest,
  cancelRequest as CancelRequest,
  processCode as ProcessCode,
  handdleTimeout as HanddleTimeout,
} from "./process";
import qs from "qs";

/**
 * @description 封装fetch请求 实现流式传输 利用service worker缓存 进行超时重试 重试次数限制 请求取消
 * @author LeeWahJoel @github:79rose
 */

export class Fetch implements FetchClassType {
  controller!: AbortController;
  Config!: Config;
  headers!: FetchType.FetchHeaders;
  constructor(config?: Config) {
    this.defaultConfig = {
      timeout: 5000,
      cache: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24小时
      responseType: "json",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      } as unknown as FetchType.FetchHeaders,
      onSucess: () => {},
      onFail: () => {},
      onAbort: () => {},
      onTimeout: () => {},
    };
    this.Config = { ...this.defaultConfig, ...config };
  }
  defaultConfig: Config;

  requestInstance!: FetchType.FetchRequest;
  responseInstance!: FetchType.FetchResponse;
  public request: request = async <T = any>(Config: Config) => {
    // 重置controller
    this.controller = new AbortController();
    this.processConfig(Config);
    this.processRequest();
    // 处理请求超时
    this.handdleTimeout();
    try {
      this.responseInstance = await fetch(this.requestInstance);
      if (!this.responseInstance.ok) {
        return Promise.reject(new Error(this.responseInstance.statusText));
      }
      this.processCode(this.responseInstance.status);
      const data = await this.responseInstance.json();
      return {
        data,
        status: this.responseInstance.status,
        msg: this.responseInstance.statusText,
      } as ResponseNet<T>;
    } catch (error: any) {
      if (error.name === "AbortError") {
        this.processError(error);
      } else {
        this.processCode(error.status);
      }
      return Promise.reject(error);
    }
  };
  public get = <T = any>(url: string, Config?: Config) => {
    return this.request<T>({
      ...Config,
      url,
      method: "GET",
      responseType: "json",
    });
  };
  public post = <T = any>(url: string, data?: any, Config?: Config) => {
    return this.request<T>({
      ...Config,
      url,
      method: "POST",
      data,
      responseType: "json",
    });
  };
  public put = <T = any>(url: string, data?: any, Config?: Config) => {
    return this.request<T>({
      ...Config,
      url,
      method: "PUT",
      data,
      responseType: "json",
    });
  };
  public delete = <T = any>(url: string, Config?: Config) => {
    return this.request<T>({
      ...Config,
      url,
      method: "DELETE",
      responseType: "json",
    });
  };
  private processCode(code: number) {
    // ProcessCode.call(this, code);
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
  private processBody() {
    //1. 如果是GET请求，将data拼接到url上
    //2. content-type为application/json，将data转为json字符串
    //3. content-type为application/x-www-form-urlencoded，将data转为query字符串
    //4. content-type为multipart/form-data，直接返回data (利用fetch，自动处理formData)
    // ProcessBody.call(this);
    if (this.Config.method === "GET" && this.Config.data) {
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
  private processError(error: Error) {
    //1. 请求超时
    //2. 请求取消
    // ProcessError.call(this, error);
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
  private processUrl(url: string) {
    // 以http或者https开头的url不做处理
    // 其他的url加上baseURL
    // return ProcessUrl.call(this, url);
    // 以http或者https开头的url不做处理
    if (/^https?:\/\//.test(url)) {
      return url;
    }
    // 其他的url加上baseURL
    if (this.Config.baseURL) {
      return `${this.Config.baseURL}${url}`;
    }
  }
  private processConfig(Config: Config) {
    // ProcessConfig.call(this, Config);
    this.Config = {
      ...this.defaultConfig,
      ...Config,
      url: this.processUrl(Config.url!),
    };
  }
  private processRequest() {
    // ProcessRequest.call(this);
    this.headers = new Headers(this.Config.headers);
    this.processBody();
    this.requestInstance = new Request(this.Config.url!, {
      headers: this.headers,
      method: this.Config.method,
      mode: this.Config.mode,
      body: this.Config.data,
      signal: this.controller.signal,
    });
  }
  public cancelRequest(
    // callback?: (this: AbortSignal, ev: Event) => void,
    reson: string = "请求取消"
  ) {
    // CancelRequest.call(this, reson);
    this.controller.abort(reson);
  }
  private handdleTimeout() {
    // HanddleTimeout.call(this);
    if (this.Config.timeout) {
      setTimeout(() => {
        // this.cancelRequest(this.Config.onTimeout, "请求超时");
        this.cancelRequest("请求超时");
      }, this.Config.timeout);
    }
  }
}
