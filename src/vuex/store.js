import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
    	musicInfo:{},
    	songlist:{},
    	singlemusic:{},
    	currentIndex:'',
    	toggleflag:true,

  },
  getters:{
  	musicInfo: state => state.musicInfo,
  	songlist:(state)=>state.songlist,
  	singlemusic:(state)=>state.singlemusic,
  	toggleflag:(state)=>state.toggleflag,
  	currentIndex:(state)=>state.currentIndex
  },
  mutations: {
  	getmusicInfo(state,item){
  		state.musicInfo = item
  	},
    getsonglist (state,item) {
      state.songlist = item
    },
    getsinglemusic(state,item){
    	state.singlemusic = item
    },
    settoggleflag(state,tog){
    	state.toggleflag = tog
    },
    getcurrentIndex(state,index){
    	state.currentIndex = index
    }
  }
})