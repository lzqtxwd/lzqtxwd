/**
 * 对Fetch的封装。
 * @param api 必须 请求的api
 * @param option 可选 请求option
 * @param state 可选 AbortController对象，用于需要手动取消的请求。 fetch基于pomise封装，本身不支持取消。
 */
const myFetch = async (api: string, option: any = {}, state: any = null) => {
  let controller: any; // 定义取消请求控制器
  let signal; // 定义取消请求标志

  // 是否传入state,即取消请求的AbortController对象。
  if (state) {
    controller = state; // 传入赋值
  } else {
    controller = new AbortController(); //未传入则new一个AbortController对象赋值
  }
  signal = controller.signal;

  /**
   * 定义请求超时自动取消方法
   * @param timeout<number> 超时时间
   */
  const timeoutPromise = (timeout: number = 20000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          new Response('timeout', { status: 504, statusText: 'timeout' })
        );
        controller.abort(); // 调用定义的取消请求控制器
      }, timeout);
    });
  };

  // 设置请求URL
  const baseUrl = '/'; // 全局统一设置请求协议、IP、端口
  const url = baseUrl + api;

  //请求拦截器，设置请求头
  const reqOption = {
    method: 'GET', // 默认请求方法
    signal, // 添加请求标志，用于取消请求
    headers: {
      'content-type': 'application/json',
    },
    ...option, // 导入传入的option
  };

  /**
   * 发送请求
   * 使用Pomisise.race方法设置超时取消功能
   */
  const response: any = await Promise.race([
    timeoutPromise(),
    fetch(url, reqOption),
  ]);

  //响应拦截
  const { status } = response;
  if (status === 200) {
    return response.json();
  }

  if (status === 401) {
    console.log('认证失败');
  }

  if (status === 500) {
    return response.json();
  }

  if (status === 504) {
    console.log(response);
  }
};

export default myFetch;
