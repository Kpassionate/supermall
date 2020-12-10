<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isactive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    isactive() {
      return this.$route.path.indexOf(this.path) == !-1;
    },
    activeStyle() {
      return this.isactive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // console.log("aa");
      this.$router.replace(this.path);
    }
  }
};
</script>


<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49;
  font-size: 14px;
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>