<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :banners="topImgs" @detailBannerLoad="detailBannerLoad" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="goodsParamsInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods-list="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <!-- <back-top class="back-top" @click="backClick" v-show="isTopShow" /> -->
    <back-top @click.native="backClick" v-show="isTopShow"/>
  </div>
</template>


<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {
  GoodsDetail,
  Goods,
  Shop,
  GoodsParam,
  Recommend
} from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import DetailBottomBar from './childComps/DetailBottomBar';


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      topImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParamsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin, backTopMixin],

  created() {
    // 获取当前活跃的路由是用route并保存
    this.iid = this.$route.params.iid;
    // 请求详情页数据
    this.getGoodsDetail();
    // 请求推荐数据
    this.getRecommend();
  },
  methods: {
    getGoodsDetail() {
      GoodsDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        // 1、获取详情页顶部轮播
        this.topImgs = data.itemInfo.topImages;
        // 2、获取商品数据
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 3、获取商家信息
        this.shop = new Shop(data.shopInfo);
        // 4、获取详情页数据
        this.detailInfo = data.detailInfo;
        // 5、获取商品参数
        this.goodsParamsInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 6、获取评论信息
        if (data.rate.cPate != 0) {
          this.commentInfo = data.rate.list[0];
        }
        // 上面的数据加载完成后会回调￥nextTick函数
        // 缺点是回调时可能只是dom渲染完毕，图片未加载好
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })

        // 赋值防抖
        this.getThemeTopYs = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
          this.themeTopYs.push(Number.MAX_VALUE);
          // console.log(this.themeTopYs);
        }, 100);
      });
    },
    getRecommend() {
      Recommend().then(res => {
        // console.log(res);
        // const data = res.result;
        this.recommends = res.data.list;
      });
    },
    imageLoad() {
      // console.log("........")
      this.$refs.scroll.refresh();
      // 获取getThemeTopY的值,图片加载完后回调
      this.getThemeTopYs();
    },
    detailBannerLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      // console.log(position)
      // 获取Y值
      const positionY = -position.y;
      // positionY 和主题中的theme中的y值对比
      // [0, 7827, 8928, 9437]
      // positionY在0到7827之间， index=0
      // positionY在7827到8928之间， index=1
      // positionY在8928到9437之间， index=2
      // positionY超过9437值时， index=3

      // 下述方法会频繁赋值，降低效率
      // let cIndex = 0;
      // if (positionY >= this.themeTopYs[3]) {
      //   cIndex = 3;
      // } else if (positionY >= this.themeTopYs[2]) {
      //   cIndex = 2;
      // } else if (positionY >= this.themeTopYs[1]) {
      //   cIndex = 1;
      // } else {
      //   cIndex = 0;
      // }
      // console.log(cIndex);
      // this.$refs.nav.currentIndex = cIndex;

      for(let i=0; i < this.themeTopYs.length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.currentIndex)
        }
      }
      // 判断topback是否显示
      // this.isTopShow = -(position.y) > 1000
      this.listenerBackTopShow(position)
    },
    // 加入购物车
    addToCart() {
      // 获取购物车需要展示的数据
      const product= {}
      product.image = this.topImgs[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // commit 获取的是mutation中的方法
      // this.$store.commit('addCart', product)
      //获取actions 中的方法
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.toastShow(res, 2000);
        // console.log(res)
      })
    }
    
  },
  mounted() {
    // 监听事件总线发送过来的事件，img-item全部加载完成，刷新scrollHeight
    // 调用防抖函数，防止频繁调用（发送请求）
    // const refresh = debounce( this.$refs.scroll.refresh, 50)
    // this.$bus.$on('detailImgLoad', () => {
    //   refresh()
    //   })
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
}
</style>