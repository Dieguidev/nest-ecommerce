import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
  [id: string]: Socket;
}

@Injectable()
export class MessagesWsService {
  private connettedClients: ConnectedClients = {}

  registerClient(client: Socket) {
    this.connettedClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connettedClients[clientId];
  }

  getConnectedClients(): number {
    return Object.keys(this.connettedClients).length;
  }
}
