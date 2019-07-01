import React, {Component} from 'react';
import Sound from 'react-native-sound';

import {Image,
   StyleSheet,
   Dimensions,
   ImageBackground
  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './home';
import GameScreen from './game';


type Props = {};
Sound.setCategory('Playback');
export default class VideoScreen extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {}
    this.music;
  }
  componentDidMount(){
      this.music = new Sound('intro_music.mp3', Sound.MAIN_BUNDLE, (error) => {
  this.music.play();
});

  }
  static navigationOptions = {
    header: null,
  }

  render() {
    const {navigate} = this.props.navigation;
    setTimeout( () => {
    navigate('Home')

  }, 3000)
    return (
      <ImageBackground
        source={{uri: 'intro_photo'}}
        style={{width: '100%', height: '100%', flex:1}}>
      </ImageBackground>
    );
  }
}
