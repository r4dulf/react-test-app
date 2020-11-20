import React, { useEffect, useState } from 'react'
import { IPokemonList } from '../api/IPokeApi'
import { PokeApi } from '../api/PokeApi'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { PokemonList } from '../components/PokemonList'
import { SearchBar } from '../components/SearchBar'
import './PokemonPage.scss'

export function PokemonPage () {
    const defaultLimit = 20;
    const limitArray = [defaultLimit, 5, 10, 50].sort((a, b) => a - b);

    const [limit, setLimit] = useState(defaultLimit);
    const [pokemonCount, setPokemonCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pokemonList, setPokemonList] = useState<IPokemonList| undefined>(undefined);
    const [query, setQuery] = useState('');

    const offset = limit * currentPage;

    useEffect(() => {
        const getPokemonCount = async () => {
            const pokemons = await PokeApi.getPokemonList(0, 0);

            setPokemonCount(pokemons.count);
        }

        getPokemonCount();
    }, []);

    useEffect(() => {
        if (!query) {
            const setupPokemons = async () => {
                const pokemonList = await PokeApi.getPokemonList(offset, limit);
    
                setPokemonList(pokemonList);
                setPokemonCount(pokemonList.count);
            }
    
            setupPokemons();
        } else {
            const searchPokemons = async () => {
                const pokemonList = await PokeApi.searchPokemons(query, offset, limit);

                setPokemonList(pokemonList);
                setPokemonCount(pokemonList.count);
            }

            searchPokemons()
        }
        
    }, [offset, limit, query]);

    useEffect(() => {
        setCurrentPage(0);
    }, [limit, query]);

    return <>
        <Header/>

        <section className="content-wrapper">
            <div className="content">
                <div className="head-content">
                    <SearchBar updateQuery={(newQuery) => setQuery(newQuery)}/>
                    <div className="select-pokemon-count">
                        <span className="select-title">
                            Cards on page: 
                        </span>
                        <select
                            defaultValue = { defaultLimit }
                            onChange={(event) => {
                                setLimit(+event.target.value);
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
                </div>

                {pokemonList && <PokemonList pokemonList={pokemonList}/>}

                <div className="pagination-wrapper">
                    <Pagination
                        activePage={currentPage}
                        pokemonCount={pokemonCount}
                        limit={limit}
                        setPage={(page) => {
                            setCurrentPage(page);
                    }}/>
                </div>
            </div>
        </section>
    </>
}