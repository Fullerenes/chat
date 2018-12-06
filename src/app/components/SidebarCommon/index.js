import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation';
export default class SidebarCommon extends Component {
    render() {
        return (
            <div>
                
                <Navigation>
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/registration">Registration</Link>
                </Navigation>
            </div>
        )
    }
}
