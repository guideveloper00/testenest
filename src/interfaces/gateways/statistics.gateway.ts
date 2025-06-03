import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/ws/statistics', cors: false })
export class StatisticsGateway {
  @WebSocketServer()
  server: Server;

  sendStatisticsUpdate(stats: any) {
    this.server.emit('statisticsUpdate', stats);
  }
}
