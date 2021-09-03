import router from "@/router";
import { io, Socket } from "socket.io-client";
import { reactive, toRefs } from "vue";
import Peer from 'simple-peer';


export interface User {
    id: string,
    name: string,
    peer: Peer.Instance,
}
interface AuthorizeData {
    currentUser: User,
    room: { id: string, name: string },
    users: Array<User>
}
const state = reactive({
    connected: false,
    connectedUsers: {} as { [key: string]: User }
});

let socket: Socket;



export default function useSocket() {
    const connect = async () => {
        const video = await (navigator.mediaDevices as any).getDisplayMedia({
            video: true,
        });
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
                if (user.id === data.currentUser.id) return;
                const peer = createPeer(user.id, video)
                state.connectedUsers[user.id] = {...user, peer};
            }
        })
        socket.on("signal_received", ({signal, userId}) => {
            console.log("signal_received", {signal, userId})
            const peer = addPeer(signal, userId, video);
            state.connectedUsers[userId].peer = peer;            
        })
        socket.on("return_signal_received", ({signal, userId}) => {
            console.log("return_signal_received", {signal, userId})
            const user = state.connectedUsers[userId];
            user.peer.signal(signal);

        })
        socket.on("user_join", (user: User) => {
            state.connectedUsers[user.id] = user;
        })
        socket.on("user_leave", (userId: string) => {
            state.connectedUsers[userId].peer.destroy();
            delete state.connectedUsers[userId]
        })
        socket.on("connect", () => {
            state.connected = true;
        })
        socket.on("disconnect", () => {
            state.connected = false;
        })
    }

    // call peer
    const createPeer = (userIdToSignal: string, stream: any) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", (signal) => {
            socket.emit("send_signal", { userIdToSignal, signal });
        });
        return peer;
    };

    //accept peer
    const addPeer = (incomingSignal: string, userIdToSignal: string, stream: any) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });
        peer.on("signal", (signal) => {
            socket.emit("return_signal", {signal, userIdToSignal});
        });
        peer.signal(incomingSignal);
        return peer;
    };

    return {
        ...toRefs(state), // convert to refs when returning
        connect, socket
    }
}