<template>
    <!-- Message feed and send message component -->
    <div class="chatroom container">
        <h3>Welcome, {{this.user.name}} </h3>
        <h4 class="text-red-400">We are discussing: {{this.topic }}</h4>
        <div class="message container w-[75vw] h-[75vh] overflow-scroll flex-column ">
                <!-- messages appear here -->
            <div  
                v-for="message in messages" :key="message._id"
                class="feed container "       
            >
                <div v-if="message.sender._id === this.user._id" class="bg-blue-400 w-[50%] p-5 m-5 justify-start text-left rounded">
                    <p 
                    class="text-red-100bg-blue-400 w-full border-red text-align-left">{{message.content}}</p>
                </div>
                <div v-else class=" text-black w-full p-5 m-5 nonUser rounded">
                    <img src="" alt="" srcset="">
                    <p class="bg-white w-[50%] p-5"
                    >{{message.content}}</p>
                    
                  
                </div>
                <p class="text-white">Posted by {{message.sender.name}}</p>


            </div>
        </div>
        <div class="message input pt-10 flex-column justify-center ">
            <form @submit="sendMessage">
                <textarea name="messageContent" 
                placeholder="Express yourself here"
                id="" cols="30" rows="10"
                v-model="currentMessage"
                ></textarea>
               
            </form>
            <button class="bg-purple-700 w-[25vw]">Go</button>
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
            messages: null, //socket
            user: this.getUser(),
            room:this.$route.params.id,
            topic: "" //retrieved by socket
        }
    },

    async updated(){
        //TODO: socket request to fetch messages
        
    },


    

    async mounted(){

        //Ask for the room details
        socket.emit( "getRoom", this.$route.params.id) 
       
        //The response from the server with the room details 
        //TODO: Might be better to replace this with a message request, as it gets everytingh.
        socket.on("roomResponse", (result)=> {
            console.log('roomResponse received from the server',result);
            this.topic = result.roomName
        })

        //Grab the messages(replacing the previous axios request)
        //Ask for the room details
        socket.emit( "getMessages", this.$route.params.id);

        //The messages on response from the server
        socket.on("messageResults", (result)=> {
            console.log('messageResults received from the server',result);
            this.messages = result
        }); 

        socket.on("sendMessage", (response) => {
            console.log('Received response from the server', response);
            this.messages = [response,...this.messages];
           
        })

        


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


.nonUser{
    display: flex;
    justify-content: right;
}

.nonUser p{
    text-align: right;
}
</style>