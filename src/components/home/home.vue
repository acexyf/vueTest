

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2 @click="handleClick">Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <card :header="{title:'我的钱包'}"/>
    <Children :msgs="msgs" @changeMsgs="changeMsgs" />
    <div @click="goDetail">去详情页</div>

    <p>{{test}}</p>
    <p v-text="test"></p>

  </div>
</template>

<script>

import { Alert,Card } from 'vux'
import Children from './Children.vue'


export default {
  components: { Card,Children,Alert },
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      test: 'ceshices',
      msgs: '给子组件的数据'
    }
  },
  mounted: function () {

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
        this.$router.push({ path: '/baoxian/detail/123?platform=3'})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
