<template>
  <Navbar></Navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import {useStore} from 'vuex';
import {onBeforeMount} from 'vue';
export default {
  setup() {
    const store = useStore();

    onBeforeMount(()=> {
      store.dispatch('getTasks');
    });
  },
  components: {
    Navbar
  }
}
</script>

<style>

</style>
