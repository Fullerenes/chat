
export const handleLogin = ({ login }) => (event) => {
    const login = event.target.value;
    return { login };
}
export const handlePassword = ({ password }) => (event) => {
    const password = event.target.value;
    return { password };
}