import { createStore } from "vuex";
import authModule from './modules/auth';
import infoModule from './modules/info';

const store = createStore({
    modules:{
        auth:authModule,
        info: infoModule
    }
});

export default store;