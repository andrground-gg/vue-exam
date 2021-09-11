<template>
  <div v-if="task" class="card">
    <h2>{{task.title}}</h2>
    <p><strong>Status</strong>: <Status :type=task.status /></p>
    <p><strong>Deadline</strong>: {{task.deadline}}</p>
    <p><strong>Description</strong>: {{task.description}}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')">Start</button>
      <button class="btn primary" @click="changeStatus('done')">Done</button>
      <button class="btn danger" @click="changeStatus('cancelled')">Cancel</button>
    </div>
  </div>
  <h3 v-else class="text-white center">
    There is no task with such id <strong>{{taskId}}</strong>.
  </h3>
</template>

<script>
import Status from '../components/Status'
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
  props: {
    taskId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();

    let task = computed(() => {
      return store.getters.tasks.find(t => t.id === props.taskId);
    });
    const changeStatus = (status) => {
      task.value.status = status;
      store.dispatch('changeTaskStatus', {taskId: task.value.id, status});
    }

    return {
      task,
      changeStatus
    }
  },
  components: {
    Status
  }
}
</script>

<style scoped>

</style>
