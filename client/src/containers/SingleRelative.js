import React, {Component} from 'react';
import API from '../utils/API';

class SingleRelative extends Component {
  state={
    relativeData: {}
  }

  componentDidMount() {
    const relativeId = this.props.match.params.relativeId;

    API.getrelativeById(relativeId)
      .then(res => this.setState({relativeData: res.data}))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {Object.keys(this.state.relativeData).length ? JSON.stringify(this.state.relativeData, null, 2) : ""}
      </React.Fragment>
    )
  }
}

export default SingleRelative;

