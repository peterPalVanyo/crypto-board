import React from 'react'
import styled from 'styled-components'
import {backgroundColor2, fontSize2} from '../shared/Style'
import {AppContext} from '../App/AppProvider'
import _ from 'lodash'
import fuzzy from 'fuzzy'

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
`
const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    height: 25px;
    color: #1163c9;
    place-self: center left;
`
//debounde > to not fire early
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
    let coinSymbols = Object.keys(coinList)
    let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)
    //symbols and name in one list
    let allStringToSearch = coinSymbols.concat(coinNames)
    let fuzzyResult = fuzzy
    .filter(inputValue, allStringToSearch, {})
    //filter back the fuzzy result
    .map(result => result.string)
    //pick a list from the object based on the callback function
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName
        return (_.includes(fuzzyResult, symKey)  || _.includes(fuzzyResult, coinName))
    })
    setFilterCoins(filteredCoins)
}, 1000)
function filterCoins(e, setFilteredCoins, coinList) {
    let inputValue = e.target.value
    //when clear the searchfield to original
    if(!inputValue) {
        setFilteredCoins(null)
        return
    }
    handleFilter(inputValue, coinList, setFilteredCoins)
}
export default function() {
    return (
        <AppContext.Consumer>
        {({setFilteredCoins, coinList}) =>
            <SearchGrid>
                <h2>Search all coins</h2>
                <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
            </SearchGrid>

        }
        </AppContext.Consumer>)
}