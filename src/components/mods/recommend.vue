<template>
  <div>

    <div class="recm-music">
      <div class="recm-music-top">
        <h4>推荐歌单</h4>
        <div class="music-top-square">
          <router-link class='top-square-a' to=''>歌单广场</router-link>
        </div>
      </div>

      <div class="recm-music-bottom">
        <ul class="recm-music-bottom-ul" >

          <li class="recm-music-bottom-li" v-for='item in recomlist' :key = 'item.id' @click='getrecomlist(item)'>
            <div class='recm-music-bottom-a'>
              <div class="recm-music-bottom-img-top">
                <img class='recm-music-bottom-img' :src="item.coverImgUrl" alt="">
                <div class="counts">
                  <span class="music-top">{{item.playCount | itemPlayCount}}</span>
                  <span class="music-top iconfont icon-icon-"></span>
                </div>
              </div>
              <span class="recm-music-bottom-span">{{item.name}}</span>
            </div>
          </li>

        </ul>
      </div>
    </div>

    <div class="recm-music">
      <div class="recm-music-top">
        <div class="music-top-new">
          <h4 @click='changelist()' ref='newdisc'>新碟</h4>
          <span></span>
          <h4 @click='newsongs()' ref='newsongs'>新歌</h4>          
        </div>
        <div class="music-top-square">
          <router-link class='top-square-a' to='' v-if='!newsong'>新碟推荐</router-link>
          <router-link class='top-square-a' to='' v-if='newsong'>新歌推荐</router-link>
        </div>
      </div>
      <div class="recm-music-bottom" v-if='!newsong'>
        <ul class="recm-music-bottom-ul" >
          <li class="recm-music-bottom-li">
            <div class='recm-music-bottom-a'>
              <div class="recm-music-bottom-img-top">
                <img class='recm-music-bottom-img' src="/" alt="">
                <div class="counts">
                  <span class="music-top">{{15151511 | itemPlayCount}}</span>
                  <span class="music-top"><i>>></i></span>
                </div>
              </div>
              <span class="recm-music-bottom-span">新碟</span>
            </div>
          </li>
          <li class="recm-music-bottom-li">
            <div class='recm-music-bottom-a'>
              <div class="recm-music-bottom-img-top">
                <img class='recm-music-bottom-img' src="/" alt="">
                <div class="counts">
                  <span class="music-top">{{15151511 | itemPlayCount}}</span>
                  <span class="music-top"><i>>></i></span>
                </div>
              </div>
              <span class="recm-music-bottom-span">新歌</span>
            </div>
          </li>
          <li class="recm-music-bottom-li">
            <div class='recm-music-bottom-a'>
              <div class="recm-music-bottom-img-top">
                <img class='recm-music-bottom-img' src="/" alt="">
                <div class="counts">
                  <span class="music-top">{{15151511 | itemPlayCount}}</span>
                  <span class="music-top"><i>>></i></span>
                </div>
              </div>
              <span class="recm-music-bottom-span">新歌</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="recm-music-bottom" v-if='newsong'>
        <ul class="recm-music-bottom-ul" >
          <li class="recm-music-bottom-li">
            <div class='recm-music-bottom-a'>
              <div class="recm-music-bottom-img-top">
                <img class='recm-music-bottom-img' src="/" alt="">
                <div class="counts">
                  <span class="music-top">{{15151511 | itemPlayCount}}</span>
                  <span class="music-top"><i>>></i></span>
                </div>
              </div>
              <span class="recm-music-bottom-span">新歌</span>
            </div>
          </li>
          <li class="recm-music-bottom-li">
            <div class='recm-music-bottom-a'>
              <div class="recm-music-bottom-img-top">
                <img class='recm-music-bottom-img' src="/" alt="">
                <div class="counts">
                  <span class="music-top">{{15151511 | itemPlayCount}}</span>
                  <span class="music-top"><i>>></i></span>
                </div>
              </div>
              <span class="recm-music-bottom-span">新歌</span>
            </div>
          </li>
          <li class="recm-music-bottom-li">
            <div class='recm-music-bottom-a'>
              <div class="recm-music-bottom-img-top">
                <img class='recm-music-bottom-img' src="/" alt="">
                <div class="counts">
                  <span class="music-top">{{15151511 | itemPlayCount}}</span>
                  <span class="music-top"><i>>></i></span>
                </div>
              </div>
              <span class="recm-music-bottom-span">新歌</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <musicmenu ref='musicMenu'></musicmenu>
  </div>
</template>

<script>
import musicmenu from '../musiclist/musiclist.vue'
export default {
components:{
  musicmenu,
},
  name: 'recommend',
  data () {
    return {
      recomlist:{},
      newsong:false,
      newsong:{}
    }
  },
  created(){
    this.getmusic()
  },
  filters: {
    itemPlayCount(val) {
      if (val < 10000) {
        return val;
      } else {
        return (val / 10000).toFixed(0) + '万';
      }
    }
  },
  methods:{
    getmusic(){
      this.axios.get('http://39.108.80.64:3000/top/playlist',
      {
        params: {
          limit:6,
          order:'new'
        }
      }).then((res) => {
        console.log(res.data)
        this.recomlist = res.data.playlists
     
      })
    },    

    getnewsong(){
      this.axios.get('http://39.108.80.64:3000/top/song',
      {
        params: {
          type:0
        }
      }).then((res) => {
        console.log(res.data)
        this.newsong = res.data.playlists
     
      })
    },
    getrecomlist(item){
      this.$refs.musicMenu.musicMenuShow = true
      this.$refs.musicMenu.getmusiclist(item)
      console.log(item)
      this.$store.commit('getmusicInfo',item)

      //this.musicMenuShow = true
      //this.$router.push('/find/musiclist'+id)
    },
    changelist(){
      this.newsong = false
      this.$refs.newdisc.style.color='black'
      this.$refs.newdisc.style.fontSize='17px'
      this.$refs.newsongs.style.color='gray'
      this.$refs.newsongs.style.fontSize='13px'
    },
    newsongs(){
      this.newsong = true
      this.$refs.newdisc.style.color='gray'
      this.$refs.newdisc.style.fontSize='13px'
      this.$refs.newsongs.style.color='black'
      this.$refs.newsongs.style.fontSize='17px'

    }
  }
};
</script>

<style scoped>
.recm-music{  
  border-top: 1px solid lightgray;
  
}
.recm-music-top{
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
.music-top-square{
  border:1px solid lightgray;
  border-radius: 15px;
}
.top-square-a{
  display: block;
  padding:0 12px ;
  font-size: 10px;
  text-decoration: none;
  color: black;
}
.recm-music-bottom{
  width: 100%;
}
.recm-music-bottom-ul{
  display: flex;
  width: 100%;
  list-style: none;
  justify-content: center;
  flex-wrap:wrap;
}
.recm-music-bottom-li{
  width: 33.33%;
  padding:2px 0 ;
}
.recm-music-bottom-a{
  text-decoration: none;
  color:black;
  display:block;
}
.recm-music-bottom-img{
  display: block;
  width: 90%;
  min-height: 40px;
  border-radius: 10px;
  background-color: red;
  margin: 0 auto;
}
.recm-music-bottom-img-top{
  position: relative;
}
.counts{
  position: absolute;
  margin: 0 auto;
  top: 0;
  left:0;
  right: 0;
  width: 90%;
  height: 20%;
  background: linear-gradient(to right,white, black);
  opacity: .5;
  border-radius: 10px  10px 0 0;
}
.music-top{
  font-size: 12px;
  padding: 0 5px 0 0;
  line-height: 20px;
  color: white;
  display: block;
  float: right;
}
.recm-music-bottom-span{
  margin:0 auto;
  display: block;
  width: 95%;
  font-size: 10px;
  height: 30px; 


  overflow:hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*限制在一个块元素显示的文本的行数*/
  -webkit-box-orient: vertical;
  text-overflow:ellipsis;
}



.music-top-new{
  display:flex;
}
.music-top-new span{
  margin: 0 5px;
  width: 1px;
  height: 20px;
  background: lightgray;
}
.music-top-new h4{
  line-height: 20px;
}
.music-top-new h4:nth-child(3){
  color:gray;
  font-size: 15px;
}
</style>
