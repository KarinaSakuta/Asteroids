import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link className="header__link" to="/">Home <span className="header__link-emoji" role="img" aria-label="rocket">&#128640;</span></Link>
      </header>
    );
  }
}
