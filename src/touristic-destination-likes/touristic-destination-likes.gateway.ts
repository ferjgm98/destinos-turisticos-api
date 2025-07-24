import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

// Implementation from: https://docs.nestjs.com/websockets/gateways
@WebSocketGateway({
  cors: { origin: '*', credentials: false },
})
export class TouristicDestinationLikesGateway {
  @WebSocketServer()
  io: Server;

  broadcastLike(touristicDestinationId: number, likes: number) {
    this.io.emit('touristicDestinationLiked', {
      touristicDestinationId,
      likes,
    });
  }
}
