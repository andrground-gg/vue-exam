<template>
  <span 
    :class="['badge', {
      'info': type === 'active',
      'primary': type === 'done',
      'danger': type === 'cancelled',
      'warning': type === 'pending'
    }]"
  >{{text}}</span>
</template>

<script>
import {computed} from 'vue';

export default {
  props: {
    type: {
      type: String,
      required: true,
      default: 'active',
      validator: function(val) {
        return ['active', 'done', 'cancelled', 'pending'].includes(val);
      }
    }
  },
  setup(props) {
    const text = computed(() => {
      let temp;
      switch(props.type) {
        case 'active': temp = 'Active'; break;
        case 'done': temp = 'Done'; break;
        case 'cancelled': temp = 'Cancelled'; break;
        case 'pending': temp = 'In progress'; break;
      }
      return temp;
    });

    return {
      text
    }
  },
}
</script>

