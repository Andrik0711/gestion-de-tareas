<template>
  <div>
      <form @submit.prevent="handleSubmit">
          <input v-model="title" placeholder="Title" required />
          <textarea v-model="description" placeholder="Description"></textarea>
          <button type="submit">Add Task</button>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
      return {
          title: '',
          description: '',
      };
  },
  methods: {
      ...mapActions(['addTask']),
      async handleSubmit() {
          await this.addTask({ title: this.title, description: this.description });
          this.title = '';
          this.description = '';
          this.$emit('taskAdded');
      },
  },
};
</script>
