const obj = {};

import Toast from './Toast';

obj.install = function (Vue) {
  // 1、创建组件构造器
  const toastContrustor = Vue.extend(Toast);
  // 2、根据组件构造器创建一个组件对象（new一个）
  const toast = new toastContrustor();
  //3、将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement('div'));
  //4、toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  // 给Vue原型添加上挂载后的实例
  Vue.prototype.$toast = toast;

}

export default obj;

// const obj = {};

// import Toast from "./Toast.vue";

// obj.install = function(Vue) {
//   //创建组件构造器
//   const toastConstructor = Vue.extend(Toast);

//   //通过构造器创建组件实例
//   const toast = new toastConstructor();

//   //将实例挂载到元素上，并添加到DOM中
//   toast.$mount(document.createElement("div"));

//   document.body.appendChild(toast.$el);

//   //给Vue原型添加上挂载后的实例
//   Vue.prototype.$toast = toast;
// };

// export default obj;