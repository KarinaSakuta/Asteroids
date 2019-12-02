import React, {Component} from 'react';
import vk from '../assets/img/vk.png';
import telegram from '../assets/img/telegram.png';
import phone from '../assets/img/phone.png';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <a className="footer__link" href="https://vk.com/id402238450"><img className="footer__link-img" alt="vk" src={vk}></img></a>
          <a className="footer__link" href="https://t.me/karina_kazak"><img className="footer__link-img" alt="telegram" src={telegram}></img></a>
          <a className="footer__link" href="tel:+375291392819"><img className="footer__link-img" alt="phone" src={phone}></img></a>
        </div>
      </footer>
    );
  }
}
