import { useState, useEffect, useRef } from 'react';
import {io} from "socket.io-client";
function Multi(){
    const [username,setUsername]=useState("");
    const[allPlayers,setAllPlayers]=useState([]);
    const [socket, setSocket] = useState(null);
    // let socket=useRef(null);
    // const socketUrl="http://localhost:4000/";
    // const[opponent,setOpponent]=useState("");
    // useEffect(()=>{
    //     socket=io(socketUrl);
    //     socket.on('connect',()=>{
    //         console.log("Connected");
    //     })
    // },[socketUrl])
    // function findPlayers(){
    //     socket=io(socketUrl);
    //     socket.on('connect',()=>{
    //         console.log("Connected");
    //     })
    //     if(username===null)
    //     {
    //         window.alert("Enter a username");
    //     }
    //     else{
    //         console.log(username);
    //         socket.emit("find",{username:username})
            
    //     }
        // socket.current.on("find",(e)=>{
        //     setAllPlayers(e.allPlayers);
        //     const foundObj=allPlayers.find(obj=>obj.p1.p1name===username||obj.p2.p2name===username);
        //     foundObj.p1.p1name===username ? setOpponent(foundObj.p2.p2name): setOpponent(foundObj.p1.p1name);
        // })
        useEffect(() => {
            // Replace 'http://localhost:8080' with the actual URL of your backend server.
            const socket = io('http://localhost:4000');
            setSocket(socket);
        
            socket.on('connect', () => {
              console.log('WebSocket connected');
            });
        
            socket.on('find', (e) => {
              console.log('Received message:', e.username);
            });
            socket.on('message', (data) => {
                console.log('Received message:', data);
                // Handle the received message from the backend here
              });
            socket.on('disconnect', () => {
              console.log('WebSocket disconnected');
            });
        
            // Close the WebSocket connection when the component unmounts
            return () => {
              socket.close();
            };
          }, []);
        
          const findPlayers = () => {
            const message = 'Hello from the frontend!';
            // Send a message to the backend
            socket.emit('find', {username:username});
            console.log(username);
          };
          const sendMessage = () => {
            const message = 'Hello from the frontend!';
            if (socket) {
              // Send a message to the backend if socket is not null
              socket.emit('message', message);
            } else {
              console.log('Socket connection not established yet.');
            }
          };
        
    return(
        <>
            <input type="text" onChange={(e)=>setUsername(e.target.value)}>

            </input>
            <button onClick={findPlayers}>Join Game</button>
            {/* <div>{opponent}</div> */}
            <button onClick={sendMessage}>Send Message</button>
        </>
    )
}
export default Multi;