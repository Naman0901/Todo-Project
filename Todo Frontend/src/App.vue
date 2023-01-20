<template>
  <div class>
     <router-view></router-view>
  </div>
</template>

<script>
import ToDos from "./components/ToDos.vue";
import Addto from "./components/Addtodo.vue";
import Header from "./components/header.vue";
import Login from "./components/login.vue";

export default {
  components: {
    'todo': ToDos,
    "addto": Addto,
    'app-header': Header,
    'login': Login
  },
  data() {
    return {
      title: "Todo App",
      user:{}
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>
</style>
 