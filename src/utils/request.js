import axios from "axios";
import config from "~/config";
import { ElMessage, ElMessageBox } from "element-plus";
import { clearSession, getSession } from "@/utils/storage.js";
import { EncryptParam } from "@/utils/index.js";

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: config[import.meta.env.MODE].baseUrl,
  timeout: 50000,
  withCredentials: true,
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
});

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers.token = getSession("ics_token");
    if (config.method.toLowerCase() === "post") {
      config.data = EncryptParam(config.data);
    }
    return config;
  },
  error => {
    alert("请求错误:" + JSON.stringify(error));
    Promise.reject(error);
  },
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.$code && res.$code === "T") {
      clearSession();
      ElMessageBox.alert("你已被登出，请重新登录", "提示", {})
        .then(() => { })
        .catch(() => { });
      return Promise.reject(service.interceptors.response);
    }
    if (res.$code && res.$code === "E") {
      ElMessageBox.alert(res.$msg);
    } else {
      return res;
    }
  },
  error => {
    if (error && error.response) {
      // let message = "";
    //   switch (error.response.status) {
    //     case 400:
    //       message = "请求错误";
    //       break;
    //     case 401: {
    //       message = "未授权，请登录";
    //       break;
    //     }
    //     case 403:
    //       message = "没有权限，拒绝访问";
    //       break;
    //     case 404:
    //       message = `请求地址出错`;
    //       break;
    //     case 408:
    //       message = "请求超时";
    //       break;
    //     case 500:
    //       message = "服务器内部错误";

      //       break;
      //     case 501:
      //       message = "服务未实现";
      //       break;
      //     case 502:
      //       message = "网关错误";
      //       break;
      //     case 503:
      //       message = "服务不可用";
      //       break;
      //     case 504:
      //       message = "网关超时";
      //       break;
      //     case 505:
      //       message = "HTTP版本不受支持";
      //       break;
      //     default:
      //       break;
      //   }
      const res = error.response.data;
      if (res.$code && res.$code === "T") {
        clearSession();
        // router.push("/login"); // 去登录页面
        // resetRoute(); // 删除/重置路由
        ElMessageBox.alert("你已被登出，请重新登录", "提示", {})
          .then(() => { })
          .catch(() => { });
      } else if (res.$msg) {
        ElMessage.error(res.$msg);
      } else if (error.message.indexOf("timeout") !== -1) {
        ElMessage.error("网络超时");
      } else if (error.message === "Network Error") {
        ElMessage.error("网络连接错误");
      } else if (error.response.data) {
        ElMessage.error(error.response.statusText);
      } else ElMessage.error("接口路径找不到");
    }
    return Promise.reject(error);
  });

export default service;
