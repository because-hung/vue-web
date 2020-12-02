import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import "bootstrap";

import App from "./App.vue";
import router from "./router";
import './bus';

Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;

    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});
