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