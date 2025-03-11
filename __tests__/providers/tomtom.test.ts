import { TomTomProvider } from "@/providers/tomtom";

const TEST_KEY: string = "test-api-key";
const TEST_BASE_URL: string = "test-base-url";
const TEST_API_VERSION: string = "2";
const TEST_EXTENSION: string = "test-extension";
const TEST_COUNTRY_SET: string = "AU";
const TEST_QUERY: string = "test";

let provider: TomTomProvider;

afterEach(() => {
    delete process.env.TOMTOM_API_KEY;
    delete process.env.TOMTOM_BASE_URL;
    delete process.env.TOMTOM_API_VERSION;
    delete process.env.TOMTOM_EXTENSION;
    delete process.env.TOMTOM_COUNTRY_SET;
});

//########### Validate Initialisation ###########

describe("validate API key", () => {
    test("API key should be set by constructor", () => {
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.apiKey).toBe(TEST_KEY);
    });
    
    test("API key should be set by environment variable", () => {
        process.env.TOMTOM_API_KEY = TEST_KEY;
        provider = new TomTomProvider();
        expect(provider.apiKey).toBe(TEST_KEY);
    });
    
    test("API key should throw error if not set", () => {
        expect(() => new TomTomProvider()).toThrow("TomTom API Key Not Found. Please set `TOMTOM_API_KEY` environment variable.");
    });
});

describe("validate base URL", () => {
    test("base URL should be set by environment variable", () => {
        process.env.TOMTOM_BASE_URL = TEST_BASE_URL;
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.baseUrl).toBe(TEST_BASE_URL);
    });
    
    test("base URL should default", () => {
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.baseUrl).toBe("api.tomtom.com");
    });
});

describe("validate API version", () => {
    test("API version should be set by environment variable", () => {
        process.env.TOMTOM_API_VERSION = TEST_API_VERSION;
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.apiVersion).toBe(TEST_API_VERSION);
    });
    
    test("API version should default", () => {
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.apiVersion).toBe("2");
    });
});

describe("validate extension", () => {
    test("extension should be set by environment variable", () => {
        process.env.TOMTOM_EXTENSION = TEST_EXTENSION;
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.extension).toBe(TEST_EXTENSION);
    });
    
    test("extension should default", () => {
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.extension).toBe("json");
    });
});

describe("validate country set", () => {
    test("country set should be set by environment variable", () => {
        process.env.TOMTOM_COUNTRY_SET = TEST_COUNTRY_SET;
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.countrySet).toBe(TEST_COUNTRY_SET);
    });
    
    test("country set should default", () => {
        provider = new TomTomProvider(TEST_KEY);
        expect(provider.countrySet).toBe("AU");
    });
});


//########### Test Endpoint Generation ###########

test("generate endpoint should return correct endpoint", () => {
    provider = new TomTomProvider(TEST_KEY);
    expect(provider.generateEndpoint(TEST_QUERY)).toBe("https://api.tomtom.com/search/2/search/test.json?key=test-api-key&countrySet=AU");
});

// ########### Test Search ###########

describe("TomTom search", () => {
    // Reset provider before each test
    beforeEach(() => {
        process.env.TOMTOM_API_KEY = TEST_KEY;
        provider = new TomTomProvider();
    });

    // Mock `fetch` Node function
    global.fetch = jest.fn(() => 
        Promise.resolve({ 
            json: () => Promise.resolve({ data: "mock-data" })
        })
    ) as jest.Mock;

    test("search should return mock data", async () => {
        const result: string = await provider.search(TEST_QUERY);

        // Check `fetch` was called with correct endpoint
        expect(fetch).toHaveBeenCalledWith(`https://api.tomtom.com/search/2/search/${TEST_QUERY}.json?key=test-api-key&countrySet=AU`);
        // Check `fetch` returned correct data
        expect(result).toBe(String({ data: "mock-data" }));
    });

    test("search should throw error", async () => {
        global.fetch = jest.fn(() => 
            Promise.reject(new Error("TomTom API error"))
        ) as jest.Mock;

        await expect(provider.search(TEST_QUERY)).rejects.toThrow("TomTom API error");
    });
});
