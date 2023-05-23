import { createRouter, createWebHistory } from 'vue-router'
import RecipesView from '@/views/recipes/RecipesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        // layout: "default-layout",
      },
      component: RecipesView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/recipes/RecipeView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // check SESSION
  // check if auth & have access

  next();
});

export default router
