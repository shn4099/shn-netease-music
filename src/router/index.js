import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mine from '@/components/mine'
import find from '@/components/find'
import friends from '@/components/friends'
import video from '@/components/video'
import login from '@/components/login'
import musiclist from '@/components/musiclist/musiclist.vue'
import musicplay from '@/components/musicplay/musicplay.vue'

Vue.use(Router)

export default new Router({
  routes: [
  {path:'/',redirect:'/find'},
    {
      path: '/vue',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/find',
      name: 'find',
      component: find
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/musicplay',
      name: 'musicplay',
      component: musicplay
    },
  ]
})
