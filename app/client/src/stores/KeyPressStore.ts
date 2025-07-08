import { makeAutoObservable } from 'mobx';
import io from 'socket.io-client';

export interface KeypressStats {
    key: string;
    count: number;
}

class KeypressStore {
    stats: KeypressStats[] = [];
    socket: ReturnType<typeof io> | null = null;
    isConnected: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    initSocket() {
        if (this.socket) return;

        this.socket = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001');

        this.socket.on('connect', () => {
            this.isConnected = true;
            console.log('Connected to server');
            // Отримуємо початкову статистику
            this.socket?.emit('get-stats');
        });

        this.socket.on('disconnect', () => {
            this.isConnected = false;
            console.log('Disconnected from server');
        });

        this.socket.on('stats-update', (newStats: KeypressStats[]) => {
            this.stats = newStats;
        });
    }

    sendKeypress(key: string, code: string) {
        if (this.socket && this.isConnected) {
            this.socket.emit('keypress', { key, code });
        }
    }

    setInitialStats(stats: KeypressStats[]) {
        this.stats = stats;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }
}

export const keypressStore = new KeypressStore();