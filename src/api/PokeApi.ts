import {
    IPokemonList
} from './IPokeApi'

export class PokeApi {
    private static api: string = "https://pokeapi.co/api/v2"

    public static async getPokemon(id: string | number) {
        const pokemon = await fetch(`${this.api}/pokemon/${id}`);
        const result = await pokemon.json()

        return result
    }

    public static async getPokemonList(offset: number, limit:number = 20): Promise<IPokemonList> {
        const pokemonList = await fetch(`${this.api}/pokemon?offset=${offset}&limit=${limit}`)
        const result = await pokemonList.json()

        return result
    }
}

