const express=require("express");
const app=express();
const path=require("path");
const http=require("http");
const {Server}=require("socket.io");
const server=http.createServer(app);
const io=new Server(server,{
    cors: {
      origin: '*',
    }
});
var cors=require("cors");
app.use(cors());
let arr=[];
let playingArray=[];
console.log(io);
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"sucess"
//     })
// })
io.on("connection",(socket)=>{
    socket.on("find",(e)=>{
        arr.push(e.username);
        if(arr.length>=2)
        {
            let p1={
                p1name:arr[0],
                p1speed:0,
                p1accuracy:0

            }
            let p2={
                p2name:arr[1],
                p2speed:0,
                p2accuracy:0

            }
            // let p3={
            //     p3name:arr[2],
            //     p3speed:0,
            //     p3accuracy:0

            // }
            // let p4={
            //     p4name:arr[3],
            //     p4speed:0,
            //     p4accuracy:0

            // }
            let obj={
                p1:p1,
                p2:p2,
                // p3:p3,
                // p4:p4
            }
            playingArray.push(obj);
            arr.splice(0,2);
            io.emit("find",{allPlayers:playingArray})
        }
    })
    socket.on('message', (data) => {
        console.log('Received message:', data);
    
        // Echo the message back to the frontend
        socket.emit('message', `Server says: ${data}`);
      });
})
app.listen(4000,(req,res)=>{
    console.log("port 4000");
})
