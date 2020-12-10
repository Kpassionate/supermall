<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" 
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick" ref="tabControl2" 
      v-show="isTabFixed"/>
    <!-- :probe-type 不加v-bind时默认传过去的是字符串 -->
    <scroll class="content"
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl1" 
        />
      <goods-list :goods-list="showGoods" />
    </scroll>
    <!-- 监听组件事件时必须加上 .native属性 -->
    <back-top @click.native="backClick" v-show="isTopShow"/>

    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { HomeMultiData, HomeGoodsData } from "network/home";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import {debounce} from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      scrollY: 0
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoodsData('pop');
    this.getHomeGoodsData('new');
    this.getHomeGoodsData('sell');
  },

  // 进程守卫函数只有在keep-alive 中活跃
  activated() {
    // console.log(this.scrollY)
    // 传第三个参数时会出错
    // this.$refs.scroll.scrollTo(0, this.scrollY, 0)

    this.$refs.scroll.scrollTo(0, this.scrollY)
    this.$refs.scroll.refresh()
    // console.log("home activated")
  },
  deactivated() {
    // console.log("home deactivated")
    this.scrollY = this.$refs.scroll.getScrollY()
    // console.log(this.scrollY)
    // console.log("home deactivated")

  },
  mounted(){

  },
  // mounted() {
    // 监听事件总线发送过来的事件，img-item全部加载完成，刷新scrollHeight
    // 调用防抖函数，防止频繁调用（发送请求）
    // const refresh = debounce( this.$refs.scroll.refresh, 50)
    // this.$bus.$on('homeImgLoad', () => {
    //   // console.log('....');
    //   // this.$refs.scroll.refresh()
    //   refresh()

    // })
  // },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    /*
    点击相关
    */

   // 切换tabControl内容
   tabClick(index) {
     console.log(index)
     switch(index) {
       case 0: 
        this.currentType = 'pop'
        break
      case 1:
        this.currentType = 'new'
        break
      case 2:
        this.currentType = 'sell'
        break
     }
     this.$refs.tabControl1.currentIndex = index;
     this.$refs.tabControl2.currentIndex = index;

   },

   // 内容滚动(1、返回顶部, 2、tabControl 吸顶)
   contentScroll(position) {
    //  console.log(position)
    // 1,判断backTop是否显示
    // this.isTopShow = -(position.y) > 1000
    this.listenerBackTopShow(position)
    // 2、决定tabControl 是否吸顶(position: fixed)
    this.isTabFixed = -(position.y) > this.tabOffsetTop
    // console.log(this.isTabFixed)
   },
   // 加载更多
   loadMore(pullingUp) {
    //  console.log("pullingUp");
    this.getHomeGoodsData(this.currentType)
     
   },
   // 监听swiper图片加载并计算加载成功的tabControl 高度
   swiperImageLoad() {
    //  console.log("....")
    this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    // console.log(this.tabOffsetTop)
   },

    /*
    网络请求相关
    */
    // 请求数据 异步操作
    getHomeMultiData() {
      HomeMultiData().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1
      HomeGoodsData(type, page).then(res =>{
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
};
</script>


<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时， 为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>