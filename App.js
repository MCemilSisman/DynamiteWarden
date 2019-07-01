import React, {Component} from 'react';
import Sound from 'react-native-sound';
import {Platform, StyleSheet, View, Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/home';
import GameScreen from './screens/game';
import VideoScreen from './screens/video';

const MainNavigator = createStackNavigator({
  Video: {screen: VideoScreen,
  navigationOptions: {
    gesturesEnabled: false,
  },
},
  Home: {screen: HomeScreen,
  navigationOptions: {
    gesturesEnabled: false,
  },
},
  Game: {screen: GameScreen,
  navigationOptions: {
    gesturesEnabled: false,
  },
},


  headerMode: 'none'
});
var errorSound = new Sound('error_sound.mp3', Sound.MAIN_BUNDLE);
var bonusSound = new Sound('bonus_sound.mp3', Sound.MAIN_BUNDLE);
var hitSound = new Sound('hit_sound.mp3', Sound.MAIN_BUNDLE);
var gameOverSound = new Sound('game_over_sound.mp3', Sound.MAIN_BUNDLE);

const App = createAppContainer(MainNavigator);
export default App;
