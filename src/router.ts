import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Home.vue';
import Award from './views/index.vue' ;
Vue.use(Router);
export default new Router({
    routes: [{
        path: '/', name: 'Index', component: Index,
    },],
});
