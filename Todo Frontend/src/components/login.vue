<template>
  <div id="login">
    <div class="card login-page" style="width: 400px; border: 2px solid;">
      <h1 class="text-center pt-3">Login</h1>
      <form class="form-group m-5 text-center" @submit.prevent="checkuser">
        <input type="text" placeholder="Enter Id" class="form-control" v-model="userdata.id" />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          class="form-control"
          v-model="userdata.password"
        />
        <button class="btn btn-success m-3">Submit</button>
        <label class="text-danger alert alert-danger" v-if="error">Wrong Username or password</label>
      </form>
    </div>
  </div>
</template>

<script>
import App from "../App.vue";
export default {
  data() {
    return {
      userdata: {
        id: "",
        password: ""
      },
      error: false
    };
  },
  methods: {
    checkuser: function() {
      this.$http
        .get("http://localhost:3000/user/" + this.userdata.id)
        .then(data => {
          if (data.body[0].password === this.userdata.password) {
           const user = {
              stud_id: data.body[0].stud_id,
              name: data.body[0].name,
              type: data.body[0].type
            };
            App.data.user = user
            this.$session.start()
            this.$session.set('jwt', data.body.token)
            sessionStorage.setItem('user', JSON.stringify(user));
            this.$router.push('/add');
          } else {
            this.error = true;
          }
        });
    }
  }
};
</script>

<style scoped>
.login-page {
  align-items: center;
  display: flex;
  height: 50vh;
  margin: 10% auto;
  background-color: cadetblue;
}
</style>