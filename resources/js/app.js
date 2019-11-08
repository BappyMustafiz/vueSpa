
require('./bootstrap');
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {routes} from './routes'
import StoreData from './store'
import MainApp from './components/MainApp.vue'
import {initialize} from './helpers/general'


Vue.use(Vuex)
Vue.use(VueRouter)


const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
});

initialize(router, store);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});
