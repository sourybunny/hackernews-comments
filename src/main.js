import Vue from 'vue'
import './plugins/vuetify'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.config.productionTip = false
export const EventHub = new Vue();

Vue.use(VueResource);
Vue.use(EmojiPicker);

new Vue({
  render: h => h(App)
}).$mount('#app')
