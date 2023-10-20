import axios from 'axios'

export default async function typeCompounder(types, skip) {
    const typeUrls = types.map((type) => axios.get(`https://pokeapi.co/api/v2/type/${type}`))
    
    const arrayOfTypes = await axios.all(typeUrls)

    const firstArr = []

    arrayOfTypes.forEach((typeArr) => firstArr.push(...typeArr.data.pokemon))

    const finalArr = []

    const doublesChecked = function(data) {
        const obj = {}
        const counter = 0

        data.forEach((item) => {
            obj[item.pokemon.name] = obj[item.pokemon.name] ? ++obj[item.pokemon.name] : 1
        })

        return obj
    }(firstArr)

    const testArr = []
    
    Object.keys(doublesChecked).forEach((key) => {
        if (doublesChecked[key] === 2) {
            const newObj = {
                name: key,
                url: `https://pokeapi.co/api/v2/${key}`
            }
            testArr.push(newObj)
        }
    })

    firstArr.forEach((pokemonObj) => {
        const pkmn = pokemonObj.pokemon

        finalArr.push(pkmn)
    })
    
    const returnTwenty = types.length === 1 ? finalArr.splice(skip, 20) : testArr.splice(skip, 20)

    return returnTwenty
}