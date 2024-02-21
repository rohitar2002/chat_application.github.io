console.log("hello Server!");

const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

// console.log(socket);
let sender_name;
io.on("connection", (socket)=>{
    console.log("New Connection is Established by using, ", socket.id, " id.");

    socket.on("send-name", (username)=>{
        console.log("Connected user name is: ", username);
        
            socket.on("send-message", (message)=>{
                io.emit("msg-from-sender", socket.id, username, message);
            })
    })
})

app.use(express.static("https://github.com/rohitar2002/chat_application.github.io/tree/main/public"));

app.get("/", (req, res)=>{
    console.log(req.url);

    res.sendFile("https://github.com/rohitar2002/chat_application.github.io/blob/main/index.html");
})



server.listen(8096, "0.0.0.0", ()=>{
    console.log("Server is now listening......");
})
