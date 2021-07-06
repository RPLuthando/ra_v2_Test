import Vue from 'vue'
import VueRouter from 'vue-router'
/* import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils' */

import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Dashboard',
        breadcrumb: [
          {
            text: 'Dashboard',
            active: true,
          },
        ],
      },
    },
    /* {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    }, */
    {
      path: '/survey-admin',
      name: 'survey-admin',
      component: () => import('@/views/survey/SurveyAdmin.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Survey Admin',
        breadcrumb: [
          {
            text: 'Survey Admin',
            active: true,
          },
        ],
      },
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: () => import('@/views/user/CreateUser.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Create User',
        breadcrumb: [
          {
            text: 'Create User',
            active: true,
          },
        ],
      },
    },
    {
      path: '/edit-user/:id',
      name: 'edit-user',
      component: () => import('@/views/user/EditUser.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Edit User',
        breadcrumb: [
          {
            text: 'Edit User',
            active: true,
          },
        ],
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/user/UserList.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'User',
        breadcrumb: [
          {
            text: 'User',
            active: true,
          },
        ],
      },
    },
    {
      path: '/create-group',
      name: 'create-group',
      component: () => import('@/views/group/CreateGroup.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Create Group',
        breadcrumb: [
          {
            text: 'Create Group',
            active: true,
          },
        ],
      },
    },
    {
      path: '/edit-group/:id',
      name: 'edit-group',
      component: () => import('@/views/group/EditGroup.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Edit Group',
        breadcrumb: [
          {
            text: 'Edit Group',
            active: true,
          },
        ],
      },
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/group/ListGroups.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Groups',
        breadcrumb: [
          {
            text: 'Groups',
            active: true,
          },
        ],
      },
    },
    {
      path: '/group-permissions',
      name: 'group-permissions',
      component: () => import('@/views/user/GroupPermissions.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Group Permissions',
        breadcrumb: [
          {
            text: 'Group Permissions',
            active: true,
          },
        ],
      },
    },
    {
      path: '/user-permissions',
      name: 'user-permissions',
      component: () => import('@/views/user/UserPermissions.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'User Permissions',
        breadcrumb: [
          {
            text: 'User Permissions',
            active: true,
          },
        ],
      },
    },
    {
      path: '/organogram',
      name: 'organogram',
      component: () => import('@/views/user/Organogram.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Organogram',
        breadcrumb: [
          {
            text: 'Organogram',
            active: true,
          },
        ],
      },
    },
    {
      path: '/survey',
      name: 'survey',
      component: () => import('@/views/survey/SurveyView.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Survey',
        breadcrumb: [
          {
            text: 'Survey',
            active: true,
          },
        ],
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
      meta: {
        layout: 'full',
        pageTitle: 'Register',
        breadcrumb: [
          {
            text: 'Register',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        redirectIfLoggedIn: true,
        layout: 'full',
        pageTitle: 'Login',
        breadcrumb: [
          {
            text: 'Login',
            active: true,
          },
        ],
      },
    },
    {
      path: '/not-authorized',
      name: 'not-authorized',
      component: () => import('@/views/auth/NotAuthorized.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

/* router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'login' })

    // If logged in => not authorized
    return next({ name: 'not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const user = getUserData()
    next(getHomeRouteForLoggedInUser(user || null))
    console.log(user)
  }

  return next()
}) */

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
