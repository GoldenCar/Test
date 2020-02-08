import 'expose-loader?$!expose-loader?jQuery!jquery'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';
import VueMoment from 'vue-moment';
import store from './store'
import ArgonDashboard from './admin/plugins/argon-dashboard'
import VueScrollTo from 'vue-scrollto'
import Toasted from 'vue-toasted';

Vue.use(VueRouter)
Vue.use(ArgonDashboard)
Vue.use(VueCookies);
Vue.use(VueMoment);
Vue.use(VueScrollTo);

const toastOptions = {
  position: 'bottom-center',
  duration: 2000,
};

Vue.use(Toasted, toastOptions);

Vue.config.productionTip = false
import Register from './admin/views/Register.vue'

//set vue routes
const routes = [
    {
      path: '/',
      redirect: '/form',
      component: Register,
      children: [
        {
          path: '/form',
          name: 'register'          
        }
      ]
    }
]

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ store, router }, App)).$mount('#app');
