const express=require("express");
const app=express();
const path=require("path");
const http=require("http");
var PORT=app.listen(4000);
const {Server}=require("socket.io");
const server=http.createServer(app).listen(PORT);
const io=new Server(server, {
    cors: {
      origin: '*'

    },
  });
var cors=require("cors");
app.use(cors());
let arreasy=[];
let playingEasyArray=[];
let arrmed=[];
let playingMedArray=[];
let arrhard=[];
let playingHardArray=[];
console.log(io);
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"sucess"
//     })
// })
io.on("connection",(socket)=>{
    socket.on("find",(e)=>{
        if(e.difficulty==="easy"){
            arreasy.push(e.username);
            if(arreasy.length>=2)
            {
                let p1={
                    p1name:arreasy[0],
                    p1speed:0,
                    p1accuracy:0,
                    p1para:""
    
                }
                let p2={
                    p2name:arreasy[1],
                    p2speed:0,
                    p2accuracy:0,
                    p2para:""
    
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
                playingEasyArray.push(obj);
                arreasy.splice(0,2);
                io.emit("find",{allPlayers:playingEasyArray})
            }
        }
        else if(e.difficulty==="medium")
        {
            arrmed.push(e.username);
            if(arrmed.length>=2)
            {
                let p1={
                    p1name:arrmed[0],
                    p1speed:0,
                    p1accuracy:0,
                    p1para:""
    
                }
                let p2={
                    p2name:arrmed[1],
                    p2speed:0,
                    p2accuracy:0,
                    p2para:""
    
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
                playingMedArray.push(obj);
                arrmed.splice(0,2);
                io.emit("find",{allPlayers:playingMedArray})
            }
        }
        else{
            arrhard.push(e.username);
            if(arrhard.length>=2)
            {
                let p1={
                    p1name:arrhard[0],
                    p1speed:0,
                    p1accuracy:0,
                    p1para:""
    
                }
                let p2={
                    p2name:arrhard[1],
                    p2speed:0,
                    p2accuracy:0,
                    p2para:""
    
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
                playingHardArray.push(obj);
                arrhard.splice(0,2);
                io.emit("find",{allPlayers:playingHardArray})
            }
        }
       
    })
    socket.on("playing",(e)=>{
        if(e.difficulty==="easy")
        {console.log(e);
            let objToChange=playingEasyArray.find(obj=>obj.p1.p1name===e.username||obj.p2.p2name===e.username);
            if(objToChange.p1.p1name===e.username)
            {
                objToChange.p1.p1speed=(60*e.correct/e.totaltime)
                objToChange.p1.p1accuracy=(e.correct/(e.correct+e.incorrect))
                console.log(objToChange.p1.p1speed);
            }
            else{
                objToChange.p2.p2speed=(60*e.correct/e.totaltime)
                objToChange.p2.p2accuracy=(e.correct/(e.correct+e.incorrect))
                console.log(objToChange.p1.p1speed);
            }
            io.emit("playing",{allPlayers:playingEasyArray})
        }
        else if(e.difficulty==="medium")
        {
            let objToChange=playingMedArray.find(obj=>obj.p1.p1name===e.username||obj.p2.p2name===e.username);
            if(objToChange.p1.p1name===e.username)
            {
                objToChange.p1.p1speed=(60*e.correct/e.totaltime)
                objToChange.p1.p1accuracy=(e.correct/(e.correct+e.incorrect))
            }
            else{
                objToChange.p2.p2speed=(60*e.correct/e.totaltime)
                objToChange.p2.p2accuracy=(e.correct/(e.correct+e.incorrect))
            }
            io.emit("playing",{allPlayers:playingMedArray})
        }
        else
        {
            let objToChange=playingHardArray.find(obj=>obj.p1.p1name===e.username||obj.p2.p2name===e.username);
            if(objToChange.p1.p1name===e.username)
            {
                objToChange.p1.p1speed=(60*e.correct/e.totaltime)
                objToChange.p1.p1accuracy=(e.correct/(e.correct+e.incorrect))
            }
            else{
                objToChange.p2.p2speed=(60*e.correct/e.totaltime)
                objToChange.p2.p2accuracy=(e.correct/(e.correct+e.incorrect))
            }
            io.emit("playing",{allPlayers:playingHardArray})
        }
    })
})
// app.listen(4000,(req,res)=>{
//     console.log("port 4000");
// })
