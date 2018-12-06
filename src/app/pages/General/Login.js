import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listenerActions } from '../../../store/actions'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
    }
    componentDidMount() {
        // if (this.props.auth) {
        //     this.props.history.push('/');
        // }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { dispatch } = this.props;
        const { login, password } = this.state;
        dispatch({
            type: listenerActions.USER_LOGIN_REQUEST,
            payload: {
                login,
                password
            }
        })
    }
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch({
            type: listenerActions.USER_LOGOUT_REQUEST
        })
    }
    handleLogin = (event) => {
        const login = event.target.value;
        this.setState({ login });
    }
    handlePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Login" type="text" value={this.state.login} onChange={this.handleLogin} />
                    <input placeholder="Password" type="password" value={this.state.password} onChange={this.handlePassword} />
                    <button type="submit">Login</button>
                </form>

                {this.props.auth ? <button onClick={this.handleLogout}>Logout</button> : ''}
            </div>
        )
    }
}
const enhance = connect(state => ({
    auth: state.UserReducer.auth
}))

export default enhance(Login);
