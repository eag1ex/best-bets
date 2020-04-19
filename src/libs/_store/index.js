/**
 * exporting store to main root /index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { sportsBooksAction } from './sportsbooks.store'

Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        sportsBooksAction
    }
})
