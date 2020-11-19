import React, { useEffect, useState } from 'react'
import { IPokemonList } from '../api/IPokeApi'
import { PokeApi } from '../api/PokeApi'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { PokemonList } from '../components/PokemonList'
import './PokemonPage.scss'

export function PokemonPage () {
    const defaultLimit = 20;
    const limitArray = [defaultLimit, 5, 10, 50];

    limitArray.sort((a, b) => a - b);

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(defaultLimit);
    const [pokemonCount, setPokemonCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pokemonList, setPokemonList] = useState({} as IPokemonList);

    useEffect(() => {
        const getPokemonCount = async () => {
            const pokemons = await PokeApi.getPokemonList(0, 0);

            setPokemonCount(pokemons.count);
        }

        getPokemonCount();
    }, []);

    useEffect(() => {
        const setupPokemons = async () => {
            const pokemonList = await PokeApi.getPokemonList(offset, limit);

            setPokemonList(pokemonList);
        }

        setupPokemons();
    }, [offset, limit]);

    useEffect(() => {
        setOffset(limit * currentPage);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(0)
    }, [limit])



    return <>
        <Header/>

        <section className="content">
            <div className="pokemon-limit">
                <select
                    className="select-pokemon-count"
                    defaultValue = { defaultLimit }
                    onChange={(event) => {
                        setLimit(+event.target.value)
                    }}
                >
                    {limitArray.map(count => (
                        <option
                            value={count}
                            key={count}
                        >{ count }</option>
                    ))}
                </select>
            </div>

            <PokemonList pokemonList={pokemonList}/>

            <div className="pagination-wrapper">
                <Pagination
                    active={currentPage}
                    pokemonCount={pokemonCount}
                    limit={limit}
                    setPage={(page) => {
                        setCurrentPage(page);
                }}/>
            </div>
        </section>
    </>
}