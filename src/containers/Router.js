import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './Home';
import Query from './Query';
import Historys from './History';
import About from './About';
import Login from './Login';
import PoList from './PoList';

const routes = [
    {
        path: '/',
        component: Login,
        exact: true,
        name: 'Login'
    }, {
        path: '/home',
        component: Home,
        exact: true,
        name: 'Home'
    },{
        path: '/home/:state',
        component: PoList,
        name: 'PoList'
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
