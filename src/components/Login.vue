<template>
  
    <div class="form container" >  
        <div class="form container"
        v-if="this.loggedIn"
    >  
         <a @click="logOut">Logout</a>
    </div>
    <div v-if="!this.loggedIn">

        <div v-if="this.error">
            <p>Please check your username and password and try again</p>

        </div>

        <form action="" class="p-5">
            <label for="">
            
                <input type="text" v-model="email" placeholder="Email"
                class="m-2 p-2"
                 />
            </label>
            <label>
               
                <input type="password" v-model="password" placeholder="Password"
                class="m-2 p-2"
                />
            </label>
            <button class="bg-purple-700"><submit @click="handleSubmit">Log In</submit></button>
        </form>
        <a href="/signup">No account? Sign up</a>

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
            loggedIn: false,
            error: null
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
                this.error = true
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