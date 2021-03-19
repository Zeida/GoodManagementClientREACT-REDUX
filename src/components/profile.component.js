import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/authenticate" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
        {console.log("micontrol")}
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
{/*         <p>
          <strong>Id:</strong> {currentUser.userid}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
