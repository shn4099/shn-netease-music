<template>
  <transition name="fade">
    <div class='musicMenu' v-show='musicMenuShow'>
  
      <div class='musicMenu-content'>
  
        <div class='musicMenu-top'>
        <i class='musicMenu-top-back iconfont icon-houtui' @click='goback()'></i>
        <span class='musicMenu-Name'>歌单名称</span>
        <i class='musicMenu-top-menu iconfont icon-diandian'></i>
        </div>
  
        <div class='musicMenu-wrpper' ref='musicMenuWrpper'>
        <div class='musicMenu-midd'>
          <div class='musicMenu-midd-bgc'>
            <img :src='musicInfo.coverImgUrl'>
          </div>
          <div  class='musicMenu-midd-content'>
            <div class='musicMenu-midd-one'>
              <div class='musicMenu-midd-one-img'>
                <img :src='musicInfo.coverImgUrl'>
              </div>
              <div class='musicMenu-midd-info'> 
                <div class='musicMenu-midd-info-name'>
                  <span>{{musicInfo.name}}</span>
                </div>
                <div class='musicMenu-midd-info-author'>
                  <img class='musicMenu-midd-info-author-img' :src='author.avatarUrl'>
                  <span class='musicMenu-midd-info-author-span'>{{author.nickname}}</span>
                  <span class='musicMenu-midd-info-author-i'>></span>
                </div>
                <div  class='musicMenu-midd-info-desc'>
                  <p  class='musicMenu-midd-info-desc-p'>{{musicInfo.description}}</p>
                  <span  class='musicMenu-midd-info-desc-i'>></span>
                </div>
              </div>
            </div>  
            <div class='musicMenu-midd-two'>
              <div class="musicMenu-midd-comm">
                <span class="musicMenu-midd-icon iconfont icon-pinglun2"></span>
                <span>{{musicInfo.subscribedCount}}</span>
              </div>
              <div class="musicMenu-midd-share">
                <span class="musicMenu-midd-icon iconfont icon-fenxiang"></span>
                <span>{{musicInfo.shareCount}}</span>
              </div>
              <div class="musicMenu-midd-download">
                <span class="musicMenu-midd-icon iconfont icon-xiazai"></span>
                <span>下载</span>
              </div>
              <div class="musicMenu-midd-chose">
                <span class="musicMenu-midd-icon iconfont icon-xuanze"></span>
                <span>多选</span>
              </div>         
            </div>
          </div>
        </div>
        <div class='musicMenu-bottom'>
          <div class="musicMenu-playlist">
            <div class="musicMenu-playlist-play">
              <i class="iconfont icon-bofang"></i>
              <span>播放全部</span>
              <span>（共{{musicInfo.trackCount}}首）</span>
            </div>
            <div class="musicMenu-playlist-collect">
              <span>+</span>
              <span>收藏</span>
              <span>({{musicInfo.subscribedCount}})</span>
            </div>
          </div>

          <div class="musicMenu-musiclist">
            <ul class="musicMenu-musiclist-ul">
              <li  class="musicMenu-musiclist-li" @click='playsong(item,index)'  v-for='(item, index) in songlist' :class="{'songcolors':(item.name == singlemusic.name)}">
                <span  class="musicMenu-musiclist-index" >{{index + 1}}</span>
                <div  class="musicMenu-musiclist-song">
                  <p class="musicMenu-musiclist-song-name" >{{item.name}}</p>
                  <p class="musicMenu-musiclist-song-author">{{item.ar[0].name}}</p>
                </div>
                <div class="musicMenu-musiclist-song-menu">
                  <i class="musicMenu-musiclist-song-menu-dian iconfont icon-diandian"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
      <musicplay ref='musicplay'></musicplay>
    </div>     
  </transition>
</template>

<script>
import musicplay from '../musicplay/musicplay.vue'
import { mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters([
      'musicInfo',
      'currentIndex',
      'singlemusic'
    ])
  },
  components:{
    musicplay
  },
  data () {
    return {
      musicMenuShow:false,
      author:{},
      songlist:{},
      scrollY:'',
      topContent: '歌单',
      opacity:'',
    }
  },
 
  methods:{
    playsong(item,index){

      this.$refs.musicplay.musicplayshow = true
      this.$refs.musicplay.getsong(item)
      this.$store.commit('getsinglemusic', item);
      this.$store.commit('getcurrentIndex',index);

      console.log(item)
      console.log(index)
    },
    goback(){ 
       this.musicMenuShow = false;
      //this.$router.go(-1);
    },
    getmusiclist(item){
      this.axios.get('http://39.108.80.64:3000/playlist/detail?id=' + item.id)
        .then((res)=>{
          this.author = res.data.playlist.creator
          this.songlist = res.data.playlist.tracks
          this.$store.commit('getsonglist',this.songlist)
          console.log(res.data)
        })
    },
    
  }
};
</script>

<style scoped>
.fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease-out;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

 .musicMenu{
  position:fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: #fff;
 }
 .musicMenu-top{
  padding:0 5px;
  height:40px;
  line-height:40px;
  background-color:black;
  opacity:0.8;
  color:white;
 }
.musicMenu-Name{
  padding: 0 10px;
}
.musicMenu-top-menu{
  width:5%;
  float:right;
  padding: 0 10px; 
}


.musicMenu-wrpper{
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: scroll;
}

.musicMenu-midd{
  position:relative;
  width:100%;
}
.musicMenu-midd-bgc{
  position:absolute;
  width:100%;
  background: rgba(0, 0,100, 5);
  overflow:hidden;
}
.musicMenu-midd-bgc img{

  -webkit-filter: blur(10px); /* Chrome, Opera */
       -moz-filter: blur(10px);
        -ms-filter: blur(10px);    
            filter: blur(10px);
}
.musicMenu-midd-content{
  color:white;
  top:30px;
  position:absolute;
  width:100%;
  display:flex;
  flex-direction:column;
  vertical-align:middle;
}
.musicMenu-midd-one{
  width:100%;
  display: flex;
  justify-content: space-around;
}
.musicMenu-midd-one-img{
  width:33%;
  max-width:150px;
}
.musicMenu-midd-one-img img{
  width:100%;
}
.musicMenu-midd-info{
  width: 60%;
}
.musicMenu-midd-info-name{
  height: 30px;
  padding-right:5px;
}
.musicMenu-midd-info-name span{
  overflow:hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*限制在一个块元素显示的文本的行数*/
  -webkit-box-orient: vertical;
  text-overflow:ellipsis;
  
}
.musicMenu-midd-info-author{
  height: 30px;
}
.musicMenu-midd-info-author *{
  vertical-align: middle;
}
.musicMenu-midd-info-author-img{
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: white;
}
.musicMenu-midd-info-desc{
  display: flex;
  margin-top: 15px;
}
.musicMenu-midd-info-desc-p{
  height: 30px;
  width: 80%;
  font-size: 12px;
  overflow:hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*限制在一个块元素显示的文本的行数*/
  -webkit-box-orient: vertical;
  text-overflow:ellipsis;
}
.musicMenu-midd-info-desc-i{
  width: 20px;
  text-align: center;
  line-height: 30px;
  display: block;
  height: 30px;
}
.musicMenu-midd-two{
  margin:30px 0;
  width:100%;
  min-height:60px;
  display: flex;
  justify-content: space-around;
}
.musicMenu-midd-two>div{
  width: 10%;
}

.musicMenu-midd-two>div span{
  font-weight: lighter;
  text-align: center;
  display: block;
}
.musicMenu-midd-icon {
  font-size:30xp;
}
.musicMenu-bottom{
  position:absolute;
  background-color:white;
  width:100%;
  top:300px;
  border-radius: 20px 20px 0 0;
}
.musicMenu-playlist{
  margin: 5px 10px;
  display: flex;
  justify-content: space-between; 
}
.musicMenu-playlist-play{
  height: 40px;
  width: 200px;
}
.musicMenu-playlist-play{
  line-height: 40px;
}
.musicMenu-playlist-play :nth-child(1){
  display: inline-block;
  width: 20px;
  height: 40px;
}
.musicMenu-playlist-play :nth-child(2){
  display: inline-block;
  font-size:18px;
   height: 40px;
}
.musicMenu-playlist-play :nth-child(3){
  display: inline-block;
  font-size:12px;
   height: 40px;
}
.musicMenu-playlist-collect{
  background-color: red;
  padding: 5px;
  height: 30px;
  display: flex;
  border-radius: 30px;
}
.musicMenu-playlist-collect>span{
  margin-left: 3px;
  line-height: 30px;
  color:white;
  font-weight: lighter; 
  display: block;
  height: 30px;
}
.musicMenu-playlist-collect>span:nth-child(1){
  font-size: 20px;
}
.musicMenu-playlist-collect>span:nth-child(2){
  font-size: 12px;
}
.musicMenu-playlist-collect>span:nth-child(3){
  font-size: 12px;
  padding-right:5px;
}


.musicMenu-musiclist{
  width: 100%;
  margin: 20px 0 ;
}
.musicMenu-musiclist-ul{
  width: 100%;
  margin:0; 
  padding:0;

}
.musicMenu-musiclist-li{
  display: flex;
}
.songcolors{
  color:red;
}
.musicMenu-musiclist-index{
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height:40px;
  text-align: center;
}
.musicMenu-musiclist-song{
  font-size: 15px;
  display: inline-block;
  width:90%;
  border-bottom:1px solid lightgray;
}
.musicMenu-musiclist-song-name{
  width: 300px;
  font-size:15px;

  overflow:hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*限制在一个块元素显示的文本的行数*/
  -webkit-box-orient: vertical;
  text-overflow:ellipsis;
}
.musicMenu-musiclist-song-author{
  font-size: 9px;

  overflow:hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*限制在一个块元素显示的文本的行数*/
  -webkit-box-orient: vertical;
  text-overflow:ellipsis;
}
.musicMenu-musiclist-song-menu{
  width: 30px;
  line-height: 40px;
}
.musicMenu-musiclist-song-menu-dian{
  color:black;
}
</style>
