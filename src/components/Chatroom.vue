<template>
    <!-- Message feed and send message component -->
    <div class="chatroom container">
        <h3>Welcome, </h3>
        <h4 class="text-red-400">Topic: {{ }}</h4>
       
            <!-- messages appear here -->
        <div  
             v-for="message in messages" :key="message._id"
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
import { ref } from 'vue'
const BASE_URL = "http://localhost:3000"
import axios from 'axios';



export default {


    name: 'Chatroom',
    data(){
        return {
            count: ref(0),
            currentMessage: "",
            loading: true,
            error: null,
            messages: null, //all the data
            user: this.getUser(),
            room:this.$route.params.id
            
            
        }
    },

    async updated(){
        
        
    },


    

    async mounted(){

        socket.on("sendMessage", (response) => {
            console.log('Received response from the server', response);
            this.messages = [response,...this.messages];
           
        } )

        
        console.log('Mounted router', this.$route.params.id);
       
        
        try {
            console.log('Attempting to get room.');
            const res = await axios.get(`${BASE_URL}/rooms/${this.$route.params.id}`)
            console.log('Messages', res.data);
            
            this.messages = res.data
            if (this.messages.length > 0){

                this.room = this.messages[0].room
            }
            this.loading = false

        } catch(err) {
            console.log('There has been an error trying to find details for this room.', err);
            this.error = err;
            this.loading = false;
        }

        


    },

    

    methods: {

       

        async sendMessage(e){
            e.preventDefault();
            
            console.log('Button Clicked');
            socket.emit("sendMessage", {
                message: this.currentMessage, 
                user: this.user._id,
                room:  this.room

            },(response)=> {
               
                console.log('Received', response)
                
            })

            try {
            console.log('Attempting to get messages.');
            const res = await axios.get(`${BASE_URL}/rooms/${this.$route.params.id}`)
            console.log('Messages', res.data);
            if(this.messages.length > 0){
                
                this.messages = res.data
                this.room = this.messages[0].room
            }

            this.loading = false

        } catch(err) {
            console.log('There has been an error trying to find details for this room.', err);
            this.error = err;
            this.loading = false;
        }

            this.currentMessage = ""
        },

        getUser(){
                const allUser = JSON.parse(localStorage.getItem("user"))
                console.log('coming from getUser', allUser.user);
                return allUser.user
            }
    },

    

}


</script>

<style>

</style>