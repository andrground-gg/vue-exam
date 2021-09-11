<template>
  <template v-if="tasks.length !== 0">
    <h3 class="text-white">Active tasks: {{activeTasks}}</h3>
    <div 
      v-for="task in tasks" 
      :key="task.id" 
      class="card"
    >
      <h2 class="card-title">
        {{task.title}}
        <Status :type=task.status />
      </h2>
      <p>
        <strong>
          <small>
            {{task.deadline}}
          </small>
        </strong>
      </p>
      <router-link :to="`/task/${task.id}`">
        <button class="btn primary">Open</button>
      </router-link>
      <button @click="removeTask(task.id)" class="btn danger">Remove</button>
    </div>
  </template>
  <h1 v-else class="text-white center">No tasks yet</h1>
</template>

<script>
import Status from '../components/Status'
import {useStore} from 'vuex';
import {computed} from 'vue';
export default {
  setup() {
    const store = useStore();

    let tasks = computed(() => {
      return store.getters.tasks;
    });
    const removeTask = (taskId) => {
      store.dispatch('removeTask', taskId);
    }

    return {
      tasks,
      activeTasks: computed(() => tasks.value.filter(t => t.status === 'active').length),
      removeTask
    }
  },
  components: {
    Status
  }
}
</script>
