"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeypressModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const keypress_service_1 = require("./keypress.service");
const keypress_gateway_1 = require("./keypress.gateway");
const keypress_controller_1 = require("./keypress.controller");
const keypress_entity_1 = require("./entities/keypress.entity");
let KeypressModule = class KeypressModule {
};
exports.KeypressModule = KeypressModule;
exports.KeypressModule = KeypressModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([keypress_entity_1.Keypress])],
        providers: [keypress_service_1.KeypressService, keypress_gateway_1.KeypressGateway],
        controllers: [keypress_controller_1.KeypressController],
    })
], KeypressModule);
//# sourceMappingURL=keypress.module.js.map