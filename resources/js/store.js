import { getLocalUser } from "./helpers/auth";
import Axios from "axios";

const user = getLocalUser(); 

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        authError: null,
        customers: []         
    },
    mutations: {
        login(state){
            state.loading = true;
            state.authError = null;
        },
        loginSuccess(state, payload){
            state.authError = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload){
            state.loading = false;
            state.authError = payload.error;
        },
        logout(state){
            localStorage.removeItem('user');
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        updateCustomers(state, payload){
            state.customers = payload
        }
    },
    actions: {
        login(context){
            context.commit('login');
        },
        getCustomers(context){
            Axios.get('/api/customers')
            .then((response) => {
                context.commit('updateCustomers', response.data.customers)
            })
        }
    },
    getters: {
        isLoading(state){
            return state.loading;
        },
        isLoggedIn(state){
            return state.isLoggedIn;
        },
        currentUser(state){
            return state.currentUser;
        },
        authError(state){
            return state.authError;
        },
        customers(state){
            return state.customers;
        }
    }
}