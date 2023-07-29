// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'login',
          path: '/user/signup/verification',
          component: './user/AgentVerification',
        },
        {
          name: 'signup',
          path: '/user/signup',
          component: './user/signup',
        },
        {
          name: 'inviteUser',
          path: '/user/forgotpassword',
          component: './user/ForgotPassword',
        },
        {
          name: 'resetPassword',
          path: '/user/resetPassword',
          component: './user/ResetPassword',
        },
        // {
        //   name: 'inviteUser',
        //   path: '/user/invitation',
        //   component: './user/acceptInvitation',
        // },
      ],
    },
    // {
    //   path: '/privacy-policy',
    //   name: 'privacyPolicy',
    //   component: './Policy',
    // },
    // {
    //   name: 'registration',
    //   path: '/register',
    //   component: './Event/Register',
    //   hideInMenu: true,
    // },
    // {
    //   name: 'membership-plans',
    //   path: '/membership-plans',
    //   component: './MemberShipList',
    //   hideInMenu: true,
    // },
    // {
    //   name: 'add-exhibitor',
    //   path: 'exhibitor/add',
    //   component: './Event/Register',
    //   hideInMenu: true,
    // },
    {
      path: '/',
      component: '../layouts/UserLayout',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },

            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'BarChartOutlined',
              component: './dashboard',
            },
            {
              path: '/category',
              name: 'Category',
              icon: 'ApartmentOutlined',
              component: './Category',
            },
            {
              path: '/category/subcategory/:categoryId',
              name: 'Products',
              component: './Category/SubCategory',
              hideInMenu: true,
            },
            {
              path: '/productvariants',
              name: 'Product Variants',
              icon: 'dashboard',
              component: './ProductVariants',
            },

            {
              path: '/productvariants/productsubvariant/:id',
              name: 'ProductSubVariants',
              icon: 'dashboard',
              component: './ProductVariants/ProductSubVariant',
              hideInMenu: true,
            },
            // {
            //   path: '/category',
            //   name: 'Products',
            //   icon: 'dashboard',
            //   component: './Category',
            // },
            {
              path: '/product',
              name: 'Products',
              icon: 'ProfileOutlined',
              component: './Product',
            },

            {
              path: '/users',
              name: 'Users',
              icon: 'UsergroupAddOutlined',
              component: './users',
            },
            {
              path: '/userDetail/:id',
              name: 'UserDetail',
              icon: 'user',
              component: './UserDetail',
              hideInMenu: true,
            },
            {
              path: '/feedback',
              name: 'Feedback',
              icon: 'CommentOutlined',
              component: './feedback',
            },
            {
              path: '/contact',
              name: 'Contact Us',
              icon: 'ContactsOutlined',
              component: './contact',
            },

            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },

    {},
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
