import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import { Link } from "react-router-dom";

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    this.searchItem = this.searchItem.bind(this);

    this.state = {
      Items: [],
      currentItem: null,
      currentIndex: -1,
      searchItem: ""
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  onChangeSearchItem(e) {
    const searchItem = e.target.value;

    this.setState({
      searchItem: searchItem
    });
  }

  retrieveItems() {
    ItemDataService.getAll()
      .then(response => {
        this.setState({
          Items: response.data
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

  setActiveItem(itemcode, index) {
    this.setState({
      currentItem: itemcode,
      currentIndex: index
    });
  }

  removeAllItems() {
    ItemDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchItem() {
    ItemDataService.findByItemcode(this.state.searchItem)
      .then(response => {
        this.setState({
          Items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchItem, Items, currentItem, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Item"
              value={searchItem}
              onChange={this.onChangeSearchItem}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchItem}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Items List</h4>

          <ul className="list-group">
            {Items &&
              Items.map((itemcode, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveItem(itemcode, index)}
                  key={index}
                >
                  {Item.itemcode}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllItems}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentItem ? (
            <div>
              <h4>Item</h4>
              <div>
                <label>
                  <strong>Item:</strong>
                </label>{" "}
                {currentItem.itemcode}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentItem.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentItem.state ? "ACTIVE" : "DISCONTINUED"}
              </div>

              <Link
                to={"/Item/" + currentItem.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Item...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
