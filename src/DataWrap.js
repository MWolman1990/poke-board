import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './DataWrap.css'
import PokeCard from './PokeCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DataWrap() {
    const [pokemon, setPokemon] = useState([])
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?skip=${skip}`)
            .then((res) => {
                setPokemon(res.data.results)
            }).catch((err) => console.log(err))
    }, [pokemon])

    // Four rows
    // Five columns per row
    // I need to return four rows and each row needs one column
    // The final return needs to be a wrapper?

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div id="header">PókeBoard</div>
                </Col>
            </Row>
            <Row lg={5} md={4} sm={2}>
                {
                    pokemon.map((pkmn, ) => {
                        return <Col><PokeCard pkmn={pkmn}/></Col>
                    })
                }
            </Row>
        </Container>
        // <div id="data-wrapper">
        //     <div id="header">
        //         PókeBoard
        //     </div>
        //     <div id="pokecard-container">

        //     </div>
        // </div>
    )
}

export default DataWrap