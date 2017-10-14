import Vue from 'vue'
import Router from 'vue-router'

const Home = r => {
    require.ensure([], ()=>{
        r(require('@/components/Home/Home'))
    }, 'home')
}

const Detail = r => {
    require.ensure([], ()=>{
        r(require('@/components/Detail/Detail'))
    }, 'detail')
}

const routes = [{
    path: `/`,
    name: 'Home',
    component: Home
},
{
    path: `/detail/:id`,
    name: 'Detail',
    component: Detail
}]

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/baoxian/',
  routes
})
