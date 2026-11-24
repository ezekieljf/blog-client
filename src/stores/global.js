import { defineStore } from 'pinia';
import { reactive } from 'vue';

import api from '../api';

export const useGlobalStore = defineStore('global',() => {
    
    let user = reactive({
        token: localStorage.getItem('token'), 
        email: null,
        username: null,
        isAdmin: null,
        id: null
    })

    async function getUserDetails(token) {
        if(!token) {
            user.token = null;
            user.email = null;
            user.username = null;
            user.isAdmin = null;
            user.id = null;

            return;
        }

        let {data} = await api.get('/users/details');
        user.token = token;
        user.email = data.email;
        user.username = data.username;
        user.isAdmin = data.isAdmin;
        user.id = data._id;
    }

    return {
        user,
        getUserDetails
    }
})