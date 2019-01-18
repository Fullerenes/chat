import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { listenerActions } from '../../../store/actions'

import NicknameStyled, { NicknameLabelStyled, FormStyled } from './style'

import Input from '../Input'
import PureButton from '../../BasicComponents/PureButton'
import PencilSrc from './pencil.svg'
import ChecklSrc from './check.svg'

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
        if (on) {
            return (
                <FormStyled onSubmit={this.handleSubmit}>
                    <Input autoFocus type="text" placeholder="NickName" onChange={this.handleChange} value={this.state.nickname} />
                    <PureButton type="submit"><img alt="Done" src={ChecklSrc} width="24" height="24" /></PureButton>
                </FormStyled>
            );
        } else {
            return (
                <Fragment>
                    <NicknameLabelStyled onClick={this.handleEditButton}>{this.props.nickname}</NicknameLabelStyled>
                    <img onClick={this.handleEditButton} alt="Edit" src={PencilSrc} width="24" height="24" />
                </Fragment >
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
    nickname: state.User.nickname
}));
export default enhance(Nickname);