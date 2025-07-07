import { KeypressService, KeypressStats } from './keypress.service';
export declare class KeypressController {
    private readonly keypressService;
    constructor(keypressService: KeypressService);
    getStats(): Promise<KeypressStats[]>;
}
