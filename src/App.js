import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
const app = new Clarifai.App({
  apiKey: '4de72e2e07cd4bdf8769b68294dc9f65'
 });

const particlesParams = {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    }
  },
  "interactivity": {
    "detect_on": 'window',
    "events": {
      "onhover": {
        "enable": true,
        "mode": 'repulse'
      },
      "onclick": {
        "enable": true,
        "mode": 'push'
      }
    }
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
  );
  }

  render() {
    return (
        <div className="App">
          <Particles className='particles' params={particlesParams} />
          <Navigation />
          <Logo />
          <Rank onClick={ this.handleHover }/>
          <ImageLinkForm 
            onInputChange={ this.onInputChange }
            onButtonSubmit={ this.onButtonSubmit }               
          />
          <FaceRecognition imageUrl={ this.state.imageUrl }/>
        </div>
      );
    }

    handleHover = (event) => {
      console.log(event);
    }

  }

export default App;
