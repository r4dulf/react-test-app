import React, { useState, useEffect } from 'react'
import { PokeApi } from '../api/PokeApi'
import { IPokemonList } from '../api/IPokeApi'
import { PokemonCard } from './PokemonCard';
import './PokemonList.scss'

export function PokemonList(props: { offset: number, limit?: number }) {
    const [pokemonList, setPokemonList] = useState({} as IPokemonList);
    const { offset, limit } = props;

    useEffect(() => {
        const setupPokemons = async () => {
            const pokemonList = await PokeApi.getPokemonList(offset, limit);

            setPokemonList(pokemonList);
        }

        setupPokemons();
    }, [offset, limit]);

    return pokemonList.results? (
        <ul className="pokemon-list">
            {
                pokemonList.results.map(pokemon => (
                    <li className="pokemon-list-item" key={pokemon.name}>
                        <PokemonCard url={pokemon.url} />
                    </li>
                ))
            }
        </ul>
    ) : null
}