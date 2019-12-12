import React, {Component} from 'react';
import Loading from './Loading';

export default class Hello extends Component {
    constructor() {
        super();
      
        this.state = {
          isLoaded: false,
        };
    
        this.sayHello = this.sayHello.bind(this);
        this.paintSpinner = this.paintSpinner.bind(this);
      }

    sayHello() {
        if (this.state.isLoaded) {
            return (<Loading />);
        }

        return (
            <button className="hello__btn" onClick={this.paintSpinner}>Paint spinner</button>
        );
    }

    paintSpinner() {
        this.setState({
            isLoaded: true,
        });
    }

    render () {
        return (
            <div className="hello_btn">
                {this.sayHello()}
            </div>
        );
    }
}