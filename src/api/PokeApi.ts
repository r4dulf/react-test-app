import {
    IPokemonList
} from './IPokeApi'

export class PokeApi {
    private static api: string = "https://pokeapi.co/api/v2"
    private static pokemonsCount: number = 0

    public static async getPokemon(id: string | number) {
        const pokemon = await fetch(`${this.api}/pokemon/${id}`);
        const result = await pokemon.json();

        return result;
    }

    public static async getPokemonList(offset: number, limit:number): Promise<IPokemonList> {
        const pokemonList = await fetch(`${this.api}/pokemon?offset=${offset}&limit=${limit}`);
        const result = await pokemonList.json();

        return result;
    }

    public static async searchPokemons(query: string, offset: number, limit: number): Promise<IPokemonList> {
        if (!this.pokemonsCount) {
            const pokemonsInfo = await (
                await fetch(`${this.api}/pokemon?limit=1`)
            ).json() as IPokemonList;

            this.pokemonsCount = pokemonsInfo.count;
        }

        const pokemonList = await (
            await fetch(`${this.api}/pokemon?limit=${this.pokemonsCount}&offset=0`)
        ).json() as IPokemonList;
        
        const result = pokemonList.results
            .filter(item => item.name.split('-').join(' ').includes(query));

        return {
            next: null,
            previous: null,
            count: result.length,
            results: result.slice(offset, offset + limit)
        }
    }
}

