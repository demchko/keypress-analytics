import { Server, Socket } from 'socket.io';
import { KeypressService } from './keypress.service';
interface KeypressData {
    key: string;
    code: string;
}
export declare class KeypressGateway {
    private readonly keypressService;
    server: Server;
    constructor(keypressService: KeypressService);
    handleKeypress(data: KeypressData, client: Socket): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    handleGetStats(client: Socket): Promise<void>;
}
export {};
