import Axios from "axios";

export function initialize(router, store){
    //check user login info
    router.beforeEach((to, form, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store.state.currentUser;

        if(requiresAuth && !currentUser ){
            next('/login')
        }else if(to.path == '/login' && currentUser ){
            next('/')
        }else{
            next()
        }
    })

    // if jwt response problem
    Axios.interceptors.response.use(null, (error) => {
        if(error.response.status == 401){
            store.commit('logout')
            router.push('/login')
        }

        return Promise.reject(error);
    })


    // set headers common
    Axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.currentUser.token}`
}