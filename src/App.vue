<script>


export default {
    name: "App",
    data(){
      return{
        userPresent: this.checkUser(),
        showLogin: this.isSignUp(),
      }
    },

  

    updated(){
      this.showLogin = this.isSignUp()
    },

    methods: {
      checkUser(){
        return localStorage.getItem("user")
      },

      isSignUp(){
        return this.$route.name === 'SignUp'
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
      
    <div>
      
        <Login v-if="!showLogin" />
        <Chatroom />

        
    </div>

 
   

    
    
  </div>
</template>



<style scoped>
 
</style>
