import React, { useState, useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import './PokemonCard.scss'

export function PokemonCard(props: { url: string }) {
    const [pokemon, setPokemon] = useState<any>()

    useEffect(() => {
        const getPokemonInfo = async () => {
            const pokemonInfo = await (await fetch(props.url)).json();

            setPokemon(pokemonInfo);
        }

        getPokemonInfo()
    }, [props.url]);

    return pokemon ? (
        <div className="pokemon-card">
            <div className="headline">
                <span className="pokemon-name">
                    { pokemon.name.split('-').join(' ') }

                    <sup className="pokemon-id">
                        #{ pokemon.id }
                    </sup>
                </span>
            </div>
            <div className="sprites">
                {
                    Object.keys(pokemon.sprites)
                        .filter((key) => typeof pokemon.sprites[key] === "string")
                        .reverse()
                        .map((key) => (
                            <div className="image-wrapper" key={key}>
                                <img src={pokemon.sprites[key] as string} alt="sprite"/>
                            </div>
                        ))
                }
            </div>
            <div className="stats">
                {
                    pokemon.stats.map((item: any) => (
                        <div className="stat-wrapper" key={item.stat.name}>
                            <div className="title-row">
                                <span className="stat-name">{ item.stat.name.split('-').join(' ') }</span>
                                <span className="stat-value">{ item.base_stat }</span>
                            </div>
                            <div className="progressbar-row">
                                <ProgressBar value={+item.base_stat} max={255} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    ) : null
}