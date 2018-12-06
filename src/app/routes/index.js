import React from 'react';
import { Redirect } from 'react-router-dom';
import App from '../App'
import { Room, Rooms } from '../pages/Authorized'
import { Login, Registration, NotFound } from '../pages/General'

const PrivateRoute = ({ component: Component, ...rest }) => (
    {
        ...rest,
        render: (props) => (
            props.auth ? (
                <Component {...props} />
            ) : (
                    <Redirect to={"/login"} />
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
                    <Redirect to={"/"} />
                )
        )
    }
);


const routes = [
    {
        component: App,
        routes: [
            PrivateRoute({
                path: "/",
                exact: true,
                title: "Rooms",
                component: Rooms
            }),
            PrivateRoute({
                path: "/room/:id",
                exact: true,
                title: "Room",
                component: Room
            }),
            CommonOnlyRoute({
                path: "/login",
                exact: true,
                title: "Login",
                component: Login
            }),
            CommonOnlyRoute({
                path: "/registration",
                exact: true,
                title: "registration",
                component: Registration
            }),
            {
                title: "Not Found",
                component: NotFound
            }
        ]
    }
];

export default routes;