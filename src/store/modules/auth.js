import { jwtDecrypt, tokenAlive } from "../../shared/jwtHelper";
import axios from "axios";
import { API_URL } from '../../.env';
const state = () => ({
  authData: {
    token: "",
    refreshToken: "",
    tokenExp: "",
    email: "",
  },
  loginStatus: "",
});

const getters = {
  getLoginStatus(state) {
    return state.loginStatus;
  },
  getAuthData(state) {
    return state.authData;
  },
  isTokenActive(state) {
    if (!state.authData.tokenExp) {
      return false;
    }
    return tokenAlive(state.authData.tokenExp);
  },
};

const actions = {
  async login({ commit }, payload) {
    console.log(payload);
    const response = await axios
      .post(`${API_URL}/api/profile/login/`, payload)
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("saveTokenData", response.data);
      commit("setLoginStatu", "success");
    } else {
      commit("setLoginStatu", "failed");
    }
  },
};

const mutations = {
  saveTokenData(state, data) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    const jwtDecodedValue = jwtDecrypt(data.access_token);
    const newTokenData = {
      token: data.access_token,
      refreshToken: data.refresh_token,
      tokenExp: jwtDecodedValue.exp,
      email: jwtDecodedValue.email,
    };

    state.authData = newTokenData;
  },
  setLoginStatu(state, value) {
    state.loginStatus = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};