import React from 'react'
import { connect } from 'react-redux'
import { listenerActions } from '../../../store/actions'
import compose from 'recompose/compose'
import withStateHandlers from 'recompose/withStateHandlers'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import { Link } from 'react-router-dom'
import Links from '../../routes/links';
import Input from '../../components/InputWithLabel';
import Button from '../../components/Button';
import H1 from '../../BasicComponents/H1'
import Error from '../../components/Error';
const style = {
    display: "flex",
    padding: "20px 0 0 0",
    flexDirection: "column",
    textAlign: "center"
};
function Registration({ login, handleLogin, password, passwordRepeat, handlePassword, handlePasswordRepeat, handleSubmit, loginError, passwordError, passwordRepeatError, error }) {
    return (
        <div>
            <form onSubmit={handleSubmit} style={style}>
                <H1>Registration Page</H1>
                {!error || <Error>{error}</Error>}
                <Input placeholder="Login" type="text" value={login} error={loginError} onChange={handleLogin} />
                <Input placeholder="Password" type="password" value={password} error={passwordError} onChange={handlePassword} />
                <Input placeholder="Repeat Password" type="password" value={passwordRepeat} error={passwordRepeatError} onChange={handlePasswordRepeat} />
                <Button type="submit">Registration</Button>
                <br />
                <Link to={Links.Login}>Login</Link>
            </form>

        </div >
    )
}
const enhance = compose(
    connect(state => ({
        error: state.Errors.error
    })),
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
        ({ initialLogin = '', initialLoginError = '', initialPassword = '', initialPasswordError = '', initialPasswordRepeat = '', initialPasswordRepeatError = '' }) => ({
            login: initialLogin,
            loginError: initialLoginError,
            password: initialPassword,
            passwordError: initialPasswordError,
            passwordRepeat: initialPasswordRepeat,
            passwordRepeatError: initialPasswordRepeatError
        }),
        {
            handleErrors: () => ({ loginError = '', passwordError = '', passwordRepeatError = '' }) => {
                return { loginError, passwordError, passwordRepeatError };
            },
            handleLogin: () => (event) => {
                const login = event.target.value;
                return { login };
            },
            handlePassword: () => (event) => {
                const password = event.target.value;
                return { password };
            },
            handlePasswordRepeat: () => (event) => {
                const passwordRepeat = event.target.value;
                return { passwordRepeat };
            }
        }
    ),
    withHandlers({
        handleSubmit: ({ dispatch, login, password, passwordRepeat, handleErrors }) => (event) => {
            event.preventDefault();
            let loginError, passwordError, passwordRepeatError;
            let error = false;
            if (!login) {
                loginError = `Can't be blank`;
                error = true;
            }
            if (password.length < 6) {
                passwordError = `< 6 characters`;
                error = true;
            }
            if (!passwordRepeat || password !== passwordRepeat) {
                passwordRepeatError = `Passwords doesn't match`;
                error = true;
            }
            if (error) {
                handleErrors({ loginError, passwordError, passwordRepeatError });
                return false;
            }
            dispatch({
                type: listenerActions.USER_REGISTRATION_REQUEST,
                payload: {
                    login,
                    password
                }
            })
        }
    })
)
export default enhance(Registration);