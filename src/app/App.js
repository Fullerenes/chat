import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'
import Loader from '../app/components/Loader'
import Frame from '../app/components/Frame'
class App extends Component {
  constructor(props) {
    super(props);
    this.loginned();
  }
  loginned(auth = this.props.auth, wrongSession = this.props.wrongSession) {
    if (auth === null) {
      this.auth = null;
    } else if (auth && !wrongSession) {
      this.auth = true;
    } else {
      this.auth = false;
    }
  }
  shouldComponentUpdate(nextProps) {
    this.loginned(nextProps.auth, nextProps.wrongSession);
    return true;
  }
  componentDidUpdate() {
    //this.loginned();
  }
  render() {
    return (
      this.auth === null
        ? <Loader />
        : <Frame auth={this.auth}>
          {renderRoutes(this.props.route.routes, { auth: this.auth })}
        </Frame>
    );
  }
}
const enhance = connect(state => ({
  auth: state.User.auth,
  wrongSession: state.User.wrongSession
}))

export default withRouter(enhance(App));
