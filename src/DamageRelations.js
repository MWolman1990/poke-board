import React, { useState, useEffect } from 'react'
import axios from 'axios'
import typeImgs from './resources/typeIconExport';

const DamageRelations = (props) => {
    const { types, name } = props
    const [ damageRelations, setDamageRelations ] = useState({})
    // Make api call to get data on type

    useEffect(() => {
        let ignore = false
        if (!ignore) {
            async function getTypeData() {
                const typeCalls = types.map((type) => {
                    return axios.get(`https://pokeapi.co/api/v2/type/${type}`)
                })
                
                const results = await axios.all(typeCalls)
                
                const doubleDamageFrom = []
                const halfDamageFrom = []
                const noDamageFrom = []

                results.forEach((res) => {
                    const { data } = res
                    const { damage_relations } = data
                    
                    const headerKeys = Object.keys(damage_relations)
                    headerKeys.forEach((header_key) => {
                        switch(header_key) {
                            case 'double_damage_from':
                                doubleDamageFrom.push(...damage_relations[header_key].map((dr) => dr.name))
                                break
                            case 'half_damage_from':
                                halfDamageFrom.push(...damage_relations[header_key].map((dr) => dr.name))
                                break
                            case 'no_damage_from':
                                noDamageFrom.push(...damage_relations[header_key].map((dr) => dr.name))
                                break
                        }
                    })
                })

                

                const quadrupleDamageFrom = doubleDamageFrom.filter((val, i, arr) => arr.indexOf(val) !== i)
                const finalDoubleDamageFrom = doubleDamageFrom.filter((val) => quadrupleDamageFrom.indexOf(val) === -1 && noDamageFrom.indexOf(val) === -1)

                const quarterDamageFrom = halfDamageFrom.filter((val, i, arr) => arr.indexOf(val) !== i)
                const finalHalfDamageFrom = halfDamageFrom.filter((val) => quarterDamageFrom.indexOf(val) === -1 && noDamageFrom.indexOf(val) === -1)

                name === 'charizard' && console.log(
                        quadrupleDamageFrom, 
                        finalDoubleDamageFrom,
                        quarterDamageFrom,
                        finalHalfDamageFrom,
                        noDamageFrom,
                    )
                setDamageRelations({
                    quadrupleDamageFrom, 
                    finalDoubleDamageFrom,
                    quarterDamageFrom,
                    finalHalfDamageFrom,
                    noDamageFrom,
                })
            }
            getTypeData()
        }
        return () => {
            ignore = true
        }
    }, [types])

    return (
        <div className="damage-relations-container">
            <table className="damage-relations-table">
                <tbody>
                    {
                        damageRelations.quadrupleDamageTo !== undefined && damageRelations.quadrupleDamageTo.length > 0 &&
                        <tr>
                            <td>
                                <h5>Quadruple Damage To</h5>
                            </td>
                            <td>
                                <div className="damage-relations-type-container">
                                    {
                                        damageRelations.quadrupleDamageTo !== undefined &&
                                        damageRelations.quadrupleDamageTo.map((type) => <span key={`${type}-qddf-${name}`} className={`${type}-bg type-icon`}><img className="type-svg" src={typeImgs[`${type}`]} alt={`${type}`}/></span>)
                                    }
                                </div>
                            </td>
                        </tr>
                    }
                    {
                        damageRelations.finalDoubleDamageTo !== undefined && damageRelations.finalDoubleDamageTo.length > 0 &&
                        <tr>
                            <td>
                                <h5>Double Damage To</h5>
                            </td>
                            <td>
                                <div className="damage-relations-type-container">
                                    {
                                        damageRelations.finalDoubleDamageTo !== undefined &&
                                        damageRelations.finalDoubleDamageTo.map((type) => <span key={`${type}-qddf-${name}`} className={`${type}-bg type-icon`}><img className="type-svg" src={typeImgs[`${type}`]} alt={`${type}`}/></span>)
                                    }
                                </div>
                            </td>
                        </tr>
                    }
                    {
                        damageRelations.noDamageTo !== undefined && damageRelations.noDamageTo.length > 0 &&
                        <tr>
                            <td>
                                <h5>No Damage To</h5>
                            </td>
                            <td>
                                <div className="damage-relations-type-container">
                                    {
                                        damageRelations.noDamageTo !== undefined &&
                                        damageRelations.noDamageTo.map((type) => <span key={`${type}-qddf-${name}`} className={`${type}-bg type-icon`}><img className="type-svg" src={typeImgs[`${type}`]} alt={`${type}`}/></span>)
                                    }
                                </div>
                            </td>
                        </tr>
                    }
                    {
                        damageRelations.quadrupleDamageFrom !== undefined && damageRelations.quadrupleDamageFrom.length > 0 &&
                        <tr>
                            <td>
                                <h5>Quadruple Damage From</h5>
                            </td>
                            <td>
                                <div className="damage-relations-type-container">
                                    {
                                        damageRelations.quadrupleDamageFrom !== undefined &&
                                        damageRelations.quadrupleDamageFrom.map((type) => <span key={`${type}-qddf-${name}`} className={`${type}-bg type-icon`}><img className="type-svg" src={typeImgs[`${type}`]} alt={`${type}`}/></span>)
                                    }
                                </div>
                            </td>
                        </tr>
                    }
                    {
                        damageRelations.finalDoubleDamageFrom !== undefined && damageRelations.finalDoubleDamageFrom.length > 0 &&
                        <tr>
                            <td>
                                <h5>Double Damage From</h5>
                            </td>
                            <td>
                                <div className="damage-relations-type-container">
                                    {
                                        damageRelations.finalDoubleDamageFrom !== undefined &&
                                        damageRelations.finalDoubleDamageFrom.map((type) => <span key={`${type}-qddf-${name}`} className={`${type}-bg type-icon`}><img className="type-svg" src={typeImgs[`${type}`]} alt={`${type}`}/></span>)
                                    }
                                </div>
                            </td>
                        </tr>
                    }
                    {
                        damageRelations.noDamageFrom !== undefined && damageRelations.noDamageFrom.length > 0 &&
                        <tr>
                            <td>
                                <h5>No Damage From</h5>
                            </td>
                            <td>
                                <div className="damage-relations-type-container">
                                    {
                                        damageRelations.noDamageFrom !== undefined &&
                                        damageRelations.noDamageFrom.map((type) => <span key={`${type}-qddf-${name}`} className={`${type}-bg type-icon`} title={type}><img className="type-svg" src={typeImgs[`${type}`]} alt={type} title={type}/></span>)
                                    }
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            

        </div>
    )
}

export default DamageRelations