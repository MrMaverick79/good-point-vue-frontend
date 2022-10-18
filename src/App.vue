<script>


export default {
    name: "App",
    
};//end 


</script>

<template>
  <div id="app">
    <header>
      <h1>GOOD POINT!</h1>
      <nav>
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

        <Login />
        <Chatroom />

    </div>

 
   

    
    
  </div>
</template>



<style scoped>
 
</style>
