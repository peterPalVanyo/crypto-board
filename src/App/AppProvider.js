import React, {Component} from 'react'
import _ from 'lodash'

const cc = require('cryptocompare')
const MAX_FAVORITES =10
export const AppContext = React.createContext()

export class AppProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins
        }
    }
    componentDidMount = () => {
        this.fetchCoins()
        this.fetchPrices()
    }
    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data
        this.setState({coinList})
    }
    fetchPrices = async () => {
        if(this.state.firstVisit) return
        let prices = await this.prices()
        //for empty price object, filter out no keys
        prices = prices.filter(price => Object.keys(price).length)
        this.setState({prices})
    }
    //came back with promise array
    prices = async () => {
        let returnData = []
        for (let i = 0; i < this.state.favorites.length; i++) {
            try {let priceData = await cc.priceFull(this.state.favorites[i], 'USD')
            returnData.push(priceData)} catch(e) {
                console.warn('Fetch price error: ', e)}
        }
        return returnData
    }
    addCoin = key => {
        let favorites = [...this.state.favorites]
        if(favorites.length < MAX_FAVORITES) {
            favorites.push(key)
            this.setState({favorites})
        }
    }
    //using lodash here (add to the modul): pull this value from the array and return new array
    removeCoin = key => {
        let favorites = [...this.state.favorites]
        this.setState({favorites: _.pull(favorites, key)})
    }
    //lodash: is this key in that array?
    isInFavorites = key => _.includes(this.state.favorites, key)
    //arrow so binds to the this
    confirmFavorites = () => {
        this.setState({firstVisit: false, page: 'dashboard'}, () => {
            this.fetchPrices()
        })
        localStorage.setItem('cryptoBoard', JSON.stringify({favorites: this.state.favorites}))
    }
    savedSettings() {
        let cryptoBoardData = JSON.parse(localStorage.getItem('cryptoBoard'))
        if(!cryptoBoardData) {
            return {page: 'settings', firstVisit: true}
        }
        //override the default favorites
        let {favorites} = cryptoBoardData
        return {favorites}
    }
    setPage = page => this.setState({page})
    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})
    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}