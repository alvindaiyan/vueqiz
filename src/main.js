// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueAnalytics from 'vue-analytics';
import 'element-ui/lib/theme-default/index.css';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAnalytics, {
  id: 'UA-47207048-3',
  router,
});

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
