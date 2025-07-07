"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeypressGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const keypress_service_1 = require("./keypress.service");
let KeypressGateway = class KeypressGateway {
    keypressService;
    server;
    constructor(keypressService) {
        this.keypressService = keypressService;
    }
    async handleKeypress(data, client) {
        try {
            await this.keypressService.saveKeypress(data.key, data.code);
            const stats = await this.keypressService.getStats();
            this.server.emit('stats-update', stats);
            return { success: true };
        }
        catch (error) {
            console.error('Error handling keypress:', error);
            return { success: false, error: error.message };
        }
    }
    async handleGetStats(client) {
        try {
            const stats = await this.keypressService.getStats();
            client.emit('stats-update', stats);
        }
        catch (error) {
            console.error('Error getting stats:', error);
        }
    }
};
exports.KeypressGateway = KeypressGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], KeypressGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('keypress'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], KeypressGateway.prototype, "handleKeypress", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('get-stats'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], KeypressGateway.prototype, "handleGetStats", null);
exports.KeypressGateway = KeypressGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.CLIENT_URL || 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    }),
    __metadata("design:paramtypes", [keypress_service_1.KeypressService])
], KeypressGateway);
//# sourceMappingURL=keypress.gateway.js.map