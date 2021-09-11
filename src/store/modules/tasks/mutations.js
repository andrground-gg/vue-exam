export default {
  addTask(state, payload) {
    state.tasks.push(payload);
  },
  setTasks(state, payload) {
    state.tasks = Object.keys(payload).map(key => {
      return {
        id: key,
        ...payload[key]
      };
    });
  },
  spliceTask(state, taskId) {
    state.tasks.splice(taskId, 1);
  }
}