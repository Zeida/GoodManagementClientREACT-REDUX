import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import { Link } from "react-router-dom";

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchItemcode = this.onChangeSearchItemcode.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    this.searchItemcode = this.searchItemcode.bind(this);

    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  onChangeSearchItemcode(e) {
    const searchItemcode = e.target.value;

    this.setState({
      searchItemcode: searchItemcode
    });
  }

  retrieveItems() {
    ItemDataService.getAll()
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveItems();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }

  setActiveItem(item, index) {
    this.setState({
      currentItem: item,
      currentIndex: index
    });
  }

  searchItemcode() {
    ItemDataService.findByItemcode(this.state.searchItemcode)
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentItem } = this.state;

    return (
      <div>
        {currentItem ? (
          <div className="edit-form">
            <h4>Item</h4>
            <form>
              <div className="form-group">
                <label htmlFor="itemcode">Item code</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemcode"
                  value={currentItem.itemcode}
                  onChange={this.onChangeItemcode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentItem.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentItem.state ? "ACTIVE" : "DISCONTINUED"}
              </div>
            </form>

            {currentItem.state ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateState("DISCONTINUED")}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateState("ACTIVE")}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteItem}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateItem}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Item...</p>
          </div>
        )}
      </div>
    );
  }
}