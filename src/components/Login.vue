<template>
  <div class="login">
    <h3 class="head">ToDo App</h3>
    <form @submit.prevent="login" class="form-signin">
      <img class="mb-4" src="../../static/img/login.png" width="222" height="192">
      <h2 class="h3 mb-3 font-weight-normal">Sign in</h2>
      <label for="inputUser" class="sr-only">Username</label>
      <input type="text" id="inputUser" class="form-control" placeholder="Username" required autofocus v-model="username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
      <p v-if="feedback">{{feedback}}</p>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="nope">
        <router-link to="/register">Dont't have an account?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username:'',
      password:'',
      feedback:''
    }
  },
  methods:{
    login(){
      this.feedback=''
      let data={}
      data.username=this.username
      data.password=this.password
      this.$store.dispatch('login',data).then((res)=>{
        if(res.status){
          this.$router.push({name:'Home'})
        }else{
          this.feedback='Something Went Wrong. Please Try Again.'
        }
      })
      .catch(err=>{
        this.feedback='The Username/Password is Wrong.'
      })
    }
  }
}
</script>

<style scoped>
.login{
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100vh;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
p{
  color: crimson;
  text-align: center;
}
h2{
  text-align: center;
}
.nope{
  margin-top: 15px;
}
.head{
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 25px;
}
.form-signin{
  background-color: #fff;
}
.form-signin img{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 0!important;
}
@media only screen and (max-width: 768px){
  .form-signin{
    margin-top: 30px;
  }
}
</style>
