<template>
  <transition name="fade">
    <div class="musicplay" v-show='musicplayshow'>

  	  <div class="musicplay-top">
      <span  class="musicplay-top-back iconfont icon-houtui" @click='musicplaygoback()'></span>
      <div  class="musicplay-top-song">
        <p class="musicplay-top-song-name" >{{singlemusic.name}}</p>
        <p class="musicplay-top-song-author">{{singlemusic.ar[0].name}}</p>
      </div>
      <div class="musicplay-top-song-share">
        <span class="iconfont icon-fenxiang"></span>
      </div>
      </div>

      <div class='musicplay-middle-out'>
      <div class="musicplay-middle">
        <img class="musicplay-middle-top" :class="{'micr':micron}" src='../../../static/play-img/microphone.png'>
        <div class="musicplay-middle-bottom">

          <div class="musicplay-middle-bottom-out">
            <img class="musicplay-middle-bottom-out-in" src='../../../static/play-img/record.png'>         
          </div>

          <img class="musicplay-middle-bottom-in" :class="{'songimg':imgon}" :src='singlemusic.al.picUrl'>
        </div>
      </div>
      </div>


      <div class="musicplay-control">
      <div class="musicplay-control-all">
        <div class='musicplay-control-top'>
          <span class="musicplay-btn iconfont icon-shoucang1"></span>
          <span class="musicplay-btn iconfont icon-xiazai"></span>
          <span class="musicplay-btn iconfont icon-erji"></span>
          <span class="musicplay-btn iconfont icon-pinglun2"></span>
          <span class="musicplay-btn iconfont icon-icon-1 "></span>
        </div>
        <div class='musicplay-control-middle'>
          <div class='musicplay-control-middle-currenttime'>
            <span>{{currentTime}}</span>
          </div>
          <div class="musicplay-control-middle-bar" ref='bar'>
            <div class="musicplay-control-middle-bar-current" ref='bar2'></div>
          </div>
          <div class='musicplay-control-middle-durationtime'>
            <span>{{duration}}</span>
          </div>
        </div>
        <div class='musicplay-control-bottom'>
          <span class="musicplay-btn iconfont icon-yinlemoshi"></span>
          <span @click='prve()' class="musicplay-btn iconfont icon-shangyiqu101"></span>
          <span @click='play()' class="musicplay-btn musicplay-play iconfont" :class="{'icon-bofang':!toggleflag,'icon-zanting':toggleflag}"></span>
          <span @click='next()' class="musicplay-btn iconfont icon-xiayiqu101 "></span>
          <span class="musicplay-btn iconfont icon-yinlemoshi"></span>
        </div>
      </div> 
      </div>
      <audio ref="audio" @timeupdate="getTimes()" :src="music.url" id="audio"></audio>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters([
      'singlemusic',
      'toggleflag',
      'songlist',
      'currentIndex'
    ])
  },
  data () {
    return {
      musicplayshow:false,
      music:'',
      micron:false,
      imgon:false,
      currentTime:'00:00',
      duration:''
    }
  },
  methods:{
    getsong(item) {
      this.axios.get('http://39.108.80.64:3000/song/url?id=' + item.id).then((res) => {
        this.music = res.data.data[0];
        this.$nextTick(() => {
          this.$refs.audio.play();
          this.$refs.audio.volume = .1;
        });
      });
    },
    musicplaygoback(){ 
      this.musicplayshow = false;
    },

    prve(){
      if(this.currentIndex === 0){
        var currentIndex = this.songlist.length-1
      }else{
        var currentIndex = this.currentIndex - 1
      } 
      this.$store.commit('getcurrentIndex',currentIndex)
      console.log(this.currentIndex)
      this.$store.commit('getsinglemusic',this.songlist[this.currentIndex])
      this.getsong(this.singlemusic)

      this.$store.commit('settoggleflag', false);
      this.play();
    },
    play(){
      console.log(this.singlemusic)
      if (!this.toggleflag) {
        //音乐开始
        this.$refs.audio.play();
        //卡槽进入
        this.micron = false
        //碟片转动
        this.imgon = false
        this.$store.commit('settoggleflag',true)
      } else {
        //音乐暂停
        this.$refs.audio.pause();
        //卡槽离开
        this.micron = true
        //碟片停止
        this.imgon = true
        this.$store.commit('settoggleflag',false)
      }
    },
    next(){
      if(this.currentIndex === 27){
        var currentIndex = 0
      }else{
        var currentIndex = this.currentIndex + 1
      } 
      this.$store.commit('getcurrentIndex',currentIndex)
      console.log(this.currentIndex)
      this.$store.commit('getsinglemusic',this.songlist[this.currentIndex])
      this.getsong(this.singlemusic)

      this.$store.commit('settoggleflag', false);
      this.play();
    },
    getTimes(){
      let time =  this.$refs.audio.currentTime
      let munite = this.addZero(Math.floor(time / 60));
      let second = this.addZero(Math.floor(time % 60));
      this.currentTime = munite + ':' + second;

      let totaltime =  this.$refs.audio.duration
      let totalmunite = this.addZero(Math.floor(totaltime / 60));
      let totalsecond = this.addZero(Math.floor(totaltime % 60));
      this.duration = totalmunite + ':' + totalsecond;
    },
    addZero(value){
      if(!value){
        return '00';
      }
      return value > 9 ? value : '0' + value;
    }
  },
  watch:{
    currentTime(){
      let lenth = this.$refs.audio.duration
      let cur =this.$refs.audio.currentTime
      this.$refs.bar2.style.width= parseFloat(cur/lenth)*this.$refs.bar.offsetWidth+'px'
      if(cur>=lenth){
        this.next()
      }

    }
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




.musicplay{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width: 100%;
  height: 100%;
  background:black;
}
.musicplay-top{
  padding-top: 8px;
  display: flex;
  z-index: 99;
  background-color: black;
  color:white;
  width: 100%;
}
.musicplay-top-back{
  display: inline-block;
  width: 10%;
  height: 40px;
  line-height:40px;
  text-align: center;
}
.musicplay-top-song{
  font-size: 15px;
  display: inline-block;
  width:80%;
}
.musicplay-top-song-name{
  width: 300px;
}
.musicplay-top-song-author{
  font-size: 12px;

}
.musicplay-top-song-share{
  width: 10%;
  text-align: center;
  line-height: 40px;
}


.musicplay-middle-out{
  width: 100%;
  background-color: black;
}
.musicplay-middle{
  width: 70%;
  margin:0 auto;
  position: relative;
  overflow: hidden;
}
.musicplay-middle-top{
  position: absolute;
  height: 140px;
  left:40%;
  top:-16px;
  display: block;
  z-index:30;
  transform: rotate(0deg);
  transform-origin: 17.39% 11.59%;
  transition: all .5s;
}

.micr{
  transform: rotate(-26deg);
  transform-origin: 17.39% 11.59%;
  transition: all .5s;
}
.musicplay-middle-bottom{
  display: inline-block;
  position: relative;
  width: 100%;
  margin: 70px auto 0; 
}
.musicplay-middle-bottom-out{
  margin:0 auto;
  width: 100%;
  height: 100%;
  z-index: 20;
  max-width: 400px;
  max-height: 400px;

}
.musicplay-middle-bottom-out-in{
  width: 100%;
  display: block;
  z-index:20 ;
  position:relative;
}
.musicplay-middle-bottom-in{
  position: absolute;
  width: 70%;
  z-index: 1;
  top:0;
  left: 0;
  right: 0;
  bottom:0;
  margin:auto; 
  border-radius: 50%;
  max-width: 400px;
  max-height: 400px;



  animation:myfirst 10s linear 2s infinite normal;
    -moz-animation:myfirst 10s linear 2s infinite normal; /* Firefox */
    -webkit-animation:myfirst 10s linear 2s infinite normal; /* Safari and Chrome */
    -o-animation:myfirst 10s linear 2s infinite normal; /* Opera */
    }
    
    @keyframes myfirst
    {
      from {transform: rotate(0deg)}
      to {transform: rotate(360deg)}
    }
    
    @-moz-keyframes myfirst /* Firefox */
    {
      from {transform: rotate(0deg)}
      to {transform: rotate(360deg)}
    }
    
    @-webkit-keyframes myfirst /* Safari and Chrome */
    {
        from {transform: rotate(0deg)}
      to {transform: rotate(360deg)}
    }
    
    @-o-keyframes myfirst /* Opera */
    {
      from {transform: rotate(0deg)}
      to {transform: rotate(360deg)}
    }

.songimg{
  animation-play-state:paused;
}
.musicplay-control{
  position: absolute;
  bottom:0;
  width: 100%;
  color:white;
}
.musicplay-control-all{
  width: 90%;
  margin:0 auto; 
  display: flex;
  flex-flow: column;
}
.musicplay-control-top,.musicplay-control-bottom{
  display: flex;
  margin:15px 0; 
  justify-content: space-between;
  height:40px;
  line-height:40px;
}
.musicplay-btn{
  font-size:20px;
}
.musicplay-control-middle{
  display: flex;
  justify-content: space-between;
}
.musicplay-control-middle span{
  font-size:12px;
}
.musicplay-control-middle-currenttime,.musicplay-control-middle-durationtime{
  line-height:100%;
  text-align:center;
}
.musicplay-control-middle-bar{
  width: 60%;
  margin:auto 0;
  vertical-align: middle;
  height: 2px;
  background-color: white;
}
.musicplay-control-middle-bar-current{
  height: 2px;
  background-color: red;
}
.iconfont{
  color:white;
}
.musicplay-play{
  font-size:50px;
}
</style>
