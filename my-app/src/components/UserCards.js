import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const FlexRowWrapper = styled.div`
    display: flex;
`
const ColumnCard = styled.div`
    padding: 5em;
    background-color: #120136;
    color: #40bad5;
    font-family: 'Roboto Slab', serif;
    width: 35%;
    margin: 2%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 15px;
`;
const StyledRoundButton = styled.button `
    background-color: #fcbf1e;
    color: #035aa6;
    font-family: 'Roboto Slab', serif;
    border-radius: 15px

`

export default function UserCards() {
    const [characters, setCharacters] = useState([])
    useEffect (() => {
        getCharacters()
    }, []);
    const getCharacters = () => {
        axios
            .get('http://localhost:8000/api/users')
            .then(res => {
                console.log(res.data)
                setCharacters(res.data)
            })
            .catch(error => {
                console.log('You darn oof', error)
            })
    }
    const deleteButton = e => {
        e.preventDefault();
        axios
        .delete('http://localhost:8000/api/users/:id')
        .then(res => {
            getCharacters()
        })
        .catch(error => console.log('You done goofed up the DELETE button', error))
    }

    return ( 
        <FlexRowWrapper>
            {characters.map(character => {
                return (
                    <ColumnCard>
                        <h3>{character.name}</h3>
                        <p>{character.bio}</p>
                        <StyledRoundButton onClick={deleteButton}>DELETE</StyledRoundButton>
                    </ColumnCard>
                )
            })}
        </FlexRowWrapper>
    )
}
