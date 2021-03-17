import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.onChangeItemcode = this.onChangeItemcode.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      currentItem: {
        id: null,
        itemcode: "",
        description: "", 
        price: 0,
        state:"",
        creationdate:"",
        creator:{},
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getItem(this.props.match.params.id);
  }

  onChangeItemcode(e) {
    const Itemcode = e.target.value;

    this.setState(function(prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          Itemcode: Itemcode
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        description: description
      }
    }));
  }

  getItem(id) {
    ItemDataService.get(id)
      .then(response => {
        this.setState({
          currentItem: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateItem() {
    ItemDataService.update(
      this.state.currentItem.id,
      this.state.currentItem
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Item was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteItem() {    
    ItemDataService.delete(this.state.currentItem.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Items')
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
                <label htmlFor="Itemcode">Itemcode</label>
                <input
                  type="text"
                  className="form-control"
                  id="Itemcode"
                  value={currentItem.Itemcode}
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
                {currentItem.published ? "Published" : "Pending"}
              </div>
            </form>

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
            <p>Please click on a Item...</p>
          </div>
        )}
      </div>
    );
  }
}