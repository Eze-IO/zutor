import { createStore } from 'vuex';
import auth from './modules/auth';
import student from './modules/student';
import session from './modules/session';

// Create store
export default createStore({
  modules: {
    auth,
    student,
    session
  }
});
