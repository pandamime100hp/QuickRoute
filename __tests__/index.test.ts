import { TomTom } from "../src/index.js";


describe("index", () => {
    test("index should export TomTomProvider", () => {
        expect(typeof TomTom).toBe("function");
    });
});