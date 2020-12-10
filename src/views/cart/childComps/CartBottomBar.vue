<template>
  <div class="bottom-bar">
    <div class="select-all" @click="selectAll">
      <check-bottom class="check-buttom" :is-checked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="price">合计: {{totalPrice}}</div>
    <div class="calculate" @click="toCheck">去结算： {{checkeLength}}</div>
  </div>
</template>

<script>
import CheckBottom from "components/content/checkBottom/CheckBottom";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckBottom
  },
  computed: {
    ...mapGetters(["cartList"]),

    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkeLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.filter(item => !item.checked).length;
    }
  },
  methods: {
    selectAll() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
      // 下面的简化代码不行
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    toCheck() {
      if (!this.checkeLength){
        this.$toast.toastShow('未选择任何商品！', 2000)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.select-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  width: 60px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>