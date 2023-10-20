import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PokeCard.css'
import Card from 'react-bootstrap/Card';
import typeImgs from './resources/typeIconExport';
import Accordion from 'react-bootstrap/Accordion'

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
                    console.log(height, id, base_experience, weight)
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
                pic !== '' && <Card.Img key={pic} src={pic} alt={`${props.pkmn.name}`} className="poke-pic"/>
            }
            <Card.Title className="pokemon-name">{props.pkmn.name} - #{stats.id}</Card.Title>
            <Card.Body className="flex-column-centered">
                
                <Card.Text className="pokemon-types">
                    {
                        types.length > 0 ?
                            types.map((type) => {
                                return <span className={`${type}-bg type-icon`}><img className="type-svg" src={typeImgs[`${type}`]} alt={`${type}`}/></span>
                            }) :
                            <></>
                    }
                </Card.Text>
                <Accordion className="width-100-percent">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Stats</Accordion.Header>
                        <Accordion.Body>
                        <table style={{ width: '100%' }}>
                            <tr>
                                <th>id</th>
                                <td>{stats.id}</td>
                            </tr>
                            <tr>
                                <th>base experience</th>
                                <td>{stats.base_experience}</td>
                            </tr>
                            <tr>
                                <th>height</th>
                                <td>{stats.height}</td>
                            </tr>
                            <tr>
                                <th>weight</th>
                                <td>{stats.weight}</td>
                            </tr>
                        </table>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Damage Relations</Accordion.Header>
                        <Accordion.Body>
                        This displays how this pokemon is affected by other types
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
        
    )
}

export default PokeCard 