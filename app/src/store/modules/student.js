import axios from 'axios';
import { API_URL as url } from '../../api';
import { errorMessage } from './auth';

const state = {
  // JSON string of the signed-in student, mirrored in localStorage
  student: localStorage.getItem('student') || ''
};

const getters = {
  currentStudent:(state) => {
    try{
      return JSON.parse(state.student)
    } catch {
      return {};
    }
  }
};

const actions = {
  getStudent(_, id) {
    return axios({url: url+`/student/${id}`, method: 'GET' })
      .then(resp => resp.data)
      .catch(err => { throw errorMessage(err); });
  },
  updateStudent({ commit }, student) {
    return axios({url: url+`/student/${student._id}`, data: student, method: 'PUT' })
      .then(resp => {
        const _student = JSON.stringify(resp.data);
        localStorage.setItem('student', _student);
        localStorage.setItem('user', _student);
        commit('setStudent', _student);
        return resp;
      })
      .catch(err => { throw errorMessage(err); });
  },
  deleteStudent({ commit }, id) {
    return axios({url: url+`/student/${id}`, method: 'DELETE' })
      .then(resp => {
        localStorage.removeItem('student');
        commit('setStudent', '');
        return resp;
      })
      .catch(err => { throw errorMessage(err); });
  },
};

const mutations = {
  setStudent: (state, student) => (state.student = student)
};

export default {
  state,
  getters,
  actions,
  mutations
}
