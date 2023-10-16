import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './DataWrap.css'
import PokeCard from './PokeCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function DataWrap() {
    const [pokemon, setPokemon] = useState([])
    const [skip, setSkip] = useState(0)
    const [pokemonName, setPokemonName] = useState('')

    useEffect(() => {
        let ignore = false
        async function getPokemon() {
            try {
                if (pokemonName === '') {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`)
                    setPokemon(response.data.results)
                } else {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                    setPokemon([response.data])
                }
                
            } catch (e) {
                console.log(e)
            }
        }

        getPokemon()

        return () => {
            ignore = true
        }  
    }, [pokemonName])

    useEffect(() => {
        let ignore = false
        async function getPokemon() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${skip}`)
                setPokemon(response.data.results)
            } catch (e) {
                console.log(e)
            }
        }
        getPokemon()
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

    const changeName = (e) => {
        const casedValue = e.target.value
        setPokemonName(casedValue.toLowerCase())
    }

    return (
        <Container fluid className="page-container">
            <Row className="header-row" lg={3} md={1} sm={1} xs={1}>
                <Col className="header-container">
                    <div id="header">PókeBoard</div>
                </Col>
                <Col className="header-container">
                    <Form.Control 
                        className="name-search-box"
                        placeholder="Search by name"
                        onChange={(e) => changeName(e)}
                    />
                </Col>
                <Col className="page-button-container">
                    <Button onClick={() => changePage('-')} className="prev-next-button">Previous</Button>
                    <Button onClick={() => changePage('+')} className="prev-next-button">Next</Button>
                </Col>
            </Row>
            <Row lg={5} md={4} sm={2} className="card-container">
                {
                    pokemon !== undefined && pokemon.map((pkmn, i) => {
                        return <Col><PokeCard pkmn={pkmn}/></Col>
                    })
                }
            </Row>
        </Container>
    )
}

export default DataWrap