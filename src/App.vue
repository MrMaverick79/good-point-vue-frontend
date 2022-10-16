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
    <hr>
    
    <router-view/> 
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style scoped>
 
</style>
