<template>
    <div>
        <task-form @taskAdded="fetchTasks" />
        <task-item
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @taskUpdated="fetchTasks"
            @taskDeleted="fetchTasks"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TaskForm from './TaskForm.vue';
import TaskItem from './TaskItem.vue';

export default {
    components: { TaskForm, TaskItem },
    computed: {
        ...mapState(['tasks']),
    },
    methods: {
        ...mapActions(['fetchTasks']),
    },
    created() {
        this.fetchTasks();
    },
};
</script>
