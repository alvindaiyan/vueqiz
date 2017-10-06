import Vue from 'vue';
import Router from 'vue-router';
import Questions from '@/components/Questions';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Questions',
      component: Questions,
    },
  ],
});
