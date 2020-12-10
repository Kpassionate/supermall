<template>
  <swiper class="swiper-detail">
    <swiper-item v-for="item in banners" :key="item">
      <img :src="item" alt @load="detailBannerLoad"/>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  name: "DeatilSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    detailBannerLoad() {
      this.$emit('detailBannerLoad')
    }
  }
};
</script>

<style scoped>

.swiper-detail {
  height: 300px;
  overflow: hidden;
}
</style>