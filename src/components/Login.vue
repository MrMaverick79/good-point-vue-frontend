<template>
  
    <div class="form container" >  
        <div class="user container w-full inline-flex justify-center"
        v-if="this.loggedIn"
    >  
        
            <img :src="this.image.url" alt="user profile picture" class="h-12 rounded-full border-2 border-blue-100"/>
        <ul class="m-2 "> 
            <li>Welcome, {{$attrs.user.name}}</li>
            <li> <a @click="logOut" class="cursor-pointer">Logout</a></li>
        </ul>
       
    </div>
    <div v-if="!this.loggedIn">

        <div v-if="this.error">
            <p>Please check your username and password and try again</p>

        </div>

        <form action="" class="p-5">
            <label for="">
            
                <input type="text" v-model="email" placeholder="Email"
                class="m-2 p-2 border-2 border-indigo-500"
                 />
            </label>
            <label>
               
                <input type="password" v-model="password" placeholder="Password"
                class="m-2 p-2 border-2 border-indigo-500"
                />
            </label>
            <button class="submit bg-purple-700 hover:bg-purple-500 hover:text-black text-white" @click="handleSubmit">Log In</button>
        </form>
        <a href="/signup">No account? Sign up</a>

    </div>

  </div>
</template>

<script>
import BASE_URL from '../url'
import axios from 'axios'
export default {
    name: 'Login',
    data(){
        return{
            email: null,
            password: null,
            result: "", 
            loggedIn: false,
            error: null, 
            image: this.$attrs.user
            
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
        },

       
      
  }

    

       
}

</script>

<style scoped>
   
</style>