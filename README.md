# G O O D P O I N T ! #

**Author: Brendan Tuckerman**

[Live Demo]()

test-email: test1@test.com
password: chicken

[Backend Repo]()

**Tech Stack / Frameworks / Libraries:**

- Vue 3
- MongoDB
- Mongoose
- Socket.io
- Express
- Tailwind CSS
- Vite

**Overview**

*Good Point!* is a demonstration full-stack project that uses socket.io to create basic chat rooms. Users can log in, add and create chat rooms, and discuss topics with others.

**Features**

 - Authentication using jwt
 - Create users, chatrooms
 - Send messages using websockets
 - Responds to light/dark mode preferences from the browser

 ## How to use Socket.io- a basic introduction

 This was the first time that I had used Socket.io in one of my projects, so I'm including a really simple tutorial here to get started. It's not meant to be a thorough how to, but if you follow these steps, you should be able to get your front end and back ends speaking to each other via sockets.

1. Setting up your Node.js back end.

To make the backend for this porject, we'll use MongoDB, Mongoose and Express.

Initialize your project with: 

`mkdir chat-app-backend`

and `cd` into that directory.

We need a few packages to start, so initialize the project with

`npm i express mongodb mongoose nodemon cors` 

This allows us to use mongodb with mongoose, express,  nodemon, which is a simple monitoring package that keeps an eye on our server, and cors to help us avoid Cors errors--more on that later!

Then we are going to need to get socket.io, which will send our messages via websockets

`npm install socket.io`

Now we can `touch server.js` and `mkdir models` to start building our chat app.

2. Build our models

We are using some basic models for this project- User, Message, and Rooms. I kept them simple, but each of the models are related. You can see them in this repo, but here is an example of how I set up my Message model:

```javascript

    const mongoose = require('mongoose');

    const MessageSchema = new mongoose.Schema({

        content: String,
        
        createdAt: {
            type: Date,
            default: Date.now
        },

        sender:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },

        room: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Room"
        }


    });

    module.exports = mongoose.model('Message', MessageSchema)
```

Because Messages are sent by the User (senders) and belong to a specific Room, you can see I've added `mongoose.Schema.Types.ObjectID` to connect these. This means we can look up a room or a user and also access the messages.

3. Build our server 

There are a few things to set up to get our server going, but the most importnat one to note is the socket.io setup. These settings are the ones that helped me overcome some cors issues on deployments, although the origin was changed to the deployment address. 

[Socket.io docs](https://socket.io/get-started/chat) and the tutorial are very well written and can cover a similar project.

The set up I used:

```Javascript

    //express, HTTP, and socket.io set up
    const express = require('express');
    const app = express();
    const http = require('http');
    const server = http.createServer(app)
    const { Server } = require('socket.io');
    const io = new Server(server, {
        cors: {
        origin:"http://localhost:8080",
        methods: "*",
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        pingTimeout: 7000,
        pingInterval: 3000
        }
    });



```
And don't forget to get your cors package and enable the middleware to send json via express:

```Javascript
    //Cors middleware
    const cors = require('cors')
    app.use( cors());

    //To access POSTed body content, we need this
    app.use( express.json());
    app.use( express.urlencoded({ extended: true}));

```
4. Set up your front end

I used Vue.js and Vite for this project, and there is a bit of set up to get Socket.io ready here. Some if it differs from the docs.

You can use the following to get Vite to provide a Vue template:

```bash
    # npm 6.x
    npm create vite@latest my-vue-app --template vue

    # npm 7+, extra double-dash is needed:
    npm create vite@latest my-vue-app -- --template vue

    # yarn
    yarn create vite my-vue-app --template vue

    # pnpm
    pnpm create vite my-vue-app --template vue
```

And then you can add socket.io using:

`npm install vue-socket.io --save`

To prevent the Socket from constantly connecting, I found I had to create socket.js in the root of my project and then import it into my app.

```javascript
    import { io } from "socket.io-client";
    import BASE_URL from "./url";
    export const socket = io(BASE_URL,{
        withCredentials: true});

    socket.on("connect", () => {
        console.log(socket.connected , "Socket connected"); // true
    });
    
    socket.on("disconnect", () => {
        console.log(socket.connected); // false
    });

```

And then I used the Vue 3 syntax to use the socket within the app:

```Javascript

    import { createApp } from 'vue'
    import './style.css'
    import App from './App.vue'
    import  {router} from './router'
    import { socket } from './socket'
    import axios from 'axios'



    const gpApp = createApp(App)
    gpApp.component('Login', Login);
    gpApp.component('SignUp', SignUp);
    gpApp
        .use(router, socket, axios)
        // .use(socket)


    gpApp.mount('#app')


```

If everything has been set up correctly, then you should be able to boot up your front and back ends and see `true socket connected` in the terminal of your browser.

5. Transmitting data from front end to back end.

The best way to understand the use of socket.io is to follow some data as it travels between front and back end.

To do this, socket.io uses `socket.emit` and `socket.on`. The first sends a message, while the other listens for a specific request and then acts. 

As a very simple example, imagine you had a button that you wanted to use to send a message that had been stored as data. Your front end might include something like



```javascript
    <script>
    export default {
    
        {/* Data and mounted() etc */}
    methods:    
        sendMessage(e){
                e.preventDefault();
                socket.emit("sendMessage", {
                    message: this.currentMessage, 
                    user: this.user._id,
                    room: this.room

                }


```
Socket.emit would then send a "sendMessage", plus the payload in the object to the backend.

Our server.js in the back end ha a matching socket.on to listen for this action:

```Javascript

    io.on('connection', (socket) => {

        console.log('Socket Connected');

        //Grab a message sent from the front end, post it to the server, and then return it on success
        socket.on('sendMessage', async(message) => {
        await postMessage(message); //adds the message, user, and room to the server.
        io.emit('returnMessage', message)
        });

    //... 
    }


```

When it receivee the message, it then runs a function, postMessage() that will add the new message to my database and then send a response using 'returnMessage.' Our front end is now waiting for this respones and will add the returned message to the list of messages, so they can be displayed to the user.


```JavaScript

     socket.on("returnMessage", (response) => {
            console.log('Received response from the server', response);
            this.messages = [response,...this.messages];
           
        })
    


```
We have now sent a message to the back end, added it to our database, and then sent a response to the front end so it can render the new message.


 
 






## Future Fixes

- Remove all axios requests and replace with sockets, while maintaining security.
- Tutorial for using socket IO
- Refactor 
- Add more detials to the chat--emoji, time sent
- Allow new users to upload image


## Known bugs







