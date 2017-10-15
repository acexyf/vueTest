

<template>
  <div class="hello">
    <card :header="{title:'我的钱包'}"/>
    <Children :msgs="msgs" @changeMsgs="changeMsgs" />
    <div @click="goDetail">去详情页</div>

    <p>{{test}}</p>
    <p v-text="test"></p>

    <p @click="show = !show">change show</p>
    <transition name="slide-fade">
      <p v-if="show">hello</p>
    </transition>

  </div>
</template>

<script>

import { Alert,Card } from 'vux'
import Children from './Children.vue'
import fetch from '../../utils/fetch.js'

export default {
  components: { Card,Children,Alert },
  name: 'Home',
  data () {
    return {
      show: true,
      msg: 'Welcome to Your Vue.js App',
      test: 'ceshices',
      msgs: '给子组件的数据'
    }
  },
  mounted: function () {
    fetch({
        url: '/baoxian/api/home',
        type: 'get'
    })
    .then((data)=>{
        console.log(data)
    })
  },
  methods: {
      handleClick(ev){
          console.log(123)
      },
      changeMsgs(data){
        console.log(data, 'changeMsgs parents');
        this.msgs = data;
      },
      goDetail(){
        console.log();
        this.$router.push({ path: '/detail/123?platform=3'})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fades-enter-active, .fades-leave-active {
  transition: opacity 8s
}
.fades-enter, .fades-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}



.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
