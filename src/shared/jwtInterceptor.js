import axios from "axios";
import store from '../store/index';
import { API_URL } from '../.env';
const jwtInterceptor = axios.create({});


jwtInterceptor.interceptors.request.use(config => {

    const authData = store.getters['auth/getAuthData'];
    const isAuthenticated = store.getters['auth/isTokenActive'];
    if(isAuthenticated){
        config.headers.common["Authorization"] = `bearer ${authData.token}` ;
        return config;
    }
    else{
        const payload ={
            access_token: authData.token,
            refresh_token:authData.refresh_token
        };
        axios.post(`${API_URL}/api/profile/token/refresh/`,payload)
        .then(response => {
            console.log(response);
            store.commit('auth/saveTokenData',response.data);
            return jwtInterceptor(config);
        },error => {
            config.log(error);
            return jwtInterceptor(config);
        });
    }

});

export default jwtInterceptor;