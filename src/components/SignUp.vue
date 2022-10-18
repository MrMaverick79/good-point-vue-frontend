<template>
    <div class="signup">
        <h3>Create an account</h3>
        <form action="">
            <label for="">Username:
                <input type="text" v-model="name">
            </label>
            <label for="">Email:
                <input type="text" v-model="email">
            </label>
            <label for="">Password:
                <input type="password" v-model="password">
            </label>
            <button @click="handleSubmit">Create my account</button>

        </form>

    </div>

</template>

<script>
import axios from 'axios'

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
                const res = await axios.post('http://localhost:3000/user/create', {
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