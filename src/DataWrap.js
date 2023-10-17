import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './DataWrap.css'
import PokeCard from './PokeCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import typeCompounder from './typeCompounder.js'

function DataWrap() {
    const [pokemon, setPokemon] = useState([])
    const [skip, setSkip] = useState(0)
    const [pokemonName, setPokemonName] = useState('')
    const [staticTypes, setStaticTypes] = useState([])
    const [searchTypes, setSearchTypes] = useState([])
    const [typesSearched, setTypesSearched] = useState([])

    useEffect(() => {
        let ignore = false

        async function getStaticTypes() {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type')
                setStaticTypes(response.data.results)
            } catch(e) {
                console.log(e)
            }
        }

        getStaticTypes()

        return () => {
            ignore = true
        }
    }, [])

    useEffect(() => {
        let ignore = false
        async function getPokemon() {
            try {
                if (pokemonName === '' && searchTypes.length === 0) {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`)
                    setPokemon(response.data.results)
                } else if(searchTypes.length > 0) {
                    const response = await typeCompounder(searchTypes, skip)
                    setPokemon(response)
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
    }, [pokemonName, searchTypes])

    const changeName = (e) => {
        const casedValue = e.target.value
        setPokemonName(casedValue.toLowerCase())
    }

    useEffect(() => {
        let ignore = false
        async function getPokemon() {
            try {
                if (searchTypes.length === 0) {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${skip}`)
                    setPokemon(response.data.results)
                } else {
                    const response = await typeCompounder(searchTypes, skip)
                    setPokemon(response)
                }
                
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

    const changeType = (type) => {
        setSkip(0)
        const { name, url } = type
        const checkForType = searchTypes.find((item) => item === name)
        if (checkForType === undefined) {
            setSearchTypes((currentArr) => [...currentArr, name])
        } else {
            const newArr = searchTypes.filter((oldName) => oldName !== name)
            setSearchTypes(newArr)
        }
    }

    return (
        <Container fluid className="page-container">
            <Row>
                <Col className="header-container">
                    <div id="header">PókeBoard</div>
                </Col>
            </Row>
            <Row className="header-row" lg={3} md={1} sm={1} xs={1}>
                <Col className="header-container">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Search by Type
                        </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            staticTypes.length > 0 &&
                            staticTypes.map((type) => <div className="type-checkbox"><Form.Check onChange={() => changeType(type)}/>{type.name}</div>)
                        }
                    </Dropdown.Menu>
                    </Dropdown>
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
                        return <Col key={i + skip}><PokeCard pkmn={pkmn}/></Col>
                    })
                }
            </Row>
        </Container>
    )
}

export default DataWrap