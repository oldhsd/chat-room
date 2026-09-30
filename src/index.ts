import {WebSocketServer,WebSocket} from 'ws';

interface user{
    socket:WebSocket,//make interface
    room: String
}

const wss = new WebSocketServer({port:8080})
 let allSocket:user[] =[];

wss.on('connection',function(socket){

    socket.on('message',(message)=>{
        const nmsg = JSON.parse(message as unknown as string)

        if(nmsg.type==='join'){
            allSocket.push({socket,
                'room':nmsg.payload.room
        })
    }

        if(nmsg.type==='chat'){
            let currentuserroom = null
            for(let i=0;i<allSocket.length;i++){
                if(allSocket[i].socket==socket){
                    currentuserroom=allSocket[i].room
                }

            }
            for(let i=0;i<allSocket.length;i++){
               if( allSocket[i].room===currentuserroom){
                allSocket[i].socket.send(nmsg.payload.message)
               }
            }
        }

        
    })
    
}
)