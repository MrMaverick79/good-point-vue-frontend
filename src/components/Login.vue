<template>
  
    <div class="form container" >  
        <div class="form container"
        v-if="this.loggedIn"
    >  
         <a @click="logOut">Logout</a>
    </div>
    <div v-if="!this.loggedIn">
        <form action="">
            <label for="">
                Email:
                <input type="text" v-model="email"/>
            </label>
            <label for="">
                Password:
                <input type="text" v-model="password"/>
            </label>
            <button><submit @click="handleSubmit">Log In</submit></button>
        </form>
        <a href="/">No account? Sign up</a>

    </div>

  </div>
</template>

<script>
const BASE_URL = 'http://localhost:3000';
import axios from 'axios'
export default {
    name: 'Login',
    data(){
        return{
            email: null,
            password: null,
            result: null, 
            loggedIn: false
        }
    },

    mounted(){
        this.checkUser();
    },

    updated(){
        this.checkUser();
    },

    methods:{
        
        handleSubmit(e){
            e.preventDefault()
            this.loginTo()
        },

        async loginTo (){
            const email = this.email
            const password = this.password
            try{

                const res = await axios.post(BASE_URL + '/login', {
                    email,
                    password
                })

                this.result = res.data

                if(res.data.token){
                    localStorage.setItem("user", JSON.stringify(res.data));
                    this.loggedIn = true;
                    this.$router.push('/rooms')
                }

            } catch (err){
                console.log('Error logging in', err);
            }

            
            
           
        },
   
 
  
 

        logOut(){
              console.log('Clicked');
              
              localStorage.removeItem("user");
              this.loggedIn = false;
              this.$router.push('/')
          },

        checkUser(){
            if(
             localStorage.getItem('user')){
                this.loggedIn = true;
               
             } else{
                this.loggedIn = false;
             }
        },

        getUser(){
            return localStorage.getItem('user')
        }
      
  }

    

       
}

</script>

<style>

</style>