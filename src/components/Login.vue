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
      <div id="load" style="text-align:center;">
        <PulseLoader/>
      </div>
      <button id="load2" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="nope">
        <router-link to="/register">Don't have an account?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/BeatLoader.vue'
export default {
  name: 'Login',
  components:{
    PulseLoader
  },
  data () {
    return {
      username:'',
      password:'',
      feedback:''
    }
  },
  methods:{
    login(){
      document.getElementById('load').style.display="block"
      document.getElementById('load2').style.display="none"
      this.feedback=''
      let data={}
      data.username=this.username
      data.password=this.password
      this.$store.dispatch('login',data).then((res)=>{
        document.getElementById('load').style.display="none"
        if(res.status){
          this.$router.push({name:'Home'})
        }else{
          this.feedback='Something Went Wrong. Please Try Again.'
        }
      })
      .catch(err=>{
        document.getElementById('load').style.display="none"
        document.getElementById('load2').style.display="block"
        this.feedback='The Username/Password is Wrong.'
      })
    }
  },
  mounted(){
    document.getElementById('load').style.display="none"
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
  background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(205,205,205,1) 0%, rgba(206,246,255,1) 100%);
  height: 100vh;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  border-radius: 3%;
  border: 1px solid;
  border-color: rgba(60,64,67,.15);
  box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
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
