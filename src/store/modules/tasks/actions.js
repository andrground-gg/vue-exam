const dbURL = 'https://vue-exam-e23fb-default-rtdb.europe-west1.firebasedatabase.app';

export default {
  async addNewTask(context, payload) {
    let response = await fetch(`${dbURL}/tasks.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    payload.id = data.name;

    context.commit('addTask', payload);
  },

  async getTasks(context) {
    const response = await fetch(`${dbURL}/tasks.json`);
    const data = await response.json();
    
    if (!data)
      return;

    context.commit('setTasks', data);
  },

  async changeTaskStatus(_, payload) {
    await fetch(`${dbURL}/tasks/${payload.taskId}/status.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.status)
    });
  },

  async removeTask(context, taskId) {
    context.commit('spliceTask', taskId);


    await fetch(`${dbURL}/tasks/${taskId}.json`, {
      method: 'DELETE'
    });
  }
}