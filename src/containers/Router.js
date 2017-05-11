import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './Home';
import Query from './Query';
import Historys from './History';
import About from './About';
import Login from './Login'

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
        name: 'Home'
    }, {
        path: '/home',
        component: Home,
        name: 'Home'
    }, {
        path: '/query',
        component: Query,
        name: 'Query'
    }, {
        path: '/historys',
        component: Historys,
        name: 'Historys'
    }, {
        path: '/about',
        component: About,
        name: 'About'
    }, {
        path: '/login',
        component: Login,
        name: 'Login'
    }
]

export default() => (
    <BrowserRouter>
        <div>
            {routes.map((route, i) => (
                <Route
                    key={i}
                    exact={route.exact}
                    path={route.path}
                    render={props => (<route.component {...props} routeName={route.name}/>)}/>
            ))}
        </div>
    </BrowserRouter>
)
