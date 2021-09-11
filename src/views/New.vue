<template>
  <form class="card" @submit.prevent="createTask">
    <h1>Create new task</h1>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" v-model.trim="title">
    </div>

    <div class="form-control">
      <label for="date">Deadline</label>
      <input type="date" id="date" v-model.trim="deadline">
    </div>

    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" v-model.trim="description"></textarea>
    </div>

    <button
      :disabled="!isValid()"
      class="btn primary" 
      type="submit"
    >Create</button>
  </form>
</template>

<script>
  import {ref} from 'vue';
  import {useStore} from 'vuex';
  import {useRouter} from 'vue-router';

  export default {
    name: 'New',
    setup() {
      const store = useStore();
      const router = useRouter();

      const title = ref(''); 
      const deadline = ref(''); 
      const description = ref(''); 
 
      const isValid = () => {
        return title.value !== '' && 
               deadline.value !== '' && 
               description.value !== '';
      }

      const createTask = () => {
        const task = {
          title: title.value,
          deadline: deadline.value,
          description: description.value,
          status: 'active'
        }

        let currentDate = new Date(Date.now());
        currentDate.setHours(0, 0, 0, 0);
        if (Date.parse(task.deadline) < currentDate)
          task.status = 'cancelled';

        
        store.dispatch('addNewTask', task);

        router.push('/');
      }

      return {
        title,
        deadline,
        description,
        createTask,
        isValid
      }
    }
  }
</script>
