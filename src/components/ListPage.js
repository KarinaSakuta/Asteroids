import React, {Component} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Loading from './Loading';
import Favicon from 'react-favicon';
import logoIcon from '../assets/img/logo-icon.png';

const API_KEY = 'fXu3EJYP3AsJHgJBoEuwzZkkv3BonXcvCc4ljKDJ';

export default class ListPage extends Component {
  constructor() {
    super();
  
    this.state = {
      isHazardous: false,
      searchByName: '',
      isLoaded: false,
      list: [],
      link: `https://www.neowsapp.com/rest/v1/feed?start_date=2019-11-28&end_date=2019-11-29&detailed=false&api_key=${API_KEY}`,
      next: '',
      prev: '',
      startDate: '',
      endDate: '',
    };

    this.nextClick = this.nextClick.bind(this);
    this.prevClick = this.prevClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadData() {
    this.setState({
      isLoaded: false,
    });

    fetch(this.state.link)
      .then((response) => {
        if (response.status !== 200) {
          return this.props.history.push('/NotFound');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        let objectsList = [];
        const arrays = Object.values(data.near_earth_objects);
  
        for (let index = 0; index < arrays.length; index++) {
          objectsList = objectsList.concat(arrays[index]);
        }
        let indexStart = (this.state.link.indexOf('start_date=') + 11);
        let indexEnd = (this.state.link.indexOf('end_date=') + 9);
        let startDateValue = this.state.link.slice((indexStart), (indexStart + 10));
        let endDateValue = this.state.link.slice((indexEnd), (indexEnd + 10));
          
        this.setState({
          list: objectsList,
          isLoaded: true,
          next: data.links.next,
          prev: data.links.prev,
          startDate: startDateValue,
          endDate: endDateValue,
        });
      });
  }

  componentDidMount() {
    this.loadData();
  }
    
  componentDidUpdate(prevProps, prevState) {
    if (this.state.link !== prevState.link) {
      this.loadData();
    }
  }

  prevClick(e) {
    e.preventDefault();
    this.setState({
      link: this.state.prev,
    });
  }

  nextClick(e) {
    e.preventDefault();
    this.setState({
      link: this.state.next,
    });
  }

  renderIcon() {
    return (
      <div>
      <Favicon url={logoIcon} />
    </div>
    );
  }

  renderDate() {
    return (
      <div className="date">
        <div className="date__container">
          <p className="date__item">Date: {this.state.startDate} - {this.state.endDate}</p>
        </div>
      </div>
    );
  }

  renderPagination() {
    return (
      <div className="pagination">
        <div className="pagination__container">
          <div className="pagination__prev" onClick={this.prevClick}>←</div>
          <div className="pagination__next" onClick={this.nextClick}>→</div>
        </div>
      </div>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  renderFilter() {
    return (
      <form className="hazardous-form" onSubmit={this.handleSubmit}>
        <input
          className="hazardous-form__text-input"
          name="searchByName"
          type="text"
          value={this.state.searchByName}
          placeholder="Search by name:"
          onChange={this.handleInputChange} />
        <label className="hazardous-form__text">
          Hazardous only:
          <input
            className="hazardous-form__checkbox"
            name="isHazardous"
            type="checkbox"
            checked={this.state.isHazardous}
            onChange={this.handleInputChange} />
          <span className="hazardous-form__checkmark"></span>
        </label>
      </form>
    );
  }
  
  renderELement(element) {
    const isSentryObject = element.is_sentry_object ? 'yes' : 'no';
    const isPotentiallyHazardous = element.is_potentially_hazardous_asteroid ? 'yes' : 'no';
    const elementClasses = classnames('asteroids-list__element', {
      'asteroids-list__element_hazardous': element.is_potentially_hazardous_asteroid,
    });
  
    return (
      <li className={elementClasses} key={element.id}>
        <ul className="asteroids-list__element-list">
          <li className="asteroids-list__element-item">Asteroid #{element.id}</li>
          <li className="asteroids-list__element-item">Name: {element.name}</li>
          <li className="asteroids-list__element-item">Absolute magnitude h: {element.absolute_magnitude_h}</li>
          <li className="asteroids-list__element-item">Nasa jpl url: <a className="asteroids-list__element-link" href={element.nasa_jpl_url}>link</a></li>
          <li className="asteroids-list__element-item">Is potentially hazardous asteroid: <span className="asteroids-list__element_is-hazardous">{isPotentiallyHazardous}</span></li>
          <li className="asteroids-list__element-item">Is sentry object: {isSentryObject}</li>
        </ul>
        <button className="asteroids-list__element-btn"><Link className="asteroids-list__element-btn-link" to={`/details/${element.id}`}>show details</Link></button>
      </li>
    );
  }
  
  renderList(element) {
    if (!this.state.isLoaded) {
      return (<Loading />);
    }
  
    let sortedList = [...this.state.list];
    sortedList.sort((element) => {
      const isPotentiallyHazardous = element.is_potentially_hazardous_asteroid;
      if (isPotentiallyHazardous) {
        return -1;
      } else {
        return 1;
      }
    });

    if (this.state.searchByName !== '') {
      sortedList = sortedList.filter((element) => {
        return element.name.toUpperCase().includes(this.state.searchByName.toUpperCase());
      });
    }

    if (this.state.isHazardous) {
      sortedList = sortedList.filter((element) => {
        return element.is_potentially_hazardous_asteroid;
      });
    }

    return (
      <ul className="asteroids-list">
        {sortedList.map((element) => this.renderELement(element))}
      </ul>
    );
  }
  
  render() {
    return (
      <div className="page page_list">
        <h1 className="page__header">Asteroids list page</h1>
        {this.renderIcon()}
        {this.renderDate()}
        {this.renderFilter()}
        {this.renderPagination()}
        {this.renderList()}
      </div>
    );
  }
}
