import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listenerActions } from '../../../store/actions'
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            repeatPassword: '',
            error: ''
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
        const { login, password, repeatPassword } = this.state;
        if (password === repeatPassword) {
            dispatch({
                type: listenerActions.USER_REGISTRATION_REQUEST,
                payload: {
                    login,
                    password
                }
            })
        } else {
            const error = 'Plese repeat password';
            this.setState({ error });
        }

    }
    handleLogin = (event) => {
        const login = event.target.value;
        this.setState({ login });
    }
    handlePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }
    handleRepeatPassword = (event) => {
        const repeatPassword = event.target.value;
        this.setState({ repeatPassword });
    }
    render() {
        return (
            <div>
                Registration
                {this.state.error ? <div>{this.state.error}</div> : ''}
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Login" type="text" value={this.state.login} onChange={this.handleLogin} />
                    <input placeholder="Password" type="password" value={this.state.password} onChange={this.handlePassword} />
                    <input placeholder="Repeat Password" type="password" value={this.state.repeatPassword} onChange={this.handleRepeatPassword} />
                    <button type="submit">Registration</button>
                </form>

                {this.props.auth ? <button onClick={this.handleLogout}>Logout</button> : ''}
            </div>
        )
    }
}
const enhance = connect();

export default enhance(Registration);