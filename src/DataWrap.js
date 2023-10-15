import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './DataWrap.css'
import PokeCard from './PokeCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

function DataWrap() {
    const [pokemon, setPokemon] = useState([])
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        let ignore = false

        async function fetchPokemon() {
            await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${skip}`)
            .then((res) => {
                setPokemon(res.data.results)
            }).catch((err) => console.log(err))
        }
        
        fetchPokemon()

        return () => {
            ignore = true
        }
    }, [skip])

    const changePage = async (modifier) => {
        if (modifier === '+') {
            setSkip((currentSkip) => currentSkip+20)
        } else if (modifier === '-') {
            console.log(skip)
            setSkip((currentSkip) => currentSkip > 0 && currentSkip-20)
        }
    }

    // Four rows
    // Five columns per row
    // I need to return four rows and each row needs one column
    // The final return needs to be a wrapper?

    return (
        <Container fluid className="page-container">
            <Row className="header-row">
                <Col className="header-container">
                    <div id="header">PókeBoard</div>
                </Col>
                <Col className="page-button-container">
                    <Button onClick={() => changePage('-')}>Previous</Button>
                    <Button onClick={() => changePage('+')}>Next</Button>
                </Col>
            </Row>
            <Row lg={5} md={4} sm={2} className="card-container">
                {
                    pokemon.map((pkmn, ) => {
                        return <Col><PokeCard pkmn={pkmn}/></Col>
                    })
                }
            </Row>
        </Container>
    )
}

export default DataWrap