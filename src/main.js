import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import request from "@/utils/request";
import "./assets/style.css";

const app = createApp(App);

app.use(store);
app.config.globalProperties.$http = request;
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.mount("#app");
