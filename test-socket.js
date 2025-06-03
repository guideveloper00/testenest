import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000/ws/statistics');

socket.on('connect', () => {
  console.log('Conectado ao WebSocket!');
});

socket.on('statisticsUpdate', (data) => {
  console.log('Estatísticas recebidas:', data);
});

socket.on('disconnect', () => {
  console.log('Desconectado.');
});
