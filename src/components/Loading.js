import React, {Component} from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
        <p className="loading__spinner-text">Loading...</p>
      </div>
    );
  }
}
