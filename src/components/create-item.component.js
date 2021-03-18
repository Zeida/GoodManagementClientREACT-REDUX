import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeItemcode = this.onChangeItemcode.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
      id: null,
      itemcode: "",
      description: "", 
      state: "ACTIVE",
      submitted: false
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

  saveItem() {
    var data = {
      itemcode: this.state.itemcode,
      description: this.state.description
    };

    ItemDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          itemcode: response.data.itemcode,
          description: response.data.description,
          state: response.data.state,
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
      state: "ACTIVE",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newItem}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="itemcode">Item code</label>
              <input
                type="text"
                className="form-control"
                id="itemcode"
                required
                value={this.state.itemcode}
                onChange={this.onChangeiItemcode}
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

            <button onClick={this.saveItem} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}