import Vue from 'vue'
import VueRouter from 'vue-router'
import All from '../views/All.vue'
import Caldenar from '../views/Caldenar.vue'
import Calculate from '../views/Calculate.vue'
import Login from '../views/Login.vue'
import WebApp from '../views/WebApp.vue'
import ftLogin from '../components/Ft-login.vue'
import ftRegister from '../components/Ft-register.vue';
import Setting from '../views/Settings.vue'
import PersonalSettings from '../views/PersonalSettings.vue'
import OtherSettings from '../views/OtherSettings.vue'
import Feedback from '../views/Feedback.vue'
import Anniversary from '../views/Anniversaries.vue'
import NotFound from '../views/Ft-NotFound.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/webapp/all'
  },
  {
    path: "/webapp/:id",
    name: 'webapp',
    component: WebApp,
    children: [
      {
        path: '/webapp/caldenar',
        name: 'caldenar',
        component: Caldenar, meta: {
          title: '肥宅清单-日历'
        }
      },
      {
        path: "/webapp/all",
        name: 'all',
        component: All,
        meta: {
          title: '肥宅清单-所有'
        }
      },
      {
        path: "/webapp/calculate",
        name: 'calculate',
        component: Calculate,
        meta: {
          title: '肥宅清单-统计'
        }
      }, {
        path: '/webapp/anniversary',
        name: 'anniversary',
        component: Anniversary,
        meta: {
          title: '肥宅清单-纪念日'
        }
      }
    ]
  },
  {
    path: "/login",
    name: 'login',
    component: Login,
    children: [
      {
        path: '',
        name: '#login',
        component: ftLogin,
        meta: {
          title: '肥宅清单-登陆'
        }
      },
      {
        path: '/register',
        name: '#register',
        component: ftRegister,
        meta: {
          title: '肥宅清单-注册'
        }
      }
    ]
  },
  {
    path: "/webapp/settings/:names",
    name: 'settings',
    component: Setting,
    children: [
      {
        path: '/webapp/settings/personalSettings',
        name: 'personalSettings',
        component: PersonalSettings,
        meta: {
          title: '肥宅清单-个人设置'
        }
      }, {
        path: '/webapp/settings/othersettings',
        name: 'otherSettings',
        component: OtherSettings,
        meta: {
          title: '肥宅清单-其他设置'
        }
      }, {
        path: '/webapp/settings/feedback',
        name: 'feedback',
        component: Feedback,
        meta: {
          title: '肥宅清单-反馈'
        }
      }
    ]
  }, {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      title: '肥宅清单-抱歉，您要找的页面不存在'
    }
  }, {
    path: '*',
    redirect: '/404'
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
