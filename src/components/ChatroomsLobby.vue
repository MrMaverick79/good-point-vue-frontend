<template>
  <div class="selecton container">
    <div class="lobby heading">

      <h3 class="text-red-400">Get a Room</h3>
      <p>Choose from one of your existing rooms or create a new one</p>
      <i @click="toggleCreate" class="ri-add-box-fill"></i>

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
export default {
    name: "ChatroomsLobby",
    data() {
        return {
            rooms: [],
            showCreate: false
        };
    },
   
    async mounted() {
        try {
            console.log("Attempting to get");
            const res = await axios.get(`http://localhost:3000/rooms`);
            console.log("Room Data", res.data);
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
            const res = await axios.get(`http://localhost:3000/rooms`);
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
            console.log(`Here ${id}`);
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
