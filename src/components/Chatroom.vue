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
const BASE_URL = "http://localhost3000"

export default {
    name: 'Chatroom',
    data(){
        return {
            currentMessage: "",
            roomId: 123,
            roomData: null,
            loading: true,
            error: null

        }
    },

    async mounted(){

        socket.emit("getRoom", this.roomId, (response)=> {
            console.log('Room response', response)
        });

        socket.on("roomResponse", (data) => {
            log("roomResponse received from the server")
            this.roomData = data
        });
        // try {
        //     const res = await axios.get(`${BASE_URL}/room/${this.roomId}`)
        //     console.log('Room Data', res.data);

        //     this.roomData = res.data;
        //     this.loading = false

        // } catch(err) {
        //     console.log('There has been an error trying to find details for this room.', err);
        //     this.error = err;
        //     this.loading = false;
        // }


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