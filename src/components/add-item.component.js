import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeItemcode = this.onChangeItemcode.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCreationdate = this.onChangeCreationdate.bind(this);
    this.onChangeCreator = this.onChangeCreator.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem= this.newItem.bind(this);

    this.state = {
      id: null,
      itemcode: "",
      description: "", 
      price: 0,
      state:"",
      creationdate:"",
      creator:{},
      //submitted: false
    };
  }

  onChangeItemcode(e) {
    this.setState({
      itemcode: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }

  onChangeCreationdate(e) {
    this.setState({
      creationdate: e.target.value
    });
  }

  onChangeCreator(e) {
    this.setState({
      creator: e.target.value
    });
  }

  saveItem() {
    var data = {
      itemcode: this.state.itemcode,
      description: this.state.description,
      price: this.state.price,
      state: this.state.state,
      creationdate: this.state.creationdate,
      creator: this.state.creator

    };

    ItemDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          code: response.data.code,
          description: response.data.description,
          price: response.data.price,
          state: response.data.state,
          creationdate: response.data.creationdate,
          creator: response.data.creator,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newItem() {
    this.setState({
        id: null,
        itemcode: "",
        description: "", 
        price: 0,
        state:"",
        creationdate:"",
        creator:{},
        //submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.itemcode==""? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newItem}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="itemcode">Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemcode"
                  required
                  value={this.state.itemcode}
                  onChange={this.onChangeItemcode}
                  name="itemcode"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  required
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  name="price"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  required
                  value={this.state.state}
                  onChange={this.onChangeState}
                  name="state"
                />
              </div>

              <div className="form-group">
                <label htmlFor="creationdate">Creation Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="creationdate"
                  required
                  value={this.state.creationdate}
                  onChange={this.onChangeCreationdate}
                  name="creationdate"
                />
              </div>

              <div className="form-group">
                <label htmlFor="creator">Creator</label>
                <input
                  type="text"
                  className="form-control"
                  id="creator"
                  required
                  value={this.state.creator}
                  onChange={this.onChangeCreator}
                  name="creator"
                />
              </div>
  
              <button onClick={this.saveItem} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
  }

  