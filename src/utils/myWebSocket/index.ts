/**
 * 封装websocket
 * @param{string} api 请求路径
 */
const myWebSocket = (api: string) => {
  //设置全局websocket地址
  const baseUrl = 'ws://localhost:3000';
  const url = baseUrl + api;

  /**
   * 建立websocket连接
   */
  let ws = new WebSocket(url);

  /**
   * 连接成功的回调
   * 发送验证信息
   */
  ws.onopen = () => {
    console.log('ws opened');
    ws.send('aaaa');
  };

  ws.onerror = (e) => {
    console.log(e, 99);
  };

  return ws;
};

export default myWebSocket;
