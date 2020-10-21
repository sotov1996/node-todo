import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { personsFetchData } from '../actions/persons';

class App extends Component {

  componentDidMount(){
    this.props.fetchData('/api/muggers');
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.persons.map((el,index) => {
            return(
              <li>{el.name}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    persons: state.persons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(personsFetchData(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
