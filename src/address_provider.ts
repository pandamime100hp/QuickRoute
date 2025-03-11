/**
 * @license MIT
 * @copyright (c) 2025 Makar Emeliyanov
 * See LICENSE file in the project root for full license information.
 */

import { Provider, Address } from "./interfaces.js";

export class AddressProvider {
    private provider: Provider;

    constructor(provider: Provider) {
        this.provider = provider;
    }

    setProvider(provider: Provider) {
        this.provider = provider;
    }

    async search(query: string): Promise<Address[]> {
        return this.provider.search(query);
    }
}
