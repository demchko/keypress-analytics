import { Repository } from 'typeorm';
import { Keypress } from './entities/keypress.entity';
export interface KeypressStats {
    key: string;
    count: number;
}
export declare class KeypressService {
    private keypressRepository;
    constructor(keypressRepository: Repository<Keypress>);
    saveKeypress(key: string, code: string): Promise<Keypress>;
    getStats(): Promise<KeypressStats[]>;
}
