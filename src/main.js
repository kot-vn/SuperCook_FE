import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import * as bootstrapVue from "bootstrap-vue";
import VueConfirmDialog from "vue-confirm-dialog";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueMeta);
Vue.use(bootstrapVue.BootstrapVue);
Vue.use(bootstrapVue.IconsPlugin);
Vue.use(VueConfirmDialog);

Vue.component("vue-confirm-dialog", VueConfirmDialog.default);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
