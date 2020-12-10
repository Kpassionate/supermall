import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'
import FastCick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


// 事件总线
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(Toast)

// 解决移动端300毫秒的延迟
FastCick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
