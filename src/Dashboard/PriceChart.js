import highchartsConfig from './HighchartsConfig'
import React from 'react'
import {Tile} from '../shared/Tile'
import {AppContext} from '../App/AppProvider'
import ReactHighcharts from 'react-highcharts'

export default function() {
    return (
        <AppContext.Consumer>
            {({}) => 
                <Tile>
                    <ReactHighcharts config={highchartsConfig()}/>
                </Tile>
            }
        </AppContext.Consumer>
    )
}