import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import store from './store/index';
import Vuelidate from 'vuelidate'
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false
Vue.use(Vuelidate);

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App),
}, Vuelidate).$mount('#app')
