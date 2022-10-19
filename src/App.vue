<script>


export default {
    name: "App",
    data(){
      return{
        userPresent: this.checkUser(),
        showLogin: true,
      }
    },

    mounted(){
      this.isSignUp()
    },

    updated(){
      this.isSignUp()
    },

    methods: {
      checkUser(){
        return localStorage.getItem("user")
      },

      isSignUp(){
        if (this.$route.name === 'SignUp'){
          this.showLogin = false
        }
      }
    }
};//end 


</script>

<template>
  <div id="app">
    <header>
      <h1>GOOD POINT!</h1>
      <nav v-if="userPresent">
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/rooms">Rooms</router-link>
          </li>   
        </ul>
      </nav>
      <div v-if="this.showLogin">
        
        <Login  />
                
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
