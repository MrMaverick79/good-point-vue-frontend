<template>
  <div class="selecton container">
    <div class="lobby heading">

      <h3 class="text-red-400 text-[2em] m-8 ">Get a Room</h3>
      <p>Choose from one of your existing rooms or create a new one</p>
      <i @click="toggleCreate" class="ri-add-box-fill text-[1.5em]"></i>

    </div>

    <div class="add container" v-if="showCreate">
        <ChatroomCreate  />
    </div>

      <div 
        v-for="room in rooms" v-bind:key="room._id"
        class="results "
      @click="selectRoom(room._id)"
      >
        <ul>
          <li class="p-5 bg-indigo-900 m-5 w-[25vw]">
            <router-link :to="`/rooms/${room._id}`">{{room.roomName}}</router-link>
          </li>

        </ul>
       
      </div>
    
      

    </div>

</template>

<script>
import axios from 'axios';
import ChatroomCreate from './ChatroomCreate.vue';
import BASE_URL from '../url.js';

export default {
    name: "ChatroomsLobby",
    data() {
        return {
            rooms: [],
            showCreate: false,
            token: JSON.parse(localStorage.getItem("user"))
        };
    },
   
    async mounted() {
        try {
          
            const res = await axios.get(BASE_URL+'/rooms', {
              headers: {
                Authorization: `Bearer ${this.token.token}` //the token is a variable which holds the token
              }
            });
          
            this.rooms = res.data;
            this.loading = false;
        }
        catch (err) {
            console.log("There has been an error trying to find details for this room.", err);
            this.error = err;
            this.loading = false;
        }
    },

    async updated(){
      try {
            const res = await axios.get(BASE_URL+ '/rooms',{ 
              headers: {
                Authorization: `Bearer ${this.token.token}` //the token is a variable which holds the token
              }
            })

            this.rooms = res.data;
            this.loading = false;
        }
        catch (err) {
            
            this.error = err;
            this.loading = false;
        }
    },



    methods: {
        selectRoom(id) {
            
            this.$router.push({
                name: "Chatroom",
                params: { roomId: id }
            });
        },

        toggleCreate(){
          if(this.showCreate === true){
            this.showCreate = false
          } else{
            this.showCreate = true
          }
        }
    },
    components: { ChatroomCreate }
}
</script>

<style scoped>

.results{
  display: inline-flex;
  flex-wrap: wrap;
  
}

.results a{
  color: #fff
}
  


</style>
