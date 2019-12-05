import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
 
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY')
  }
});

new Vue({
  router,
  vuetify,
  moment,
  render: h => h(App)
}).$mount('#app')
