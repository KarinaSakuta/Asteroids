import React, {Component} from 'react';
import Loading from './Loading';

const API_KEY = 'fXu3EJYP3AsJHgJBoEuwzZkkv3BonXcvCc4ljKDJ';

export default class DetailsPage extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      details: {},
    };
  }

  componentDidMount() {
    const params = this.props.match.params;
    const asteroidId = params.asteroidId;

    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${API_KEY}`)
      .then((response) => {
        if (response.status !== 200) {
          return this.props.history.push('/NotFound/');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({
          details: data,
          isLoaded: true,
        });
      });
  }

  renderCloseApproachDataELement(element, index) {
    return (
      <li className="asteroids-details__item-list-value asteroids-details__item-list-value_approach-data" key={index}>
        <ul className="asteroids-details__item-list">
          <li className="asteroids-details__item-list-value"><span  className="asteroids-details__item-list-date">{element.close_approach_date_full}</span></li>
          <li className="asteroids-details__item-list-value">Relative velocity: {element.relative_velocity.kilometers_per_second} kilometers per second</li>
          <li className="asteroids-details__item-list-value">Miss distance: {element.miss_distance.kilometers} kilometers</li>
          <li className="asteroids-details__item-list-value">Orbiting body: {element.orbiting_body}</li>
        </ul>
      </li>
    );
  }
  
  renderCloseApproachData() {
    return (
      <div className="asteroids-details__item">
        <h3 className="asteroids-details__item-list-header">Close approach data history</h3>
        <ul className="asteroids-details__item-list">
          {this.state.details.close_approach_data.map((element, index) => this.renderCloseApproachDataELement(element, index))}
        </ul>
      </div>
    );
  }

  renderOrbitalData() {
    return (
      <div className="asteroids-details__item">
        <h3 className="asteroids-details__item-list-header">Orbital data</h3>
        <ul className="asteroids-details__item-list">
          <li className="asteroids-details__item-list-value">Orbit id #{this.state.details.orbital_data.orbit_id}</li>
          <li className="asteroids-details__item-list-value">Orbit determination date: {this.state.details.orbital_data.orbit_determination_date}</li>
          <li className="asteroids-details__item-list-value">First observation date: {this.state.details.orbital_data.first_observation_date}</li>
          <li className="asteroids-details__item-list-value">Last observation date: {this.state.details.orbital_data.last_observation_date}</li>
          <li className="asteroids-details__item-list-value">Orbit uncertainty: {this.state.details.orbital_data.orbit_uncertainty}</li>
          <li className="asteroids-details__item-list-value">Minimum orbit intersection: {this.state.details.orbital_data.minimum_orbit_intersection}</li>
          <li className="asteroids-details__item-list-value">Orbital period: {this.state.details.orbital_data.orbital_period}</li>
          <li className="asteroids-details__item-list-value">Perihelion distance: {this.state.details.orbital_data.perihelion_distance}</li>
          <li className="asteroids-details__item-list-value">Perihelion argument: {this.state.details.orbital_data.perihelion_argument}</li>
          <li className="asteroids-details__item-list-value">Aphelion distance: {this.state.details.orbital_data.aphelion_distance}</li>
          <li className="asteroids-details__item-list-value">Perihelion time: {this.state.details.orbital_data.perihelion_time}</li>
          <li className="asteroids-details__item-list-value">Mean anomaly: {this.state.details.orbital_data.mean_anomaly}</li>
          <li className="asteroids-details__item-list-value">Mean motion: {this.state.details.orbital_data.mean_motion}</li>
          <li className="asteroids-details__item-list-value">Equinox: {this.state.details.orbital_data.equinox}</li>
        </ul>
      </div>
    );
  }

  renderOrbitClass() {
    return (
      <div className="asteroids-details__item">
        <h3 className="asteroids-details__item-list-header">Orbit class</h3>
        <ul className="asteroids-details__item-list">
          <li className="asteroids-details__item-list-value">Orbit class type: {this.state.details.orbital_data.orbit_class.orbit_class_type}</li>
          <li className="asteroids-details__item-list-value">Orbit class description: {this.state.details.orbital_data.orbit_class.orbit_class_description}</li>
          <li className="asteroids-details__item-list-value">Orbit class range: {this.state.details.orbital_data.orbit_class.orbit_class_range}</li>
        </ul>
      </div>
    );
  }

  renderGeneralInformation() {
    const isPotentiallyHazardous = this.state.details.is_potentially_hazardous_asteroid ? 'yes' : 'no';
    const isSentryObject = this.state.details.is_sentry_object ? 'yes' : 'no';

    return (
      <div className="asteroids-details__item">
        <h3 className="asteroids-details__item-list-header">General information</h3>
        <ul className="asteroids-details__item-list">
          <li className="asteroids-details__item-list-value">Id #{this.state.details.id}</li>
          <li className="asteroids-details__item-list-value">Name: {this.state.details.name}</li>
          <li className="asteroids-details__item-list-value">Nasa jpl url: <a className="asteroids-details__element-link" href={this.state.details.nasa_jpl_url}>link</a></li>
          <li className="asteroids-details__item-list-value">Absolute magnitude h: {this.state.details.absolute_magnitude_h}</li>
          <li className="asteroids-details__item-list-value">Estimated diameter min: {this.state.details.estimated_diameter.kilometers.estimated_diameter_max} kilometers</li>
          <li className="asteroids-details__item-list-value">Estimated diameter max: {this.state.details.estimated_diameter.kilometers.estimated_diameter_min} kilometers</li>
          <li className="asteroids-details__item-list-value">Is potentially hazardous asteroid: <span>{isPotentiallyHazardous}</span></li>
          <li className="asteroids-details__item-list-value">Is sentry object: {isSentryObject}</li>
        </ul>
      </div>
    );
  }

  renderDiameter() {
    return (
      <div className="asteroids-details__container">
        {this.renderGeneralInformation()}
        {this.renderOrbitalData()}
        {this.renderOrbitClass()}
        {this.renderCloseApproachData()}
      </div>
    );
  }

  renderDetails() {
    if (!this.state.isLoaded) {
      return (<Loading />);
    }

    return (
      <div className="asteroids-details">
        {this.renderDiameter()}
      </div>
    );
  }

  render() {
    return (
      <div className="page page_details">
        <h1 className="page__header">Details</h1>
        {this.renderDetails()}
      </div>
    );
  }
}
