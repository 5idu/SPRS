import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './Home';
import Query from './Query';
import Historys from './History';
import About from './About';
import Login from './Login';
import PoList from './PoList';
import PoDetail from './PoDetail';
import PoPack from './PoPack';

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
        exact: true,
        name: 'PoList'
    },{
        path: '/home/:state/:soNum',
        component: PoDetail,
        exact: true,
        name: 'PoDetail'
    },{
        path: '/home/:state/:soNum/:itemsNum',
        component: PoPack,
        exact: true,
        name: 'PoPack'
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
