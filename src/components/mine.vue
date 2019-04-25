<template>
  <div class="mine">
    <div class='redButton'>
      <ul class='redButton-ul'>
        <li class='redButton-li'>
          <span class='redButton-li-top'></span>
          <span class='redButton-li-wenzi'>私人FM</span>
        </li>
        <li class='redButton-li'>
          <span class='redButton-li-top'></span>
          <span class='redButton-li-wenzi'>私人FM</span>
        </li>
        <li class='redButton-li'>
          <span class='redButton-li-top'></span>
          <span class='redButton-li-wenzi'>私人FM</span>
        </li>
        <li class='redButton-li'>
          <span class='redButton-li-top'></span>
          <span class='redButton-li-wenzi'>私人FM</span>
        </li>
        <li class='redButton-li'>
          <span class='redButton-li-top'></span>
          <span class='redButton-li-wenzi'>私人FM</span>
        </li>
      </ul>
    </div>
    <div class='userInfo'>
      <ul class='user-ul'>
        <li class='user-li'>
          <span></span>
          <div class='userContent'>          
            <span>本地音乐</span>
            <span>(2)</span>
          </div>
        </li>
        <li class='user-li'>
          <span></span>
          <span>本地音乐</span>
          <span>(2)</span>
        </li>
      </ul>
    </div>
    <div class='creatMusicList'></div>
    <div class='recommendMusicList'></div>
  </div>
</template>

<script>
export default {  
  data () {
    return {
      
    }
  }
};
</script>

<style scoped>
  .mine{
    padding-top: 50px;
  }
  .redButton{
    overflow:scroll;
  }
  .redButton-ul{
    display:flex;
    padding:10px;
    list-style-type:none;
  }
  .redButton-li{
    width:70px;
    height:90px;
    padding: 0 10px;
  }
  .redButton-li-top{
    display:block;
    width:70px;
    height:70px;
    background-color:red;
    border-radius:50%;
  }
  .redButton-li-wenzi{
    display:block;
    text-align:center;
  }



  .userInfo{
    border-top:1px solid lightgray;
    width:100%;
    padding-left:20px;
  }
  .user-ul{
    list-style-type:none;
  }
  .user-li{
    padding: 10px 0;
    display:flex;
    height:40px;
  }
  .user-li span{
    line-height:40px;
  }
  .user-li>span:nth-child(1){
    possition:absolute;
    top:40px;
    width:30px;
    height:30px;
    background-color:red;
    border-radius:50%;
  }
  .userContent{
    width:90%;
    border-bottom:1px solid lightgray;
  }
</style>
