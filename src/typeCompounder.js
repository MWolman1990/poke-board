import axios from 'axios'

export default async function typeCompounder(types, skip) {
    const typeUrls = types.map((type) => axios.get(`https://pokeapi.co/api/v2/type/${type}`))
    
    const arrayOfTypes = await axios.all(typeUrls)

    const firstArr = []

    arrayOfTypes.forEach((typeArr) => firstArr.push(...typeArr.data.pokemon))

    const finalArr = []

    firstArr.forEach((pokemonObj) => {
        const pkmn = pokemonObj.pokemon
        finalArr.push(pkmn)
    })

    const returnTwenty = finalArr.splice(skip, 20)

    return returnTwenty
    // const {data} = response
    // const {pokemon} = data
    // const returnTwenty = pokemon.splice(skip, 20)

    // const finalArr = []

    // returnTwenty.forEach((pokemonObj) => {
    //     const pkmn = pokemonObj.pokemon
    //     finalArr.push(pkmn)
    // })

    // return finalArr
}