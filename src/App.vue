<template>
  <div id="app">
    <div class="head">
      <div class="head-btns">
        <div class='head-btn'><span class="iconfont icon-icon-1"></span></div>
      </div>

      <div class="head-btns">
        <router-link  to='/mine' class='head-btn'>我的</router-link>
        <router-link  to='/find' class='head-btn'>发现</router-link>
        <router-link  to='/friends' class='head-btn'>朋友</router-link>
        <router-link  to='/musicplay' class='head-btn'>视频</router-link>
      </div>
      <div class="head-btns">
        <router-link to='/login' class='head-btn'><span class='iconfont icon-sousuo'></span></router-link>
      </div>
    </div>
   <transition name='one'>
    <router-view/>
  </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
  }
};
</script>

<style >
.one-enter {
  opacity: 0;
  transform: translateX(100%);
}

.one-leave-to {
  opacity: 0;
  transform: translateX(-100%); 
  position: absolute;
}

.one-enter-active,
.one-leave-active {
  transition: all 0.5s ease;
}

#app{
  overflow-x: hidden;
}




*{
  margin: 0;
  padding: 0;
}
.head{
  overflow-x: hidden;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  height:50px;
  background-color: white;
  z-index: 99;
}
.head-btns{
  padding: 5px;
  line-height: 40px;
}
.head-btn{
  padding:0 5px;
  text-decoration: none;
  color:black;
  font-size: 16px;
}
.icon-icon-1{
  font-size:20px;
  color:black;
}
.icon-sousuo{
  font-size:20px;
  color:black;
}
</style>
