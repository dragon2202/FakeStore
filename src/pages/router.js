import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './home'

//This page serves Single Pages
//Designed this way in case I need more pages
export default function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    )
}