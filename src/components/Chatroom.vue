<template>
    <!-- Message feed and send message component -->
    <div class="chatroom container">
        <h4 class="text-red-400">Topic:</h4>
        <div class="feed">
            <!-- messages appear here -->

        </div>

        <div class="message input">
            <form @submit="sendMessage">
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <button>!</button>
            </form>
        </div>


    </div>
</template>

<script>
import { socket } from '../socket';
const BASE_URL = "http://localhost:3000"
import axios from 'axios';

export default {
    name: 'Chatroom',
    data(){
        return {
            currentMessage: "",
            roomData: null,
            loading: true,
            error: null,
            messages: null

        }
    },

    async mounted(){

        // socket.emit("getRoom", this.roomId, (response)=> {
        //     console.log('Room response', response)
        // });

        // socket.on("roomResponse", (msg) => {
        //     log("roomResponse received from the server", msg)
        //     this.roomData = data
        // });
        console.log('Mounted router', this.$route.params.id);
       
        
        try {
            console.log('Attempting to get messages.');
            const res = await axios.get(`${BASE_URL}/rooms/${this.$route.params.id}`)
            console.log('Messages', res.data);
            this.messages = res.data
           
            this.loading = false

        } catch(err) {
            console.log('There has been an error trying to find details for this room.', err);
            this.error = err;
            this.loading = false;
        }


    },

    

    methods: {
        sendMessage(e){
            e.preventDefault();
            console.log('Button Clicked');
            socket.emit("hello", "world", (response)=> {
                console.log('Received', response)
            })
        }
    }

}
</script>

<style>

</style>