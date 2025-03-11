import { AddressProvider } from "../src/address_provider";
import { Address } from "../src/interfaces";
import { TomTom } from "../src/providers/tomtom";

const TEST_KEY: string = "test-api-key";

describe("AddressProvider", () => {
    let provider: AddressProvider;
    let address: Address[];

    const SAMPLE_TOMTOM_ADDRESSES = [
        {
            address:{
                streetNumber: "123",
                streetName: "Main St",
                municipalitySubdivision: "Sydney",
                countrySubdivisionCode: "NSW",
                postalCode: "2000",
                country: "Australia",
                freeformAddress: "123 Main St, Sydney NSW 2000, Australia"
            }
        },
        {
            address:{
                streetNumber: "456",
                streetName: "Baker St",
                municipalitySubdivision: "Perth",
                countrySubdivisionCode: "WA",
                postalCode: "6151",
                country: "Australia",
                freeformAddress: "456 Baker St, Perth WA 6151, Australia"
            }
        }
    ];

    beforeEach(() => {
        global.fetch = jest.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ results: SAMPLE_TOMTOM_ADDRESSES })
            })
        ) as jest.Mock;
    });

    test("search should return addresses", async () => {
        provider = new AddressProvider(new TomTom(TEST_KEY));
        address = await provider.search("test-query");
        expect(address.length).toBeGreaterThan(0);
    });

    test("AddressProvider should accept different provider objects", async () => {
        provider = new AddressProvider(new TomTom(TEST_KEY));
        address = await provider.search("test-query");
        expect(address.length).toBeGreaterThan(0);

        provider.setProvider(new TomTom(TEST_KEY));
        address = await provider.search("test-query");
        expect(address.length).toBeGreaterThan(0);
    });
});