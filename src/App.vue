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
            <router-link to="/rooms">Make your point</router-link>
          </li>   
        </ul>
      </nav>
    </header>   
    <router-view/> 
      
    <div v-if="this.showLogin">
        
        <Login  />
                
    </div>

 
   
    <footer class="h-50vh ">

      <div class="github">
        <a href="https://github.com/MrMaverick79/good-point-vue-frontend">
        <i class="devicon-github-original-wordmark text-[3em]"></i></a>
          

      </div>


    </footer>
    
    
  </div>
</template>



<style scoped>
 
</style>
