import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PokeCard.css'
import Card from 'react-bootstrap/Card';

function PokeCard(props) {
    const { pkmn } = props
    const [ types, setTypes ] = useState([])
    const [ pic, setPic ] = useState('')

    useEffect(() => {
        console.log(props)
        let ignore = false

        async function fetchTypes() {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmn.name}`)
            .then((res) => {
                const { data } = res
                
                // Set types
                setTypes([])
                data.types.forEach((type) => {
                    if (!ignore) {
                        const { name } = type.type
                        setTypes((types) => [...types, name])
                    }
                })

                // Set picture
                setPic(data.sprites.front_default)
            }).catch((err) => console.log(err))
        }
        
        fetchTypes()

        return () => {
            ignore = true
        }
    }, [pkmn])

    return (
        <Card className="poke-card">
            {
                pic !== '' && <Card.Img key={pic} src={pic} alt={`${props.pkmn.name}`} className="poke-pic"/>
            }
            <Card.Body>
                <Card.Title className="pokemon-name">{props.pkmn.name}</Card.Title>
                <Card.Text className="pokemon-types">
                    {
                        types.length > 0 ?
                            types.map((type) => {
                                return <span key={`${type}${props.pkmn.name}`}>{type}</span>
                            }) :
                            <></>
                    }
                </Card.Text>
            </Card.Body>
        </Card>
        
    )
}

export default PokeCard 