import React, { Component } from 'react';
import './App.css';
import ImageForm from '../ImageForm/ImageForm';
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount(){
    this.props.dispatch({type:'GET_IMAGES'});
    this.props.dispatch({type:'GET_TAGS'});
  }
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
      <h1 className="header"> The Mood Ring </h1>
      <h3>Image Title</h3>
      <ImageForm />
      </div>
    );
  }
}

export default connect()(App);
