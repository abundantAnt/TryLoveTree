import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import API from '../utils/API';

class Saved extends Component {
  state = {
    relativesList: []
  };

  componentDidMount() {
    this.getRelatives();
  }

  getrelatives = () => {
    API.getSavedRelatives()
      .then(res => this.setState({ relativesList: res.data }))
      .catch(err => console.log(err));
  };

  deleterelative = relativeId => {
    API.deleterelative(relativeId)
      .then(this.getRelatives)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        {/* make jumbotron */}
        <div className="jumbotron jumbotron-fluid bg-dark text-light">
          <div className="container-fluid">
            <h1>View Saved relatives Here</h1>
          </div>
        </div>
        {/* create row with two columns */}
        <div className="container-fluid">
          <div className="row">
            {/* begin relative result section */}
            <div className="col-12">
              {!this.state.relativesList.length ? (
                <h2 className="text-center">No Saved relatives To Display</h2>
              ) : (
                <React.Fragment>
                  <h3>Showing Saved relatives</h3>
                  <div className="row">
                    {this.state.relativesList.map(relative => {
                      return (
                        <div className="col-12 col-md-4" key={relative._id}>
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
                              <button onClick={() => this.deleterelative(relative._id)} className="btn btn-dark btn-small">
                                Delete relative.
                              </button>
                              <Link to={`/saved/${relative._id}`} className="btn btn-block btn-danger">View relative</Link>
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

export default Saved;
