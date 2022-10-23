<template>
        <div class="create p-3 flex flex-col content-center align-center justify-center">
            <h3 class="text-lg">Create a New Room</h3>
            <form class="h-[15em] w-[15em]  self-center text-left mt-4 p-2">              <label for="">
                    <input type="text" v-model="this.topic" placeholder="Give this room a name..."
                    class="p-2 mb-2 border-2 border-indigo-500"
                    >
                <label class="text-s pt-4 ">
                    Add someone to this room
                    <select v-model="selected" class="border-2 border-indigo-500" >
                        <option disabled value="">Please select one</option>
                        <template v-for="user in listOfUsers" v-bind:key="user._id">
                        
                            <option v-if="user._id!=this.user" v-bind:value="user._id"> {{user.name}}</option>

                        </template>
                       
                    
                    </select>
                </label>
                    <button @click="handleSubmit" class="bg-purple-400 mt-4">Create!</button>
                </label>



            </form>


        </div>

</template>

<script>
import BASE_URL from '../url'
import axios from 'axios'
export default {
    name: 'ChatroomCreate',
    data(){
        return {
            topic: undefined,
            user: JSON.parse(localStorage.getItem("user")).user._id,
            result: null, 
            selected: null,
            listOfUsers: this.grabUsers()
        }
    },

    mounted(){
        // if(!this.listOfUsers){

        //     this.grabUsers();
        // }
        


    },

    methods: {
        handleSubmit(e){
            e.preventDefault();
            this.createRoom()
           
        },

        async createRoom() {
    
            try{
                const res = await axios.post(BASE_URL + '/rooms/new', {
                    topic: this.topic,
                    users: [this.user, this.selected]
                })

                this.result = res.data
                
    
            } catch(err){
                console.log('There has been an error creating that room', err);
            }

            this.$router.push(`/rooms/${this.result._id}`)
        },

        async grabUsers() {

            //Grab the names of other users to add to the new chatroom
            try{
                const res = await axios.get(BASE_URL + '/users')

                this.listOfUsers = res.data
                    
            } catch(err){
                console.log('There has been fetching the list of users', err);
            }
        }

    }
}
</script>

<style scoped>
  

</style>