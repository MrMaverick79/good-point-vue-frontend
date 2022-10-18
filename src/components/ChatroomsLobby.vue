<template>
  <div class="selecton container">
    <h1 class="text-red-400">Get a Room</h1>
    <p>Choose from one of your existing rooms or create a new one</p>
      <div 
        v-for="room in rooms" v-bind:key="room._id"
        class="results"
        @click="selectRoom(room._id)"
      >
        <ul>
          <li>
            <router-link :to="`/rooms/${room._id}`">{{room.roomName}}</router-link>
          </li>
        </ul>
      </div>
    
      <div class="add container" v-if="showCreate">
        <ChatroomCreate  />
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
            showCreate: true
        };
    },
    // socket.emit("getRoom", this.roomId, (response)=> {
    //     console.log('Room response', response)
    // });
    // socket.on("roomResponse", (msg) => {
    //     log("roomResponse received from the server", msg)
    //     this.roomData = data
    // });
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
        }
    },
    components: { ChatroomCreate }
}
</script>

<style>

</style>
