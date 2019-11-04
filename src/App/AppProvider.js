import React, {Component} from 'react'
import _ from 'lodash'
import moment from 'moment'

const cc = require('cryptocompare')
const MAX_FAVORITES =10
const TIME_UNITS=10
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
            setCurrentFavorite: this.setCurrentFavorite,
            setFilteredCoins: this.setFilteredCoins
        }
    }
    componentDidMount = () => {
        this.fetchCoins()
        this.fetchPrices()
        this.fetchHistorical()
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
    fetchHistorical = async () => {
        if(this.state.firstVisit) return
        let result = await this.historical()
        console.log(result)
        let historical = [
            {
                name: this.state.currentFavorite,
                data: result.map((ticker, index) => [
                    moment().subtract({month: TIME_UNITS - index}).valueOf(),
                    ticker.USD
                ])
            }
        ]
        this.setState({historical})
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
    historical = () => {
        let promises= []
        for(let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cc.priceHistorical(this.state.currentFavorite, ['USD'], 
                moment().subtract({months: units}).toDate())
            )
        }
        return Promise.all(promises)
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
        let currentFavorite = this.state.favorites[0]
        this.setState({firstVisit: false, page: 'dashboard', currentFavorite}, () => {
            this.fetchPrices()
        })
        localStorage.setItem('cryptoBoard', JSON.stringify({favorites: this.state.favorites, currentFavorite}))
    }
    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym
        })
        //merge the current with the currentFavorite
        localStorage.setItem('cryptoBoard', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoBoard')),
            currentFavorite: sym
        }))
    }
    savedSettings() {
        let cryptoBoardData = JSON.parse(localStorage.getItem('cryptoBoard'))
        if(!cryptoBoardData) {
            return {page: 'settings', firstVisit: true}
        }
        //override the default favorites
        let {favorites, currentFavorite} = cryptoBoardData
        return {favorites, currentFavorite}
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