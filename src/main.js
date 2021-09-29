import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";

import request from "@/utils/request";
import "./assets/style.css";

const app = createApp(App);

app.use(store);
app.config.globalProperties.$http = request;
app.use(ElementPlus, { locale, size: "small", zIndex: 3000 });
app.mount("#app");
