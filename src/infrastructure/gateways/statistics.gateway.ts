import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IStatisticsGateway } from '../types/statistics-gateway';

@WebSocketGateway({ namespace: '/ws/statistics', cors: false })
export class StatisticsGateway implements IStatisticsGateway {
  @WebSocketServer()
  server: Server;

  sendStatisticsUpdate(stats: any) {
    this.server.emit('statisticsUpdate', stats);
  }
}
