import highchartsConfig from './HighchartsConfig'
import React from 'react'
import {Tile} from '../shared/Tile'
import {AppContext} from '../App/AppProvider'
import ReactHighcharts from 'react-highcharts'
import HighchartsTheme from './HighchartsTheme'

ReactHighcharts.Highcharts.setOptions(HighchartsTheme)

export default function() {
    return (
        <AppContext.Consumer>
            {({historical}) => 
                <Tile>
                    <ReactHighcharts config={highchartsConfig(historical)}/>
                </Tile>
            }
        </AppContext.Consumer>
    )
}