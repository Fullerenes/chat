import React from 'react'
import { connect } from 'react-redux'

function UsersList({ users = [], ...props }) {
    return (
        <div>
            <div>UsersList</div>
            {users.map((user, index) => {
                return <div key={index}>{user.nickname}:{user.userId}</div>
            })}
        </div>
    )
}

const enhance = connect(state => ({
    users: state.Users.users
}))

export default enhance(UsersList);