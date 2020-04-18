import React, { Component } from 'react';
import axios from 'axios';

import { server } from '../global';


class Quote extends Component {
    state = {
        quote: {}
    };
    
    componentDidMount() {
        this.verifyToken();
        this.getQuote();
    }

    verifyToken() {
        let model = {
            token: localStorage.getItem('token')
        };
        if(localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        } else if(localStorage.getItem('token') != null) {
            axios.post(server + '/auth-jwt-verify/', model)
            .then(data => {
                console.log('token verify', data);
            })
            .catch(error => {
                console.log('token verify error', error);
                localStorage.clear();
                this.props.history.push('/login');
            });
        }
    }

    getQuote() {
        axios.get('https://quotes.rest/qod', { headers: { "Accept": "application/json" }})
            .then(data => {
                console.log(data.data);
                this.setState({
                    quote: data.data.contents.quotes[0]
                });
            })
            .catch(error => {
                console.log(error);
            }
        )
    }

    render() {
        const quote = this.state.quote ? (
            <div className="row">
                <div className="col s12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <h4 className="card-title">{ this.state.quote.title }</h4>
                            <hr />
                            <p className="flow-text quote">{ this.state.quote.quote }</p>
                            <br />
                            <h5 className="yellow-text">- { this.state.quote.author }</h5>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
            <div className='center mt-5 white-text'>Loading quote...</div>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <br />
                        <h3 className='black-text accent-4s'>Quote of the Day</h3>
                    </div>
                </div>
                { quote }
            </div>
        );
    }
}

export default Quote;