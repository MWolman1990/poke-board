import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PokeCard.css'
import Card from 'react-bootstrap/Card';
import typeImgs from './resources/typeIconExport';
import Accordion from 'react-bootstrap/Accordion'
import DamageRelations from './DamageRelations';

function PokeCard(props) {
    const { pkmn } = props
    const [ types, setTypes ] = useState([])
    const [ pic, setPic ] = useState('')
    const [ damageRelations, setDamageRelations ] = useState([])
    const [ stats, setStats ] = useState({})
    useEffect(() => {
        let ignore = false
        if (!ignore) {
            async function fetchTypes() {
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmn.name}`)
                .then((res) => {
                    const { data } = res
                    const { height, id, base_experience, weight } = data
                    
                    // Set stats
                    setStats({ height, id, base_experience, weight })

                    // Set types
                    setTypes([])
                    data.types.forEach((type) => {
                        
                            const { name } = type.type
                            setTypes((types) => [...types, name])
                        
                    })

                    // Set picture
                    setPic(data.sprites.front_default)
                }).catch((err) => console.log(err))
            }
            
            fetchTypes()
        }

        return () => {
            ignore = true
        }
    }, [pkmn])

    return (
        <Card className="poke-card">
            {
                pic !== '' && <div className="poke-pic-container"><Card.Img key={pic} src={pic} alt={`${props.pkmn.name}`} className="poke-pic"/><span className="poke-number">#{stats.id}</span></div>
            }
            <Card.Title className="pokemon-name">{props.pkmn.name}</Card.Title>
            <Card.Body className="flex-column-centered">
                <Card.Text className="pokemon-types">
                    {
                        types.length > 0 ?
                            types.map((type) => {
                                return <span key={`${type}-pokecard`} className={`${type}-bg type-icon`}><img className="type-svg" src={typeImgs[`${type}`]} title={`${type}`}/></span>
                            }) :
                            <></>
                    }
                </Card.Text>
            </Card.Body>
        </Card>
        
    )
}

export default PokeCard 