<script>
import { socket } from './socket';


export default {
    name: "App",
    data(){
      return{
        userPresent: this.checkUser(),
        showLogin: true,
        user: ""
      }
    },

    mounted(){
      this.isSignUp()

      if(this.userPresent){
            this.getUser()
        }

        socket.on("foundUser", response=>{
                console.log('We received a reponse from the server', response);
                this.user= response
            })

    },

    updated(){
      this.isSignUp()
      
    

    },

    methods: {
      checkUser(){
        const result =  JSON.parse(localStorage.getItem("user"))
        return result
      },

      isSignUp(){
        if (this.$route.name === 'SignUp'){
          this.showLogin = false
        }
      },

      getUser(){ //receive the details for the current user (name and url only)
        socket.emit("getUser", {
                id: this.userPresent.user._id

        }, (response)=>{
              console.log('Received this response from get user', response);

        })
      }  //getUser
    } //methods
};//end 


</script>

<template>
  <div id="app">
    <h1 class="w-[100%] mb-4">GOOD POINT</h1>
    <header >
      <div v-if="this.showLogin" class="p-2 flex flex-column w-full">
          
          <Login :user="this.user"/>
         
        </div>
     
      
      <div class="header container inline-flex">
        
        <nav v-if="userPresent" class="mt-3 justify-center flex w-full">
          <ul>
            <li>
              <router-link to="/" class="p-8 text-lg">Home</router-link>
            </li>
            <li>
              <router-link to="/rooms" class="text-lg">Rooms</router-link>
            </li>   
          </ul>
        </nav>
      </div>
      
    </header>   
    <router-view/> 
      
    

 
   
    <footer>

      <div class="github h-50">
        <a href="https://github.com/MrMaverick79/good-point-vue-frontend">
        <i class="devicon-github-original-wordmark text-[3em] pt-30"></i></a>
          

      </div>


    </footer>
    
    
  </div>
</template>



<style scoped>
 footer{
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: end

 }

 header ul{  
   display: inline-flex;
   width: 50vw;
   justify-content: center;

 }

 header li{
   padding: 2%;
 }


</style>
