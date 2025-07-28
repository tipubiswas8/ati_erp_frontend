import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import the router
import "./index.css"; // Import your Tailwind CSS
import Toast, { POSITION } from "vue-toastification";
import "@fortawesome/fontawesome-free/css/all.css";
import HighchartsVue from 'highcharts-vue';
import axios from "axios";
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css';

import "vue-toastification/dist/index.css";
import { createI18n } from "vue-i18n";
import en from "./i18n/en.json";
import bn from "./i18n/bn.json";
import fr from "./i18n/fr.json";
import ja from "./i18n/ja.json";
import cn from "./i18n/cn.json";
import th from "./i18n/th.json";
import ms from "./i18n/ms.json";
import hi from "./i18n/hi.json";

// main.js (or main.ts)
import store from "./store"; // Import Vuex store

const pinia = createPinia();
const app = createApp(App);
const i18n = createI18n({
  legacy: false,
  locale: "en", // default language
  messages: {
    en,
    bn,
    fr,
    ja,
    cn,
    th,
    ms,
    hi,
  },
});
// Set up Toastification options
const options = {
  position: POSITION.TOP_CENTER, // Change to TOP_CENTER or BOTTOM_CENTER as per your need
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
};


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

app
  .use(router)
  .use(i18n)
  .use(store)
  .use(Antd)
  .use(pinia)
  .use(Toast, options);

// Finally, mount the app
app.mount("#app");

app.use(HighchartsVue);