import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import Clarifai from 'clarifai';
// from https://www.npmjs.com/package/react-particles-js
import Particles from 'react-particles-js';

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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
     }
  }

  displayFacebox = (box) => {
    console.log(box);
    this.setState({box: box});
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
      .then(response => this.displayFacebox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    console.log(route);
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route});
    
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;

    return (
        <div className="App">
          
          <Particles
            className='particles'
            params={particlesParams}
          />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

          {/* Conditional rendering of the signin form */}
          { route === 'home' 
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm 
                  onInputChange={ this.onInputChange }
                  onButtonSubmit={ this.onButtonSubmit }               
                />
                <FaceRecognition box={box} imageUrl={ imageUrl }/>
              </div>
            : (
              route === 'Signin' 
                ? <Signin onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
            )
          }
        </div>
      );
    }
  }

export default App;
