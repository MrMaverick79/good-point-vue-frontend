<template>
    <!-- Message feed and send message component -->
    <div class="chatroom container">
        <h3>Welcome, {{user.user.name}}</h3>
        <h4 class="text-red-400">Topic: {{this.messages[0].room.roomName}}</h4>
       
            <!-- messages appear here -->
        <div 
             v-for="message in messages" v-bind:key="message._id"
             class="feed container"
                
        >
            <p>{{message.content}}</p>
        </div>

        <div class="message input">
            <form @submit="sendMessage">
                <textarea name="messageContent" id="" cols="30" rows="10"
                v-model="currentMessage"
                ></textarea>
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
            loading: true,
            error: null,
            messages: null, //all the data
            user: JSON.parse(localStorage.getItem("user"))
            
        }
    },

    

    async mounted(){

        socket.on("sendMessage", (response) => {
            console.log('Received response from the server', response);
        } )

        
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
            socket.emit("sendMessage", this.currentMessage, (response)=> {
                console.log('Received', response)
            })
        }
    },

    

}


</script>

<style>

</style>