<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <category-tab-menu :categories="categories" @selectItem="selectItem" />

      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <category-left :subcategories="showSubcategory" />
          <tab-control :titles="['综合', '新品', '销量']" @itemClick="tabClick" />
          <category-right :category-detail="showCategoryDetail" />
        </div>
      </scroll>
    </div>
  </div>
</template>


<script>
import { CategoryData, SubCategoryData, CategoryDetail } from "network/category";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";

import CategoryTabMenu from "./childComps/CategoryTabMenu";
import CategoryLeft from "./childComps/CategoryLeft";
import CategoryRight from "./childComps/CategoryRight";
// import {POP, SELL, NEW} from "common/const";
// import {tabControlMixin} from "common/mixin";

export default {
  name: "category",
  components: {
    NavBar,
    TabControl,
    Scroll,
    CategoryTabMenu,
    CategoryLeft,
    CategoryRight
  },
  // mixins: [tabControlMixin],

  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1
    };
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    }
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      CategoryData().then(res => {
        // 获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this.getSubCategories(0)
      });
    },
    getSubCategories(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      SubCategoryData(maitKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this.getCategoryDetail('pop')
        this.getCategoryDetail('sell')
        this.getCategoryDetail('new')
      })
    },
    getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallKey = this.categories[this.currentIndex].miniWallkey;
      console.log(type, miniWallKey, "***********")
      // 2.发送请求,传入miniWallkey和type
      CategoryDetail(miniWallKey, type).then(res => {
        console.log(res)
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this.getSubCategories(index)
    },
    tabClick(index){
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
};
</script>


<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>