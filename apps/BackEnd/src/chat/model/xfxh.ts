// 引入加密和 WebSocket 模块
import * as crypto from 'crypto';
import * as ws from 'ws';

// 访问讯飞星火 API 的方法
export function xfxh(qustion: string) {
  //星火的API配置
  enum XHConfig {
    APPID = '500a2c2f',
    APISecret = 'NmQ0Mzc4N2MxZTI4ZjJlYmRhNDA1ODI4',
    APIKey = 'cffe0bec210b446cb026abfee204c2e1',
  }

  // 初始化问题值为空字符串
  const questionValue = '';

  // 获取当前时间的 GMT 字符串
  //   const dateString = new Date().toGMTString();
  const dateString = new Date().toUTCString();
  // 定义星火 API 的主机和路径
  const host = 'spark-api.xf-yun.com';
  const path = '/v3.5/chat';

  // 构建用于签名的请求头
  const tmp = `host: ${host}\ndate: ${dateString}\nGET ${path} HTTP/1.1`;

  const APISecret = XHConfig.APISecret; // 星火 APISecret 这里直接填入你自己的APISecret即可 格式如：ZjAafHbiODRdMjiyamM1azc3Yju1gMy1
  const signature = crypto
    .createHmac('sha256', APISecret)
    .update(tmp)
    .digest('base64');

  const APIKey = XHConfig.APIKey;
  // 星火 APIKey
  const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;

  // 将授权信息编码为 Base64 格式
  const buff = Buffer.from(authorization_origin);
  const authorization = buff.toString('base64');

  // 构建访问星火 API 的 WebSocket URL
  const signUrl = `wss://${host}${path}?authorization=${authorization}&date=${encodeURIComponent(dateString)}&host=${host}`;

  // 创建 WebSocket 连接
  const sock = new ws(signUrl);

  // 当连接打开时发送聊天请求
  sock.on('open', function () {
    console.log('讯飞星火连接sock连接成功!!!!');
    // 使用 setTimeout 函数来添加延迟
    setTimeout(function () {
      sock.send(
        JSON.stringify({
          header: {
            app_id: XHConfig.APPID,
          },
          parameter: {
            chat: {
              domain: 'generalv3.5',
              temperature: 0.5,
              max_tokens: 1024,
            },
          },
          payload: {
            message: {
              // # 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
              // # 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
              text: [
                {
                  role: 'user',
                  content: qustion,
                },
              ],
            },
          },
        }),
      );
    }, 1000); // 延迟 1 秒
  });
  return sock;
}
