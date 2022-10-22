<template>
        <div class="create container p-3  border-2 border-red-400 ">
            <h3 class="text-lg">Create a New Room</h3>
            <form class="h-[15em] w-[20%] border-2 border-white-200 flex flex-col">
                <label for="">
                    <input type="text" v-model="this.topic" placeholder="Give this room a name...">
                <label for="">
                    Add someone to this room
                    <select v-model="selected" >
                        <option disabled value="">Please select one</option>
                        <template v-for="user in listOfUsers" v-bind:key="user._id">
                            <option v-if="user._id!=this.user">{{user.name}}</option>

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
                    users: this.user
                })

                this.result = res.data
                console.log(res.data);
    
            } catch(err){
                console.log('There has been an error creating that room', err);
            }

            this.$router.push('/rooms/')
        },

        async grabUsers() {

            //Grab the names of other users to add to the new chatroom
            try{
                const res = await axios.get(BASE_URL + '/users')

                this.listOfUsers = res.data
                console.log('Received a list of users', res.data);
    
            } catch(err){
                console.log('There has been fetching the list of users', err);
            }
        }

    }
}
</script>

<style scoped>
  

</style>