import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeypressService } from './keypress.service';
import { KeypressGateway } from './keypress.gateway';
import { KeypressController } from './keypress.controller';
import { Keypress } from './entities/keypress.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Keypress])],
    providers: [KeypressService, KeypressGateway],
    controllers: [KeypressController],
})
export class KeypressModule { }