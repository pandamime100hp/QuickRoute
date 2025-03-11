import { TomTomProvider } from "@/index";


describe("index", () => {
    test("index should export TomTomProvider", () => {
        expect(typeof TomTomProvider).toBe("function");
    });
});