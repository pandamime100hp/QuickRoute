import { TomTomProvider } from "../src/index.js";


describe("index", () => {
    test("index should export TomTomProvider", () => {
        expect(typeof TomTomProvider).toBe("function");
    });
});