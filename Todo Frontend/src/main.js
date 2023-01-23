import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Routes from './Route';
import VueSession from 'vue-session';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueSession);

const router =new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
