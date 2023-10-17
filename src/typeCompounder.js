import axios from 'axios'

export default async function typeCompounder(type, skip) {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
    const {data} = response
    const {pokemon} = data
    const returnTwenty = pokemon.splice(skip, 20)

    const finalArr = []

    returnTwenty.forEach((pokemonObj) => {
        const pkmn = pokemonObj.pokemon
        finalArr.push(pkmn)
    })

    return finalArr
}