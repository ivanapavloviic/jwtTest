<template>
  <div>
    <h4>Login Form</h4>
    <form>
      <div class="mb-3">
        <label for="txtemail" class="form-label">email</label>
        <input
          type="text"
          class="form-control"
          id="txtemail"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="txtPassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="txtPassword"
          v-model="password"
        />
      </div>
      <button type="button" class="btn btn-primary" @click="login()">Submit</button>
    </form>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    data(){
        return{
            email:'',
            password:''
        }
    },
    computed:{
      ...mapGetters('auth',{
        getterLoginStatus:'getLoginStatus'
      })
    },
    methods:{
        ...mapActions('auth',{
          actionLogin:'login'
        }),
        async login(){
           await this.actionLogin({email:this.email, password:this.password});
           if(this.getterLoginStatus === 'success'){
             this.$router.push("/dashboard");
           }else{
             alert('failed to login')
           }
        }
    }
};
</script>