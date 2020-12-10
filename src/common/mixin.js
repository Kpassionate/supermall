import { debounce } from './utils';
import BackTop from "components/content/backTop/BackTop";

// mounted 中的可以用混入， created中不可以直接使用，要封装成函数回调
// 监听图片加载
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('我是混入')
  }
}

// 返回顶部

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isTopShow: false
    }
  },
  methods: {
    // 返回顶部
    backClick() {
      // console.log("aya")
      this.$refs.scroll.scrollTo(0, 0, 100)
    },
    listenerBackTopShow(position) {
      this.isTopShow = -(position.y) > 1000
    }
  },
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}