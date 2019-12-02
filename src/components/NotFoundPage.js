import React, {Component} from 'react';
import asteroid from '../assets/img/asteroid_face.png';
import Favicon from 'react-favicon';
import logoIcon from '../assets/img/logo-icon.png';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="page page_not-found">
        <h1 className="page__header">Not Found</h1>
        <Favicon url={logoIcon} />
        <div className="asteroids-notfound">
          <p className="asteroids-notfound__text">My face when asteroid not found</p>
          <img className="asteroids-notfound__picture" alt="asteroid" src={asteroid}></img>
        </div>
      </div>
    );
  }
}
