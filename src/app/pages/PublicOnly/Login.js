import React from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import withStateHandlers from 'recompose/withStateHandlers'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import { listenerActions } from '../../../store/actions'
import { Link } from 'react-router-dom'
import Links from '../../routes/links'
import Input from '../../components/InputWithLabel'
import Button from '../../components/Button'
import H1 from '../../BasicComponents/H1'
import Error from '../../components/Error'
const style = {
    display: "flex",
    padding: "20px 0 0 0",
    flexDirection: "column",
    textAlign: "center"
};
function Login({ login, handleLogin, password, handlePassword, handleSubmit, loginError, passwordError, error }) {
    return (
        <div>
            <form onSubmit={handleSubmit} style={style}>
                <H1>Login Page</H1>
                {!error || <Error>{error}</Error>}
                <Input placeholder="Login" type="text" value={login} error={loginError} onChange={handleLogin} />
                <Input placeholder="Password" type="password" value={password} error={passwordError} onChange={handlePassword} />
                <Button type="submit">Login</Button>
                <br />
                <Link to={Links.Registration}>Registration</Link>
            </form>
        </div >
    )
}
const enhance = compose(
    connect(
        state => ({
            error: state.Errors.error
        })
    ),
    lifecycle({
        componentWillUnmount() {
            const { dispatch } = this.props;
            dispatch({
                type: listenerActions.ERRORS_CLEAN,
                payload: {}
            })
        }
    }),
    withStateHandlers(
        ({ initialLogin = '', initialLoginError = '', initialPassword = '', initialPasswordError = '' }) => ({
            login: initialLogin,
            loginError: initialLoginError,
            password: initialPassword,
            passwordError: initialPasswordError
        }),
        {
            handleErrors: () => ({ loginError = '', passwordError = '' }) => {
                return { loginError, passwordError };
            },
            handleLogin: () => (event) => {
                const login = event.target.value;
                return { login };
            },
            handlePassword: () => (event) => {
                const password = event.target.value;
                return { password };
            },
        }
    ),
    withHandlers({
        handleSubmit: ({ dispatch, login, password, handleErrors }) => (event) => {
            event.preventDefault();
            let loginError, passwordError;
            let error = false;
            if (!login) {
                loginError = `Can't be blank`;
                error = true;
            }
            if (password.length < 6) {
                passwordError = `< 6 characters`;
                error = true;
            }
            if (error) {
                handleErrors({ loginError, passwordError });
                return false;
            }
            dispatch({
                type: listenerActions.USER_LOGIN_REQUEST,
                payload: {
                    login,
                    password
                }
            })
        }
    })
)
export default enhance(Login);
