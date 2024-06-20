<template>
    <div>
        <h3 :class="{ completed: task.status === 'completed' }">{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <button @click="toggleStatus">Toggle Status</button>
        <button @click="deleteTask">Delete</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        task: Object,
    },
    methods: {
        ...mapActions(['toggleTaskStatus', 'deleteTask']),
        async toggleStatus() {
            await this.toggleTaskStatus(this.task);
            this.$emit('taskUpdated');
        },
        async deleteTask() {
            await this.deleteTask(this.task.id);
            this.$emit('taskDeleted');
        },
    },
};
</script>

<style scoped>
.completed {
    text-decoration: line-through;
}
</style>
