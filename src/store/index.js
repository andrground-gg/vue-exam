import { createStore } from "vuex";
import tasksModule from './modules/tasks/index.js';

export default createStore({
  modules: {
    tasksModule
  }
});