import axios from 'axios';
import { API_URL as url } from '../../api';
import { errorMessage } from './auth';

const state = {
  sessions: []
};

const getters = {
  allSessions: state => state.sessions,
  // rootGetters gives access to the student module's currentStudent
  userSessions: (state, _getters, _rootState, rootGetters) =>
    state.sessions.filter(session => session.student_id == rootGetters.currentStudent._id)
};

const actions = {
  getSessions({ commit }){
    return axios({url: url+'/session', method: 'GET' })
      .then(resp => {
        commit('setSessions', resp.data);
        return resp;
      })
      .catch(err => { throw errorMessage(err); });
  },
  addSession({ dispatch }, session){
    return axios({url: url+'/session', data: session, method: 'POST' })
      .then(resp => dispatch('getSessions').then(() => resp))
      .catch(err => { throw errorMessage(err); });
  },
  updateSession({ commit }, session) {
    return axios({url: url+`/session/${session._id}`, data: session, method: 'PUT' })
      .then(resp => {
        commit('updateSession', session);
        return resp;
      })
      .catch(err => { throw errorMessage(err); });
  },
  deleteSession({ commit }, id) {
    return axios({url: url+`/session/${id}`, method: 'DELETE' })
      .then(resp => {
        commit('removeSession', id);
        return resp;
      })
      .catch(err => { throw errorMessage(err); });
  }
};

const mutations = {
  setSessions: (state, sessions) => (state.sessions = sessions),
  updateSession: (state, _session) => {
    const index = state.sessions.findIndex(session => session._id === _session._id);
    if(index !== -1){
      state.sessions.splice(index, 1, _session);
    }
  },
  removeSession: (state, id) => state.sessions = state.sessions.filter(session => session._id !== id),
};

export default {
  state,
  getters,
  actions,
  mutations
}
