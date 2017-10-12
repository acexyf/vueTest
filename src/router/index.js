import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home/home'
// import Detail from '@/components/detail/detail'

// const Home  = () => import('@/components/home/home')
// const Detail  = () => import('@/components/detail/detail')

const Home = r => {
    require.ensure([], ()=>{
        r(require('@/components/home/home'))
    }, 'home')
}

const Detail = r => {
    require.ensure([], ()=>{
        r(require('@/components/detail/detail'))
    }, 'detail')
}

Vue.use(Router)

const rootName = '/baoxian';

export default new Router({
	mode: 'history',
  	routes: [
		{
			path: `${rootName}`,
			name: 'Home',
			component: Home
		},
		{
			path: `${rootName}/detail/:id`,
			name: 'Detail',
			component: Detail
		}
  	]
})
