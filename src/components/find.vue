	<template>
  <div class="main">
    <swipers></swipers>

    <div class="everyRecommend">
      <ul class="topslist">
        <li class="tops-li">
          <router-link class='tops-a' to='/'>
            <span class="tops iconfont icon-rili"></span>
            <span class='tops-data'>{{date}}</span>           
            <span>每日推荐</span>
          </router-link>
        </li>
         <li class="tops-li">
          <router-link class='tops-a' to=''>
            <span class="tops iconfont icon-jiarugedan"></span>
            <span>歌单</span>
          </router-link>
        </li>   
        <li class="tops-li">
          <router-link class='tops-a' to=''>
            <span class="tops iconfont icon-paixingbang"></span>
            <span>排行榜</span>
          </router-link>
        </li>
        <li class="tops-li">
          <router-link class='tops-a' to=''>
            <span class="tops iconfont icon-mayi-diantai"></span>
            <span>电台</span>
          </router-link>
        </li>
        <li class="tops-li">
          <router-link class='tops-a' to=''>
            <span class="tops iconfont icon-zhibo"></span>
            <span>直播</span>
          </router-link>
        </li>
    
      </ul>    
    </div>
    <recommends></recommends>
  </div>
</template>

<script>
import swipers from './mods/swiper.vue'
import recommends from './mods/recommend.vue'
export default {
  name: 'home',
  components:{
    swipers,
    recommends,
  },
  data () {
    return {
      musiclist:'',
      newsong:false,
      date:''
    }
  },
  mounted(){
    this.getdatatime()
  },
  methods:{

    getmusic(){
      this.axios.get('http://musicapi.leanapp.cn/music/url?id=347230')
        .then((res)=>{
          if(res.data.isok){
            console.log(1)
            this.musiclist = res.data
          }
        })
    },

    getdatatime(){
      this.Date= new Date();
      this.date= this.Date.getDate();
    }
  }
};
</script>

<style scoped>
.main{
  margin:50px 0 0 0;
  width: 100%;
}
.everyRecommend{
  width: 100%;
}
.topslist{
  left: 0;
  list-style: none;
  display: flex;
  justify-content:space-between;
  overflow: scroll;
}
.inner-container::-webkit-scrollbar {
  display: none;
}
.tops-li{
  margin: 10px 2px;
  width:20%;
  
}
.tops-a{
  display: block;
  text-decoration: none;
  color:black;
  font-size: 10px;
  position:relative;
}
.tops{
  display: block;
  background-color: red;
  border-radius: 100%;
  width: 90%;
  max-width:100px;
  max-height:100px;
  margin:0 auto; 
  color:white;
  font-size:40px;
  text-align:center;
  line-height:70px;
}
.tops-data{
  position:absolute;
  z-index:99;
  color:white;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
  text-aligen:center;
  line-height:80px;
  font-size:15px;
  font-weight:lighter;
}
.tops-a span{
  display: block;
  width: 100%;
  text-align: center;
}
</style>
