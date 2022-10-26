<template>
    <!-- Message feed and send message component -->
    <div class="chatroom container">
        <h2 class="text-red-400 text-[2em] m-8 ">{{this.topic }}</h2>


        <div class="participant inline-flex  w-full justify-end" v-if="this.otherUser">
            
            <img :src="this.otherUser.thumbnailUrl" alt="user profile image" class="h-12 rounded-full border-purple-300 border-2"/>
            <h3 class="text-center m-5 font-bold"> {{this.otherUser.name}} </h3>
        </div>
        
        <div class="message container w-[70vw] h-[75vh] overflow-y-scroll flex-column overflow-x-hidden">
                <!-- messages appear here -->
            <div  
                v-for="message in messages" :key="message._id"
                class="feed container "       
            >
                <div v-if="message.sender._id === this.user._id" class="bg-blue-400 w-[50%] p-5 m-5 justify-start text-left rounded-lg">
                    <p 
                    class="text-red-100bg-blue-400 w-full border-red text-align-left">{{message.content}}</p>
                </div>
                <div v-else class=" text-gray-100 w-full p-5 m-5 nonUser text-right rounded-lg">
                    <img src="" alt="" srcset="">
                    <p class="bg-purple-400  w-[50%] p-5 rounded-lg"
                    >{{message.content}}</p>
                    
                  
                </div>
                <!-- <p class="text-white">Posted by {{message.sender.name}}</p> -->


            </div>
        </div>
        <div class="message input pt-10 ">
            <form @submit="sendMessage" class="inline">
                <textarea name="messageContent" 
                placeholder="Write a message..."
                id="" cols="30" rows="2"
                v-model="currentMessage"
                class="w-[80%] border-2 border-indigo-500"
                ></textarea><i class="ri-emotion-line text-[2em] ml-4 "></i>
               
            </form>
            <button class="bg-purple-700 w-[25vw] mt-3" @click="sendMessage">Go</button>
        </div>


    </div>
</template>

<script>
import { socket } from '../socket';



export default {

    name: 'Chatroom',
    data(){
        return {
            currentMessage: "",
            loading: true,
            error: null,
            messages: null, //socket
            //current user
            user: this.getUser(),
            otherUser: "",
            room:this.$route.params.id,
            roomDetails: null,
            //This might not be needed 
            topic: "" //retrieved by socket
        }
    },

    async updated(){
        this.getOtherUser();
        
    },


    

    async mounted(){

        //Ask for the room details using the url
        socket.emit( "getRoom", this.$route.params.id) 
        socket.emit( "getMessages", this.$route.params.id)
       
        //The response from the server with the room details 
        socket.on("roomResponse", (result)=> {
            // console.log('roomResponse received from the server',result);
            this.topic = result.roomName
            this.roomDetails = result
            this.getOtherUser() //grab the other users details for the image and name
        })

         

        //The messages on response from the server
        socket.on("messageResults", (result)=> {
            // console.log('messageResults received from the server',result);
            this.messages = result
           
        }); 

        socket.on("sendMessage", (response) => {
            // console.log('Received response from the server', response);
            this.messages = [response,...this.messages];
           
        })

       


    },

    methods: {
        //Post a message to the backend
        async sendMessage(e){
            e.preventDefault();
            socket.emit("sendMessage", {
                message: this.currentMessage, 
                user: this.user._id,
                room: this.room

            },(response)=> {
                // console.log('Received', response)
            })
            this.currentMessage = "" //clear the input field
            socket.emit( "getMessages", this.$route.params.id)
        },

        getUser(){
                const allUser = JSON.parse(localStorage.getItem("user"))
                return allUser.user
            },

        getOtherUser(){

            if(this.roomDetails){

                const users = this.roomDetails.users
                 for (let i = 0; i < users.length; i++) {
                    if (users[i].name != this.user.name){
                        this.otherUser = users[i]
                        
                    }
                }

                
            }
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