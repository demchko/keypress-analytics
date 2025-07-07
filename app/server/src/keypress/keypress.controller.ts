import { Controller, Get } from '@nestjs/common';
import { KeypressService, KeypressStats } from './keypress.service';

@Controller('api/keypress')
export class KeypressController {
    constructor(private readonly keypressService: KeypressService) { }

    @Get('stats')
    async getStats(): Promise<KeypressStats[]> {
        return await this.keypressService.getStats();
    }
}