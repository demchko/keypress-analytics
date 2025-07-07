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
exports.KeypressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const keypress_entity_1 = require("./entities/keypress.entity");
let KeypressService = class KeypressService {
    keypressRepository;
    constructor(keypressRepository) {
        this.keypressRepository = keypressRepository;
    }
    async saveKeypress(key, code) {
        const keypress = this.keypressRepository.create({ key, code });
        return await this.keypressRepository.save(keypress);
    }
    async getStats() {
        const result = await this.keypressRepository
            .createQueryBuilder('keypress')
            .select('keypress.key', 'key')
            .addSelect('COUNT(keypress.key)', 'count')
            .groupBy('keypress.key')
            .orderBy('count', 'DESC')
            .getRawMany();
        return result.map(item => ({
            key: item.key,
            count: parseInt(item.count),
        }));
    }
};
exports.KeypressService = KeypressService;
exports.KeypressService = KeypressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(keypress_entity_1.Keypress)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], KeypressService);
//# sourceMappingURL=keypress.service.js.map