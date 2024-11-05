import { Injectable } from '@nestjs/common';
import { ConnectedClients } from './interfaces/connected-clients.interface';
import { Socket } from 'socket.io';

@Injectable()
export class MessageWsService {
    private connectedClients: ConnectedClients = {}

    async registerClient( client: Socket) {
        this.connectedClients[client.id] = client;
    }

    removeClient( clientId: string ) {
        delete this.connectedClients[clientId];
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients);
    }

    getUserFullName( userId: string ) {
        return this.connectedClients[userId].id;
        //return this.connectedClients[userId].fullName;
    }
}
