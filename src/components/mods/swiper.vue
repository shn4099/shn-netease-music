<template>
  <div class="screen">
      <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
        <swiper-slide><img class="swiper-pic" src="../../../static/pic/1.jpg" alt=""></swiper-slide>
        <swiper-slide><img class="swiper-pic" src="../../../static/pic/2.jpg" alt=""></swiper-slide>
        <swiper-slide><img class="swiper-pic" src="../../../static/pic/3.jpg" alt=""></swiper-slide>
        <swiper-slide><img class="swiper-pic" src="../../../static/pic/4.jpg" alt=""></swiper-slide>
        <swiper-slide><img class="swiper-pic" src="../../../static/pic/5.jpg" alt=""></swiper-slide>
        <swiper-slide><img class="swiper-pic" src="../../../static/pic/6.jpg" alt=""></swiper-slide>
  
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

 export default {
    components: {
      swiper,
      swiperSlide,
    },
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
            autoplay:true,
        	loop: true,
        	pagination: {
        	  el: '.swiper-pagination',
        	  type:'bullets',
        	  clickable:true,
	        	}
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(1, 1000, false)
    }
  };
</script>
<style>
.screen{
  width: 100%;
  overflow: hidden;
  border-radius: 15px;
}

	.swiper-pic{
  margin:0;
  padding:0;
		width:100%;
	}
</style>