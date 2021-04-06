import Vue from 'vue'
import Router from 'vue-router'
import film from '../components/film'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'file',
      component: film
    }
  ]
})
