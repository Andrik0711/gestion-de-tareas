import axios from 'axios';

import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    tasks: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const response = await axios.get("/tasks");
      commit("setTasks", response.data);
    },
    async addTask({ commit }, task) {
      const response = await axios.post("/tasks", task);
      commit("addTask", response.data);
    },
    async updateTask({ commit }, task) {
      const response = await axios.put(`/tasks/${task.id}`, task);
      commit("updateTask", response.data);
    },
    async deleteTask({ commit }, taskId) {
      await axios.delete(`/tasks/${taskId}`);
      commit("deleteTask", taskId);
    },
    async toggleTaskStatus({ commit }, task) {
      const response = await axios.patch(`/tasks/${task.id}/toggle`);
      commit("updateTask", response.data);
    },
  },
});
