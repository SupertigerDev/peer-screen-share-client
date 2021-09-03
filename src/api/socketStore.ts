import router from "@/router";
import { io, Socket } from "socket.io-client";
import { reactive, toRefs } from "vue";



export interface User {
    id: string,
    name: string
}
interface AuthorizeData {
    currentUser: User,
    room: {id: string, name: string},
    users: Array<User>
}
const state = reactive({
    connected: false,
    connectedUsers: {} as {[key: string]: User}
});

let socket: Socket;



export default function useSocket() {
    const connect = async () => {
        socket = io("localhost:80", {
            transports: ["websocket"],
            auth: {
                token: localStorage["token"],
                roomId: router.currentRoute.value.params.roomId
            },
        })
        socket.on("authorized", (data: AuthorizeData) => {
            for (let index = 0; index < data.users.length; index++) {
                const user = data.users[index];
                state.connectedUsers[user.id] = user;                
            }
        })
        socket.on("user_join", (user: User) => {
            state.connectedUsers[user.id] = user;
        })
        socket.on("user_leave", (userId: string) => {
            delete state.connectedUsers[userId]
        })
        socket.on("connect", () => {
            state.connected = true;
        })
        socket.on("disconnect", () => {
            state.connected = false;
        })
        
    }

    return {
        ...toRefs(state), // convert to refs when returning
        connect
    }
}