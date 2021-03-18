import React, { Component } from "react";
import axios from 'axios';
import UserService from "../services/user.service";

export default class Home extends Component {


  async componentDidMount() {
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h1 className="display-4" className="mb-0 d-flex justify-content-center">Welcome!</h1>
          <h2 className="mb-0 d-flex justify-content-center">You're in Bitboxer 2</h2>
          <p className="text-center" >This is a goods management application.</p>
        </header>
      </div>
    );
  }
}
