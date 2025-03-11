export interface AddressInterface {
    streetNumber?: string;
    streetName?: string;
    municipality?: string;
    region?: string;
    postCode?: string;
    country?: string;
    freeformAddress?: string;
}

export interface ProviderInterface {
    search(query: string): Promise<AddressInterface[]>;
}