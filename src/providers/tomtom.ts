import { Address, Provider } from "../interfaces.js";

// TomTom API docs: https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search

interface TomTomAddress {
    address: {
        streetNumber?: string;
        streetName?: string;
        municipalitySubdivision?: string;
        countrySubdivisionCode?: string;
        postalCode?: string;
        country?: string;
        freeformAddress?: string;
    };
}


export class TomTom implements Provider {
    apiKey?: string;
    baseUrl: string;
    apiVersion: string;
    extension: string;
    countrySet: string;

    private DEFAULT_BASE_URL: string = "api.tomtom.com";
    private DEFAULT_API_VERSION: string = "2";
    private DEFAULT_EXTENSION: string = "json";
    private DEFAULT_COUNTRY_SET: string = "AU";

    constructor(apiKey?: string) {
        this.apiKey = process.env.TOMTOM_API_KEY || apiKey;
        this.baseUrl = process.env.TOMTOM_BASE_URL || this.DEFAULT_BASE_URL;
        this.apiVersion = process.env.TOMTOM_API_VERSION || this.DEFAULT_API_VERSION;
        this.extension = process.env.TOMTOM_EXTENSION || this.DEFAULT_EXTENSION;
        this.countrySet = this.setCountrySet();

        if (!this.apiKey) {
            throw new Error("TomTom API Key Not Found. Please set `TOMTOM_API_KEY` environment variable.");
        }
    }

    async search(query: string): Promise<Address[]> {
        const encodedQuery: string = encodeURIComponent(query);
        const endpoint: string = this.generateEndpoint(encodedQuery);

        const results: Response = await fetch(endpoint);

        if (!results.ok) {
            const errorText: string = await results.text();
            throw new Error(`Error: ${results.status} - TomTom API error: ${errorText}`);
        }

        const data = await results.json() as { results: TomTomAddress[] };
        return data.results.map(result => this.mapAddress(result));
    }

    generateEndpoint(query: string): string {
        return `https://${this.baseUrl}/search/${this.apiVersion}/search/${query}.${this.extension}?key=${this.apiKey}&countrySet=${this.countrySet}`;
    }

    setCountrySet(): string {
        return (process.env.TOMTOM_COUNTRY_SET?.split(" ") || [this.DEFAULT_COUNTRY_SET]).join(",");
    }

    mapAddress(results: TomTomAddress): Address {
        const address = results.address;
        return {
            streetNumber: address.streetNumber,
            streetName: address.streetName,
            municipality: address.municipalitySubdivision,
            region: address.countrySubdivisionCode,
            postCode: address.postalCode,
            country: address.country,
            freeformAddress: address.freeformAddress
        };
    }
}
