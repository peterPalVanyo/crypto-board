import React, {Component} from 'react'

const cc = require('cryptocompare')

export const AppContext = React.createContext()

export class AppProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    }
    componentDidMount = () => {
        this.fetchCoins()
    }
    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data
        this.setState({coinList})
    }
    //arrow so binds to the this
    confirmFavorites = () => {
        this.setState({firstVisit: false, page: 'dashboard'})
        localStorage.setItem('cryptoBoard', JSON.stringify({test: 'thisistest'}))
    }
    savedSettings() {
        let cryptoBoardData = JSON.parse(localStorage.getItem('cryptoBoard'))
        if(!cryptoBoardData) {
            return {page: 'settings', firstVisit: true}
        }
        return {}
    }
    setPage = page => this.setState({page})
    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}