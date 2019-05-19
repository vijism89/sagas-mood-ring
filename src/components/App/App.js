import React, { Component } from 'react';
import './App.css';
import ImageForm from '../ImageForm/ImageForm';

class App extends Component {
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

export default App;
