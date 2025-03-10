export interface ProviderInterface {
    search(query: string): Promise<string>;
}