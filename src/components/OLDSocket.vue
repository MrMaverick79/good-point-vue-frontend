

<template>
    <div>
      <p v-if="isConnected">We're connected to the server!</p>
      <p>Message from server: "{{socketMessage}}"</p>
      <button @click="clickButton('A custom message')">SendData>?</button>
    </div>
  </template>
  
<!-- This used a vueSocket io package -->
  <script>
  export default {
    name: 'App',
    data() {
      return {
        isConnected: false,
        socketMessage: ""
      }
    },
   
    sockets: {
          connect: function () {
              console.log('socket connected')
              
              this.isConnected = true;
              
          },
          disconnect() {
            console.log('socket disconnected')
            this.isConnected = false;
          },
          getMessage: function(receivedMessage){
            console.log('Message recievd from the server', receivedMessage);
            this.socketMessage = receivedMessage["message"]
          }
          
          
              
                
        
      },
      methods: {
          clickButton: function (message) {
              // $socket is socket.io-client instance
              this.$socket.emit('sendMessage', 
              {message: message} )
          },
          
      },
  }
  </script>
  
  
  
  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }