import Vue from 'vue'
import VueRouter from 'vue-router'
const LogIn = () => import('../pages/login.vue');
const register = () => import('../pages/register.vue');
const recipes = () => import('../pages/recipes.vue');

Vue.use(VueRouter)

const Routes = [
    {
        alias: "/",
        path: "/login",
        component: LogIn,
        name: "LogIn",
        meta: {
            requiresAuth: false
        }
    },

    {
        path: "/register",
        component: register,
        name: "register",
        meta: {
            requiresAuth: false
        }
    },

    {
        path: "/Recipes",
        component: recipes,
        name: "Recipes",
        meta: {
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    routes: Routes,
    mode: "history"
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let isLogin = localStorage.getItem('isLogin') == null ? false : localStorage.getItem('isLogin') == 'false'? false : true;
        if (!isLogin) {
            next({ name: "LogIn" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;