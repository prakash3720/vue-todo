<template>
  <div class="login">
    <h3 class="head">ToDo App</h3>
    <form @submit.prevent="register" class="form-signin">
      <img class="mb-4" src="../../static/img/register.png" width="222" height="192">
      <h2 class="h3 mb-3 font-weight-normal">Register</h2>
      <label for="inputName" class="sr-only">Name</label>
      <input type="text" id="inputName" class="form-control" placeholder="Name" required autofocus v-model="name" autocomplete="off">
      <label for="inputUser" class="sr-only">Username</label>
      <input type="text" id="inputUser" class="form-control" placeholder="Username" required v-model="username" autocomplete="off">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password" autocomplete="off">
      <p v-if="feedback">{{feedback}}</p>
      <div id="load3" style="text-align:center;">
        <PulseLoader/>
      </div>
      <button id="load4" class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      <p class="nope">
        <router-link to="/login">Already have an account?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/BeatLoader.vue'
export default {
  name: 'Register',
  components:{
    PulseLoader
  },
  data () {
    return {
        name:'',
      username:'',
      password:'',
      feedback:''
    }
  },
  methods:{
    register(){
      document.getElementById('load3').style.display="block"
      document.getElementById('load4').style.display="none"
      this.feedback=''
      let data={}
      data.username=this.username
      data.name=this.name
      data.password=this.password
      this.$store.dispatch('register',data).then((res)=>{
        document.getElementById('load3').style.display="none"
        if(res.status){
          window.alert("Please log in to continue.")
          this.$router.push({name:'Login'})
        }else{
          this.feedback='Something Went Wrong. Please Try Again.'
        }
      })
      .catch(err=>{
        document.getElementById('load3').style.display="none"
        document.getElementById('load4').style.display="block"
        this.feedback='Username already Exists.'
      })
    }
  },
  mounted(){
    document.getElementById('load3').style.display="none"
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
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#inputName{
  border-radius: .25rem;
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
