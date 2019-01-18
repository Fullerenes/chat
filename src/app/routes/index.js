import React from 'react';
import { Redirect } from 'react-router-dom';
import Links from './links'
import App from '../App'
import { Home } from '../pages/Public'
import { RoomPage, Rooms } from '../pages/Authorized'
import { Login, Registration, NotFound } from '../pages/PublicOnly'

const PrivateRoute = ({ component: Component, ...rest }) => (
    {
        ...rest,
        render: (props) => (
            props.auth ? (
                <Component {...props} />
            ) : (
                    <Redirect to={Links.Login} />
                )
        )
    }
);
const CommonOnlyRoute = ({ component: Component, ...rest }) => (
    {
        ...rest,
        render: (props) => (
            !props.auth ? (
                <Component {...props} />
            ) : (
                    <Redirect to={Links.Home} />
                )
        )
    }
);


const routes = [
    {
        component: App,
        routes: [
            {
                path: Links.Home,
                exact: true,
                component: Home
            },
            PrivateRoute({
                path: Links.Rooms,
                exact: true,
                component: Rooms
            }),
            PrivateRoute({
                path: `${Links.Room}:id`,
                exact: true,
                component: RoomPage
            }),
            CommonOnlyRoute({
                path: Links.Login,
                exact: true,
                component: Login
            }),
            CommonOnlyRoute({
                path: Links.Registration,
                exact: true,
                component: Registration
            }),
            {
                component: NotFound
            }
        ]
    }
];

export default routes;