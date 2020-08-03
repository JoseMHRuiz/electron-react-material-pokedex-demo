import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import { toFirstCharUpperCase } from '../utils/constants';
import axios from 'axios';

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, abilities, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Typography variant='h1'>
          {`${id}.`} {toFirstCharUpperCase(name)}
          <img src={front_default} alt='' />
        </Typography>
        <img
          style={{ width: '300px', height: '300px' }}
          src={fullImageUrl}
          alt=''
        />
        <Typography variant='h3'>Pokemon Info</Typography>
        <Typography variant='h6'> Abilities:</Typography>

        {abilities.map((ability) => {
          const { name } = ability.ability;
          return (
            <Typography key={name}>
              {' '}
              {`${toFirstCharUpperCase(name)}`}
            </Typography>
          );
        })}
        <Typography>Height: {height / 10} m </Typography>
        <Typography>Weight: {weight / 10} kg </Typography>
        <Typography variant='h6'> Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return (
            <Typography key={name}>
              {' '}
              {`${toFirstCharUpperCase(name)}`}
            </Typography>
          );
        })}
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button variant='contained' onClick={() => history.push('/')}>
          back to pokedex
        </Button>
      )}
    </>
  );
};
export default Pokemon;
