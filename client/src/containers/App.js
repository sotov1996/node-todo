import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { personsFetchData } from '../actions/persons';
import PostForm from './postForm';

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
        <PostForm fetchPost={this.props.fetchData}/>
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
