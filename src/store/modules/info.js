import jwtInterceptor  from '../../shared/jwtInterceptor';
import { API_URL } from '../../.env';

const state = () => ({
    info :[]
});

const getters = {
    getAllInfo(state){
        return state.info;
    }
};

const actions = {
    async getAllInfo({commit}){
        var response = await jwtInterceptor.get(`${API_URL}/api/profile/info/`);
        if(response && response.data){
            commit('setInfo', response.data);
        }
    }
};

const mutations = {
    setInfo(state, payload){
        state.info = payload
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}