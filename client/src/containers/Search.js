import React, { Component } from 'react';
import API from '../utils/API';

class Search extends Component {
  state = {
    searchTerm: '',
    relativesList: []
  };

  searchGooglerelatives = relativeQuery => {
    API.searchGooglerelatives(relativeQuery)
      .then(res => {
        // take res.data.items array and create new array with less information
        const relativesList = res.data.items.map(relative => {
          return {
            relativeId: relative.id,
            authors: relative.volumeInfo.authors,
            title: relative.volumeInfo.title,
            date: relative.volumeInfo.publishedDate,
            description: relative.volumeInfo.description,
            image: relative.volumeInfo.imageLinks ? relative.volumeInfo.imageLinks.thumbnail : 'https://fillmurray.com/200/300',
            link: relative.volumeInfo.infoLink
          };
        });
        // set state to have new relative list
        this.setState({ relativesList });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.searchTerm) {
      return false;
    }

    this.searchGooglerelatives(this.state.searchTerm);
  };

  saverelative = relativeId => {
    // find relative in this.state.relativesList based on the relativeId value
    const relativePicked = this.state.relativesList.find(relative => relative.relativeId === relativeId);
    console.log(relativePicked);
    API.saverelative(relativePicked)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {/* make jumbotron */}
        <div className="jumbotron jumbotron-fluid bg-dark text-light">
          <div className="container-fluid">
            <h1>Search For relatives Here</h1>
          </div>
        </div>
        {/* create row with two columns */}
        <div className="container-fluid">
          <div className="row">
            {/* form section */}
            <div className="col-12 col-sm-6 col-md-3">
              <h3>Search For A relative</h3>
              <form onSubmit={this.handleFormSubmit}>
                <input
                  name="searchTerm"
                  onChange={this.handleInputChange}
                  placeholder="Enter relative name here"
                  value={this.state.searchTerm}
                  type="input"
                  className="form-control mb-3"
                />
                <button className="btn btn-block btn-success" onClick={this.handleFormSubmit}>
                  Search for relative.
                </button>
              </form>
            </div>
            {/* end form section */}
            {/* begin relative result section */}
            <div className="col-12 col-sm-6 col-md-9">
              {!this.state.relativesList.length ? (
                <h2 className="text-center">Search For a relative</h2>
              ) : (
                <React.Fragment>
                  <h3>Search Results for: {this.state.searchTerm}</h3>
                  <div className="row">
                    {this.state.relativesList.map(relative => {
                      return (
                        <div className="col-12 col-md-6" key={relative.relativeId}>
                          <div className="card">
                            <img src={relative.image} alt={relative.title} className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">{relative.title}</h5>
                              <p className="card-text">Released: {relative.date}</p>
                              {relative.authors ? <p className="card-text">By: {relative.authors.join(', ')}</p> : ''}
                              <p className="card-text">
                                <strong>Description</strong>: {relative.description}{' '}
                              </p>

                              <a
                                href={relative.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="btn btn-success btn-small">
                                See More.
                              </a>
                              <button onClick={() => this.saverelative(relative.relativeId)} className="btn btn-dark btn-small">
                                Save relative.
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
