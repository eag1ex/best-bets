/**
 * this is our main router which imports each out our page components
 */

import Vue from 'vue'
import Router from 'vue-router'

import Page404 from '../pages/404/404Page'
import SportsBooksPage from '../pages/sportsbooks/SportsBooksPage'
console.log('process.env.publicPath', process.env.publicPath)
Vue.use(Router)
export const router = new Router({
    ...(process.env.publicPath ? { base: process.env.publicPath } : {}),
    mode: 'history',
    routes: [
        { path: '/sportsbooks', component: SportsBooksPage },
        { path: '/404', component: Page404 },

        // otherwise redirect to home
        { path: '/', redirect: '/sportsbooks' },
        { path: '/home', redirect: '/sportsbooks' },
        { path: '*', redirect: '/404' }
    ]
})

// set authentication, logic before each route
router.beforeEach((to, from, next) => {
    next()
})
