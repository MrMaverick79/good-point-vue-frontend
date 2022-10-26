<template>
    <div class="signup flex flex-col">
        <h3>Create an account</h3>
        <form class="flex flex-col">
            
                <input type="text" v-model="name" class="m-2 p-2 border-2 border-indigo-500" placeholder="Username*">
          
           
                <input type="text" v-model="email" class="m-2 p-2 border-2 border-indigo-500" placeholder="Email*">
            
           
                <input type="password" v-model="password" class="m-2 p-2 border-2 border-indigo-500" placeholder="Password*">
            
            <button @click="handleSubmit" class="submit bg-purple-700 hover:bg-purple-500 hover:text-black text-white">Create my account</button>

        </form>

    </div>

</template>

<script>
import axios from 'axios'
import BASE_URL from '../url'

export default {
    name: 'SignUp',
    data(){
        return{
            name: null,
            email: null, 
            password: null
        }
    },
    methods: {
        handleSubmit(e){
            e.preventDefault()
            this.createUser()
        },

        async createUser(){
            try{
                const res = await axios.post(`${BASE_URL}/user/create`, {
                    name: this.name,
                    password: this.password,
                    email: this.email
                })

                console.log('User response', res.data);

            }catch(err){
                console.log('There was an error trying to create this account', err);
            }

        }
    },

}
</script>

<style>

</style>