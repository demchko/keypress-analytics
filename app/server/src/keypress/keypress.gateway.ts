import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { KeypressService } from './keypress.service';

interface KeypressData {
    key: string;
    code: string;
}

@WebSocketGateway({
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})
export class KeypressGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly keypressService: KeypressService) { }

    @SubscribeMessage('keypress')
    async handleKeypress(
        @MessageBody() data: KeypressData,
        @ConnectedSocket() client: Socket,
    ) {
        try {
            // Зберігаємо натискання в базу даних
            await this.keypressService.saveKeypress(data.key, data.code);

            // Отримуємо оновлену статистику
            const stats = await this.keypressService.getStats();

            // Відправляємо оновлену статистику всім клієнтам
            this.server.emit('stats-update', stats);

            return { success: true };
        } catch (error) {
            console.error('Error handling keypress:', error);
            return { success: false, error: error.message };
        }
    }

    @SubscribeMessage('get-stats')
    async handleGetStats(@ConnectedSocket() client: Socket) {
        try {
            const stats = await this.keypressService.getStats();
            client.emit('stats-update', stats);
        } catch (error) {
            console.error('Error getting stats:', error);
        }
    }
}