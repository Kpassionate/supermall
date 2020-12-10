<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>


<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    toastShow(msg, duration) {
      // console.log(msg, duration);
      this.isShow = true;
      this.message = msg;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>


<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 10, 0, 0.75);
  padding: 8px 10px;

  z-index: 999;
  color: #fff;
}
</style>