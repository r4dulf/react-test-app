import React from "react";
import { IPokemonList } from "../api/IPokeApi";
import { PokemonCard } from "./PokemonCard";
import "./PokemonList.scss";

export function PokemonList({ pokemonList }: { pokemonList: IPokemonList }) {
  return pokemonList.results ? (
    <ul className="pokemon-list">
      {pokemonList.results.map((pokemon) => (
        <li className="pokemon-list-item" key={pokemon.name}>
          <PokemonCard url={pokemon.url} />
        </li>
      ))}
    </ul>
  ) : null;
}
