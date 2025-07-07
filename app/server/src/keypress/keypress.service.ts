import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keypress } from './entities/keypress.entity';

export interface KeypressStats {
    key: string;
    count: number;
}

@Injectable()
export class KeypressService {
    constructor(
        @InjectRepository(Keypress)
        private keypressRepository: Repository<Keypress>,
    ) { }

    async saveKeypress(key: string, code: string): Promise<Keypress> {
        const keypress = this.keypressRepository.create({ key, code });
        return await this.keypressRepository.save(keypress);
    }

    async getStats(): Promise<KeypressStats[]> {
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
}