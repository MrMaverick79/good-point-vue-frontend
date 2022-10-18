<template>
        <div class="create container">
            <form action="">
                <label for="">
                    Topic:
                    <input type="text" v-model="this.topic">
                    <button @click="handleSubmit">Argue!</button>
                </label>



            </form>


        </div>

</template>

<script>
const BASE_URL = 'http://localhost:3000';
import axios from 'axios'
export default {
    name: 'ChatroomCreate',
    data(){
        return {
            topic: undefined,
            user: JSON.parse(localStorage.getItem("user")).user._id,
            result: null
        }
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

    }
}
</script>

<style>

</style>