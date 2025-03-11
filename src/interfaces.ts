/**
 * @license MIT
 * @copyright (c) 2025 Makar Emeliyanov
 * See LICENSE file in the project root for full license information.
 */

export interface Address {
    streetNumber?: string;
    streetName?: string;
    municipality?: string;
    region?: string;
    postCode?: string;
    country?: string;
    freeformAddress?: string;
}

export interface Provider {
    search(query: string): Promise<Address[]>;
}