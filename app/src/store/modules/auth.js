import axios from 'axios';
import { API_URL as url } from '../../api';

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user : localStorage.getItem('user') || {}
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  getToken: state => state.token
};

// Shared by login and register: store the session and update state
function startSession(commit, resp) {
  const token = resp.data.token;
  const user = JSON.stringify(resp.data.user);
  localStorage.setItem('user', user);
  localStorage.setItem('student', user);
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = token;
  commit('auth_success', { token, user });
  commit('setStudent', user);
}

function errorMessage(err) {
  return err.response?.data?.['Message'] || err.message || 'Something went wrong';
}

const actions = {
  login({commit}, user){
    commit('auth_request', 'loading');
    return axios({url: url+'/login', data: user, method: 'POST' })
      .then(resp => {
        startSession(commit, resp);
        return resp;
      })
      .catch(err => {
        localStorage.removeItem('token');
        commit('auth_request', 'error');
        throw errorMessage(err);
      });
  },
  register({commit}, user){
    commit('auth_request', 'loading');
    return axios({url: url+'/register', data: user, method: 'POST' })
      .then(resp => {
        startSession(commit, resp);
        return resp;
      })
      .catch(err => {
        localStorage.removeItem('token');
        commit('auth_request', 'error');
        throw errorMessage(err);
      });
  },
  logout({commit}){
    localStorage.removeItem('user');
    localStorage.removeItem('student');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    commit('auth_logout');
    commit('setStudent', '');
    return Promise.resolve(true);
  }
};

const mutations = {
  auth_request: (state, status) => state.status = status,
  auth_success: (state, { token, user }) => {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  auth_logout: (state) => {
    state.status = 'none';
    state.token = '';
    state.user = {};
  }
};

export { errorMessage };

export default {
  state,
  getters,
  actions,
  mutations
}
