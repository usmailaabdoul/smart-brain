import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Facerecognition from './components/Facerecognition/Facerecognition';
import Imagelinkform from './components/Imagelinkform/Imagelinkform';
import './App.css';

const particlesoptions =
{
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageurl: '',
  box: {},
  route: 'signin',
  issignin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loaduser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculatefacelocation = (data) => {
    const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height)
    }
  }

  displayfacebox = (box) => {
    this.setState({ box: box });
  }

  oninputchange = (event) => {
    this.setState({ input: event.target.value });
  }

  onpicturesubmit = () => {
    this.setState({ imageurl: this.state.input })
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log);
        }
        this.displayfacebox(this.calculatefacelocation(response))
      })
      .catch(err => console.log(err));
  }

  onroutechange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ issignin: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { issignin, imageurl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesoptions}
        />
        <Navigation issignin={issignin} onroutechange={this.onroutechange} />
        {
          route === 'home'
            ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <Imagelinkform oninputchange={this.oninputchange} onpicturesubmit={this.onpicturesubmit} />
              <Facerecognition box={box} imageurl={imageurl} />
            </div>
            : (
              route === 'signin'
                ?
                <Signin loaduser={this.loaduser} onroutechange={this.onroutechange} />
                : <Register loaduser={this.loaduser} onroutechange={this.onroutechange} />
            )
        }
      </div>
    );
  }
}

export default App;
