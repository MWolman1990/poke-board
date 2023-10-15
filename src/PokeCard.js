import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PokeCard.css'
import Card from 'react-bootstrap/Card';

function PokeCard(props) {
    const { pkmn } = props
    const [ types, setTypes ] = useState([])
    const [ pic, setPic ] = useState('')

    useEffect(() => {
        let ignore = false

        async function fetchTypes() {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmn.name}`)
            .then((res) => {
                const { data } = res
                
                // Set types
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
    }, [])

    return (
        // <div>
            
        //     <div></div>
        //     <div>

        //     </div>
        // </div>
        <Card className="poke-card">
            {
                pic !== '' && <Card.Img key={pic} src={pic} alt={`${props.pkmn.name}`}/>
            }
            <Card.Body>
                <Card.Title className="pokemon-name">{props.pkmn.name}</Card.Title>
                <Card.Text className="pokemon-types">
                    {
                        types.length > 0 ?
                            types.map((type) => {
                                return <h2 key={`${type}${props.pkmn.name}`}>{type}</h2>
                            }) :
                            <></>
                    }
                </Card.Text>
            </Card.Body>
        </Card>
        
    )
}

export default PokeCard 