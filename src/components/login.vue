<template>
<transition name='login'>
<div v-show='showlogin'>
  <div class="logins" @click='getlogin()'></div>
  <div class='login-in'>
      
  </div>
</div>
</transition>
</template>

<script>
export default {
  data () {
    return {
      showlogin:false
    }
  },
  methods:{
    getlogin(){
      this.showlogin = false
    }
  }
};
</script>

<style scoped>
.login-enter-active,
  .login-leave-active {
    transition: all .2s ease-out;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .login-enter,
  .login-leave-active {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
	.logins{
    position:relative;
    z-index:999;
    width:100%;
    height:500px;
    background-color:black;
    display:flex;
    opacity:0.6;
	}
  .login-in{
    position:absolute;
    top:0;
    width:80%;
    height:500px;
    background-color:black;
    height:100%;
    z-index:99;
  }































  .login-out{
    width:20%;
    height:100px;
    background-color:green;
    opacity:0.3;
  }
</style>
