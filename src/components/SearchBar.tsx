import React, { useState, useEffect } from 'react';
import { IPokemonList } from '../api/IPokeApi';
import { PokeApi } from '../api/PokeApi';

interface ISearchBar {
    setPokemonList(list: IPokemonList): void,
    pokemonsCount: number
}

export function SearchBar(props: ISearchBar) {
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (query.length > 3) {
            const getAllPokemons = async () => {
                const { results } = await PokeApi.getPokemonList(0, props.pokemonsCount)
                const filteredList = results.filter( item => item.name.includes(query) )
                const pokemons: IPokemonList = {
                    count: filteredList.length,
                    next: null,
                    previous: null,
                    results: filteredList
                }
    
                props.setPokemonList(pokemons)
            }
    
            getAllPokemons()
        }
    }, [query])

    return (
        <div className="search-bar">
            <form onSubmit={
                (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()

                    const data = new FormData(e.target as HTMLFormElement);
                    const result = data.get('query') as string;

                    setQuery(result);
                }}>

                <input type="text" placeholder="Search (>3 characters)" name="query"/>
                <input type="submit" hidden={true}/>
            </form>
        </div>
    )
}