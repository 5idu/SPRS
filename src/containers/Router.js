import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './Home';
import Query from './Query';
import Historys from './History';
import About from './About';
import Login from './Login';
import PoList from './PoList';
import PoDetail from './PoDetail';
import PoPackList from './PoPackList';
import PoPackTable from './PoPackTable';
import PoPackProgress from './PoPackProgress';
import Chart from './Chart';
import QueryByPo from './QueryByPo';
import QueryByPoItem from './QueryByPoItem';
import QueryByPn from './QueryByPn';
import QueryByDescription from './QueryByDescription';
import ListForMatnr from './ListForMatnr';
import ListForDescription from './ListForDescription';

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
        path: '/home/st6/:soNum/:itemsNum',
        component: PoPackList,
        exact: true,
        name: 'PoPackList'
    },{
        path: '/home/st5/:soNum/:itemsNum',
        component: PoPackProgress,
        exact: true,
        name: 'PoPackProgress'
    },{
        path: '/home/st1/:soNum/:itemsNum',
        component: PoPackTable,
        exact: true,
        name: 'PoPackTable'
    },{
        path: '/home/st2/:soNum/:itemsNum',
        component: PoPackTable,
        exact: true,
        name: 'PoPackTable'
    }, {
        path: '/home/st3/:soNum/:itemsNum',
        component: PoPackTable,
        exact: true,
        name: 'PoPackTable'
    },{
        path: '/home/st4/:soNum/:itemsNum',
        component: PoPackTable,
        exact: true,
        name: 'PoPackTable'
    },{
        path: '/home/st1/:soNum/:itemsNum/:packListNo',
        component: PoPackProgress,
        exact: true,
        name: 'PoPackProgress'
    },{
        path: '/home/st2/:soNum/:itemsNum/:packListNo',
        component: PoPackProgress,
        exact: true,
        name: 'PoPackProgress'
    },{
        path: '/home/st3/:soNum/:itemsNum/:packListNo',
        component: PoPackProgress,
        exact: true,
        name: 'PoPackProgress'
    },{
        path: '/home/st4/:soNum/:itemsNum/:packListNo',
        component: PoPackProgress,
        exact: true,
        name: 'PoPackProgress'
    },{
        path: '/home/st6/:soNum/:itemsNum/Packaging',
        component: PoPackProgress,
        exact: true,
        name: 'PoPackProgress'
    },{
        path: '/chart',
        component: Chart,
        exact: true,
        name: 'Chart'
    },{
        path: '/query',
        component: Query,
        exact: true,
        name: 'Query'
    },{
        path: '/query/po',
        component: QueryByPo,
        exact: true,
        name: 'Query by PO number'
    },{
        path: '/query/po&item',
        component: QueryByPoItem,
        exact: true,
        name: 'Query by PO+Item number'
    },{
        path: '/query/pn',
        component: QueryByPn,
        exact: true,
        name: 'Query by PN#'
    },{
        path: '/query/description',
        component: QueryByDescription,
        exact: true,
        name: 'Query by Description'
    },{
        path: '/query/matnr/:pn',
        component: ListForMatnr,
        exact: true,
        name: 'PO Content'
    },{
        path: '/query/desc/:desc',
        component: ListForDescription,
        exact: true,
        name: 'Progress'
    },{
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
