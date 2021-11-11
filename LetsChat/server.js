const express =require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server).sockets;


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

let connectedUser = [];
let chatcontents = [];

//Socket Connect
io.on("connection",socket =>{
    
    console.log("one user connected");
    updateUserName();
    previousChatContent();
    let userName = '';
    //Login
    socket.on('login',(name,callback)=>{
        
        if(name.trim().length === 0){
            return;
        }
        callback(true);
        userName = name;
        connectedUser.push(userName);

        //console.log(connectedUser);
        updateUserName();
    })

    //Receive Chat Message
    socket.on('chat message send',msg=>{
        let date = new Date();
        messageTime=`${getZero(date.getHours())}:${getZero(date.getMinutes())}`;
        io.emit('chat message output',{
            time:messageTime,
            name:userName,
            message:msg
        })
        chatcontents.push({
            time:messageTime,
            name:userName,
            message:msg
        });
        if(chatcontents.length>10){
            chatcontents.shift();
        }
    })

    //Disconnect
    socket.on('disconnect',()=>{
        console.log("user disconnect");
        let index = connectedUser.indexOf(userName);
        if (index !== -1) {  
            connectedUser.splice(index, 1);
        }
        updateUserName();
    })

    //Update User Name
    function updateUserName(){
        io.emit("loadUser",connectedUser);
    }

    function previousChatContent(){
        io.emit("loadChatContents",chatcontents);
    }

})

function getZero(num) {    // 个位数前补0
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

const port =process.env.PORT||3000;

server.listen(port,()=>console.log(`Server running on port ${port}`));
