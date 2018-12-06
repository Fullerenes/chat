import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listenerActions } from '../../../store/actions'

import NicknameStyled, { NicknameLabelStyled } from './style'

import Input from '../Input'
import Button from '../Button'

class Nickname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            nickname: this.props.nickname
        }
    }
    componentDidMount() {
        //const { dispatch } = this.props;
        // dispatch({
        //     type: listenerActions.CHANGE_NICKNAME_REQUEST,
        //     payload: {
        //         nickname: ""
        //     }
        // });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { dispatch } = this.props;
        let nickname = this.state.nickname;
        dispatch({
            type: listenerActions.CHANGE_NICKNAME_REQUEST,
            payload: {
                nickname
            }
        });
        this.setState({ editing: !this.state.editing });
    }
    handleEditButton = () => {
        this.setState({ editing: !this.state.editing, nickname: this.props.nickname });
    }
    handleChange = (event) => {
        let nickname = event.target.value;
        this.setState({ nickname });
    }
    onEdit = (on) => {
        let style = {
            display: "flex",
            flexDirection: "row"
        }
        if (on) {
            return (
                <form style={style} onSubmit={this.handleSubmit}>
                    <Input autoFocus type="text" placeholder="NickName" onChange={this.handleChange} value={this.state.nickname} />
                    <Button type="submit">Change Name</Button>
                </form>
            );
        } else {
            return (
                <div style={style}>
                    <NicknameLabelStyled>{this.props.nickname}</NicknameLabelStyled>
                    <Button onClick={this.handleEditButton}>Change Name</Button>
                </div >
            );
        }
    }
    render() {
        return (
            <NicknameStyled>
                {this.state.editing ? this.onEdit(true) : this.onEdit(false)}
            </NicknameStyled>
        )
    }
}
const enhance = connect(state => ({
    nickname: state.UserReducer.nickname
}));
export default enhance(Nickname);