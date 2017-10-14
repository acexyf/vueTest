

<template>
  <div class="hello">
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
import fetch from '../../utils/fetch.js'

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
