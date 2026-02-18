import env from "@/env/environment.json";
import type { Id } from "../types/Id";
import { Client, type IMessage } from "@stomp/stompjs";

export class WebSocketService <T extends Id> {
    private ws: Client | null = null;

    constructor(handleData: (data: T) => void, endpoint: string) {
        this.ws = new Client({
            brokerURL: env.ws + "/websocket",
            reconnectDelay: 10000,

            onConnect: () => {
                console.log("Connection established");
                this.ws?.subscribe("/user/queue/" + endpoint, (data: IMessage) => {
                    const body = JSON.parse(data.body);
                    handleData(body as T);
                })
            }
        });

        this.ws.activate();
    }

    disconnect() {
        this.ws?.deactivate();
    }
}