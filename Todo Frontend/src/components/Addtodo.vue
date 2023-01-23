<template>
  
  <div class="text-center">
    <app-header></app-header>
    <div class="addtodo">
      <h1>Add Task</h1> 
      <form @submit="add" class="form-group">
        <input type="text" v-model="task" class="form-control" placeholder="Enter Task" />
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
    <div class="table m-5 p-5">
      <h1>List of Task</h1>
      <table class="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Task</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr v-for="todo in todos" v-bind:key="todo.task_id">
          <td>{{todo.id}}</td>
          <td>{{todo.name}}</td>
          <td>{{todo.task}}</td>
          <td @click="id= todo.task_id">
            Edit
            <input type="text" v-if="id==todo.task_id" v-model="updateTask" />
            <button
              class="btn btn-primary"
              v-if="id==todo.task_id"
              @click="updatetodo(todo.task_id)"
            >Update</button>
          </td>
          <td @click="deleteTodo(todo.task_id)">delete</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Header from "./header.vue";

export default {
  components:{
    'app-header': Header
  },
  data() {
    return {
      task: "",
      todos: [],
      id: "",
      updateTask: "",
      user: JSON.parse(sessionStorage.getItem('user'))
    };
  },
  methods: {
    add: function(event) {
      event.preventDefault();
      const newToDo = {
        id: this.user.stud_id,
        name:this.user.name,
        task: this.task
      };
      this.$http.post("http://localhost:3000/todos", newToDo).then(data => {
        this.todos = [ data.body, ...this.todos];
      });

      this.task = "";
    },
    updatetodo: function(id) {
      this.$http
        .put("http://localhost:3000/todos/" + id, { task: this.updateTask })
        .then(data => {
          console.log(data);
          this.todos.forEach(element => {
            if (element.task_id == id) {
              element.task = this.updateTask;
            }
            this.id = "";
          });
        });
    },
    deleteTodo: function(id) {
      this.$http({
        url: "http://localhost:3000/todos/" + id,
        method: "DELETE"
      }).then(function(data) {
        console.log(data.body);
        if (data) {
          this.todos = this.todos.filter(item => item.task_id != id);
        }
      });
    }
  },
  beforeCreate(){
    try{
    if(!this.$session.exists()){
      this.$router.push('/');
    }
  }catch(err){
     this.$router.replace({path: '/'});
  }}
  ,
  created() {
    this.$http.get("http://localhost:3000/todos/"+ this.user.stud_id).then(data => {
      this.todos = data.body;

    });
  }
};
</script>

<style scoped>
.addtodo {
  text-align: center;
  margin: 50px;
  padding: 30px;
}
h1 {
  margin-bottom: 50px;
  color: rgb(24, 41, 73);
}
input {
  width: 300px;
  display: inline;
}
table{
  font-size: 22px;
  margin: auto;
}
td,th{
  border: 2px solid;
}
</style>

