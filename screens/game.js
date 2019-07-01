import React, {Component} from 'react';
import Sound from 'react-native-sound'
import AsyncStorage from '@react-native-community/async-storage';
import {AdMobInterstitial} from 'react-native-admob'
import {Image,
   TouchableOpacity,
   Text,
   Linking,
   ImageBackground,
   StyleSheet,
   scale,
   Animated,
   Easing,
   Dimensions,
   View,
   PanResponder,
   TouchableWithoutFeedback,
   TouchableHighlight,
   StatusBar

  } from 'react-native';

  // Enable playback in silence mode
Sound.setCategory('Playback');
import { ScaledSheet } from 'react-native-size-matters';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './home';



type Props = {};
export default class GameScreen extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      score: 0,
      ballOpacity: 1,
      hp: 3,
      whichBall: 1,
      tutma: true,
      dur: 0,
      gameOver: false,
      blueOpacity: 0,
      greenOpacity: 0,
      redOpacity: 0,
      hpAlertOpacity: 0,
      blueTimerOpacity: 0,
      greenTextOpacity: 0,
      blueTextOpacity: 0,}

    this.spinAnimation = new Animated.Value(0)
    this.ballAnimation = new Animated.ValueXY( {x: 0, y:0} )
    this.opacityAnimation = new Animated.Value(0)
    this.greenAnimation = new Animated.Value(0)
    this.blueAnimation = new Animated.Value(0)

    this.duration = 4000
    this.count = 0
    this.count2 = 0
    this.count3 = 0
    this.count4 = 0
    this.value = 0
    this.check = true
    this.right = true
    this.image = {uri: 'ball'}
    this.score = 0
    this.health = 3
    this.ballXdistance = 0
    this.ballYdistance = 0
    this.hypotenuse = 0
    this.radius = (this.getHeight() * 21.3) / 100
    this.ratio = 0
    this.cubuk = 0;
    this.degree = 0;
    this.checker = 0;
    this.place = 0
    this.gameOver = false;
    this.centerX = 0;
    this.centerY = 0;
    this.randomValue = 0;
    this.ballRandom = 0,
    this.blueDuration = 0,
    this.errorSound;
    this.bonusSound;
    this.hitSound;
    this.gameOverSound;
    this.highscore = 0;
    //AsyncStorage.setItem('@highscore', 0);

}

static navigationOptions = {
    header: null,
};

componentDidMount(){
    this.errorSound = new Sound('error_sound.mp3', Sound.MAIN_BUNDLE)
    this.bonusSound = new Sound('bonus_sound.mp3', Sound.MAIN_BUNDLE)
    this.hitSound = new Sound('hit_sound.mp3', Sound.MAIN_BUNDLE)
    this.gameOverSound = new Sound('game_over_sound.mp3', Sound.MAIN_BUNDLE)
    this.getData();
    this.animations()
}

// GET THE PHONE DIMENSIONS
getHeight(){
  return Math.round(Dimensions.get('screen').height);
}
getWidth(){
  return Math.round(Dimensions.get('screen').width);
}

storeData = async () => {

  try {
    await AsyncStorage.setItem('highestscore',  JSON.stringify(this.score))
  } catch (e) {
    // saving error
  }
}

getData = async () => {

  try {
    const value = await AsyncStorage.getItem('highestscore').then(
    (value) => {
      JSON.parse(value)
      if(value != null) {
        this.highscore = value
      }
      else{
        this.highscore = 0;
      }
        });
  } catch(e) {
    // error reading value
  }
}

// ANIMATONS OF THE BALLS
animationXD(){

      var RandomNumber = Math.floor(Math.random() * 6) + 1
      this.randomValue = 0
      if( (this.count3 >= 1 && this.count3 < 10) || (this.count2 >= 1 && this.count2 <= 10) ){
        this.ballRandom = Math.floor(Math.random() * 18) + 1
      }
      if( (this.count3 < 1 || this.count3 >= 10) && (this.count2 < 1 || this.count2 > 10 )){
        this.ballRandom = Math.floor(Math.random() * 20) + 1
      }
      
      if( this.ballRandom == 18 ){ // Heart
        this.setBall = 2
        this.image = {uri: 'hp'};
      }

      if( this.ballRandom == 19){ // Bonus Ball
        this.setBall = 3
        this.image = {uri: 'x2ball'};
      }

      if( this.ballRandom == 20){ // Slow Ball
        this.setBall = 4
        this.image = {uri: 'slow_ball'};
      }

      if( this.ballRandom >= 1 && this.ballRandom <= 17 ){ // Normal Ball
        this.setBall = 1
        this.image = {uri: 'ball'};
      }

      if( RandomNumber == 1){
        this.randomValue= Math.floor(Math.random() * 20) + 1,

        this.ballAnimation.setValue( { x: this.getWidth() * this.randomValue / 100, y: -(this.getHeight() / 15) })

        this.centerX = (this.getWidth() * this.randomValue / 100) + (this.getHeight() / 30)
        this.centerY = (-(this.getHeight() / 15)) + (this.getHeight() / 30)

        this.ballXdistance = (this.getWidth() / 2) - this.centerX
        this.ballYdistance = (this.getHeight() / 2) - this.centerY
        this.degree = 360 - Math.atan(this.ballXdistance / this.ballYdistance) * 57.2957795
        this.ballXdistance = Math.pow( this.ballXdistance, 2)
        this.ballYdistance = Math.pow( this.ballYdistance, 2)
        this.hypotenuse = this.ballXdistance + this.ballYdistance
        this.hypotenuse = Math.sqrt(this.hypotenuse)



      }
      if( RandomNumber == 2){
        this.randomValue = Math.floor(Math.random() * 20) + 1,
        this.ballAnimation.setValue( { x: this.getWidth() * (this.randomValue+80) / 100, y: -(this.getHeight() / 15) })

        this.centerX = (this.getWidth() * (this.randomValue+80) / 100) + (this.getHeight() / 30)
        this.centerY = -(this.getHeight() / 15) + (this.getHeight() / 30)

        this.ballXdistance = this.centerX - (this.getWidth() / 2)
        this.ballYdistance = (this.getHeight() / 2) - this.centerY
        this.degree = Math.atan(this.ballXdistance / this.ballYdistance) * 57.2957795

        this.ballXdistance = Math.pow( this.ballXdistance, 2)
        this.ballYdistance = Math.pow( this.ballYdistance, 2)
        this.hypotenuse = this.ballXdistance + this.ballYdistance
        this.hypotenuse = Math.sqrt(this.hypotenuse)


      }
      if( RandomNumber == 3){

        this.randomValue = Math.floor(Math.random() * 100) + 1,
        this.ballAnimation.setValue( { x: this.getWidth(), y: this.getHeight() * this.randomValue / 100 })

        this.centerX = (this.getWidth()) + (this.getHeight() / 30)
        this.centerY = (this.getHeight() * this.randomValue / 100) + (this.getHeight() / 30)

        this.ballXdistance = this.centerX - (this.getWidth() / 2)
        this.ballYdistance = Math.abs((this.getHeight() / 2) - this.centerY)

        if( this.randomValue < 50){
          this.degree = Math.atan(this.ballXdistance / this.ballYdistance) * 57.2957795
        }
        if( this.randomValue >= 50){
          this.degree = Math.atan(this.ballYdistance / this.ballXdistance) * 57.2957795 + 90
        }

        this.ballXdistance = Math.pow( this.ballXdistance, 2)
        this.ballYdistance = Math.pow( this.ballYdistance, 2)
        this.hypotenuse = this.ballXdistance + this.ballYdistance
        this.hypotenuse = Math.sqrt(this.hypotenuse)



      }
      if( RandomNumber == 4){

        this.randomValue = Math.floor(Math.random() * 20) + 1,
        this.ballAnimation.setValue( { x: this.getWidth() * (this.randomValue+80) / 100, y: this.getHeight() })

        this.centerX = (this.getWidth() * (this.randomValue+80) / 100) + (this.getHeight() / 30)
        this.centerY = (this.getHeight()) + (this.getHeight() / 30)

        this.ballXdistance = this.centerX - (this.getWidth() / 2)
        this.ballYdistance = this.centerY - (this.getHeight() / 2)

        this.degree = 180 - Math.atan(this.ballXdistance / this.ballYdistance) * 57.2957795

        this.ballXdistance = Math.pow( this.ballXdistance, 2)
        this.ballYdistance = Math.pow( this.ballYdistance, 2)
        this.hypotenuse = this.ballXdistance + this.ballYdistance
        this.hypotenuse = Math.sqrt(this.hypotenuse)


      }
      if( RandomNumber == 5){

        this.randomValue = Math.floor(Math.random() * 20) + 1,
        this.ballAnimation.setValue( { x: this.getWidth() * this.randomValue / 100, y: this.getHeight() })

        this.centerX = (this.getWidth() * this.randomValue / 100) + (this.getHeight() / 30)
        this.centerY = (this.getHeight()) + (this.getHeight() / 30)

        this.ballXdistance = (this.getWidth() / 2) - this.centerX
        this.ballYdistance = this.centerY - (this.getHeight() / 2)

        this.degree = 180 + Math.atan(this.ballXdistance / this.ballYdistance) * 57.2957795

        this.ballXdistance = Math.pow( this.ballXdistance, 2)
        this.ballYdistance = Math.pow( this.ballYdistance, 2)
        this.hypotenuse = this.ballXdistance + this.ballYdistance
        this.hypotenuse = Math.sqrt(this.hypotenuse)


      }
      if( RandomNumber == 6){

        this.randomValue = Math.floor(Math.random() * 100) + 1,

        this.ballAnimation.setValue( { x: -(this.getHeight() / 15), y: this.getHeight() * this.randomValue / 100 })

        this.centerX = (-(this.getHeight() / 15)) + (this.getHeight() / 30)
        this.centerY = (this.getHeight() * this.randomValue / 100) + (this.getHeight() / 30)

        this.ballXdistance = (this.getWidth() / 2) - this.centerX
        this.ballYdistance = Math.abs(this.centerY - (this.getHeight() / 2))

        if( this.randomValue < 50){
          this.degree = 360 - Math.atan(this.ballXdistance / this.ballYdistance) * 57.2957795
        }
        if( this.randomValue >= 50){
          this.degree = Math.atan(this.ballXdistance / this.ballYdistance) * 57.2957795 + 180
        }

        this.ballXdistance = Math.pow( this.ballXdistance, 2)
        this.ballYdistance = Math.pow( this.ballYdistance, 2)
        this.hypotenuse = this.ballXdistance + this.ballYdistance
        this.hypotenuse = Math.sqrt(this.hypotenuse)


      }
        this.ratio = ((this.hypotenuse) - (this.radius) - (this.getHeight()/30) ) / this.hypotenuse
        this.count++
        // SLOW BALL
        if(this.count2 != 0){
          this.count2++;
        }
}

test1Method(){
    this.place = (this.place + 360) % 360;
    if( (this.place % 360) > 225 ){

      if( this.degree >= this.place || this.degree <= (this.place + 135)%360  ){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      if( this.degree >= this.place && this.degree <= this.place + 135  ) {
        return true;
      }
      else{
        return false;
      }
    }
}


opacityAnimationMethod(){
  if(this.checker == 0){
    setTimeout( () => {
      this.setState({ ballOpacity: 0, tutma: this.test1Method()})
      if(this.setBall == 1 && !this.state.tutma ){
        if(this.health > 1){
          this.errorSound.play()
          this.setState({ errorOpacity: 0.4})
          this.health--

        }
        else{
          this.gameOverSound.play()
          this.gameOver = true;
        }
      }
      if(this.setBall == 2 && !this.state.tutma){
        //HEALTH
          if(this.health > 0 && this.health < 3){
            this.bonusSound.play()
            this.setState({ redOpacity: 0.4, hpAlertOpacity: 1})
            this.health++;
          }
      }
      if(this.setBall == 2 && this.state.tutma){
          if(this.health < 3){
            this.errorSound.play()
          }
      }

      if(this.setBall == 3 && !this.state.tutma){
        this.bonusSound.play()
        this.setState({ blueOpacity: 0.3, blueTextOpacity: 1})
        this.count3 = 1
        this.calculateBlue()
        this.timerAnimationBlue()
      }
      if(this.setBall == 3 && this.state.tutma){
            this.errorSound.play()
      }

      if(this.setBall == 4 && !this.state.tutma){
        this.bonusSound.play()
        this.setState({ greenOpacity: 0.2, greenTextOpacity: 1})
        this.timerAnimationGreen()
        this.count2 = 1
      }
      if(this.setBall == 4 && this.state.tutma){
          this.errorSound.play()
      }

      // SCORE
      if(this.count3 < 1 || this.count3 > 9){
        if(this.setBall == 1 && this.state.tutma){
          this.hitSound.play()
          this.score++
        }
      }
      else{
        if(this.count3 != 1){
          this.hitSound.play()
          this.score = this.score + 2;
        }
        this.count3++;
      }
      this.checker++;
      this.setState({ score: this.score, hp:this.health});
  }, this.state.dur)

  }
  else{
      this.setState({ ballOpacity: 0, tutma: this.test1Method()})
      if(this.setBall == 1 && !this.state.tutma ){
        if(this.health > 1){
          this.errorSound.play()
          this.health--
          this.setState({ errorOpacity: 0.4})
        }
        else{
          this.gameOverSound.play()
          if(this.score >= this.highscore ){
            this.highscore = this.score;
            this.storeData()
          }
          AdMobInterstitial.setAdUnitID('ca-app-pub-5906931591326087/7015416710');
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
          this.gameOver = true;
        }
      }
      if(this.setBall == 2 && !this.state.tutma){
        //HEALTH
          if(this.health > 0 && this.health < 3){
            this.bonusSound.play()
            this.setState({ redOpacity: 0.4, hpAlertOpacity: 1})
            this.health++;
          }
      }
      if(this.setBall == 2 && this.state.tutma){
          if(this.health < 3){
            this.errorSound.play()
          }
      }

      if(this.setBall == 3 && !this.state.tutma){
          this.bonusSound.play()
          this.setState({ blueOpacity: 0.3, blueTextOpacity: 1})

          this.count3 = 1
          this.calculateBlue()
          this.timerAnimationBlue()
      }
      if(this.setBall == 3 && this.state.tutma){
          this.errorSound.play()
      }

      if(this.setBall == 4 && !this.state.tutma ){
        this.bonusSound.play()
        this.setState({ greenOpacity: 0.2, greenTextOpacity: 1})
        this.timerAnimationGreen()
        this.count2 = 1
      }
      if(this.setBall == 4 && this.state.tutma){
          this.errorSound.play()
      }

      // SCORE BOOST
      if(this.count3 < 1 || this.count3 > 9){
        if(this.setBall == 1 && this.state.tutma){
          this.hitSound.play()
          this.score++
        }

      }
      else{
        if(this.setBall == 1 && this.state.tutma){
          this.hitSound.play()
          this.score = this.score + 2;
          this.count3++;
        }
        if((this.setBall == 1 && !this.state.tutma )|| this.setBall == 2){
          this.count3++;
        }

      }
      this.setState({ score: this.score, hp:this.health});
  }

}

opacityAnimationFunction(){

  setTimeout( () => {
    this.opacityAnimationMethod()

}, this.state.dur)

return this.opacityAnimation

}

// Calculating the duration of bonus
calculateBlue(){
  if(this.count < 5){
    if(this.count3 == 1){
      this.blueDuration = (5-this.count)*3000 + 5*2500 + this.count*2000
    }
  }
  if( this.count >= 5 && this.count < 10){
    if(this.count3 == 1){
      this.blueDuration = (10-this.count)*2500 + this.count*2000
    }
  }
  if( this.count >= 10 && this.count < 20){
    if(this.count3 == 1){
      this.blueDuration = (20-this.count)*2000 + (10-(20-this.count)) * 1500
    }
  }
  if( this.count >= 20 && this.count < 35){
    if(this.count3 == 1){
      if(this.count < 25){
        this.blueDuration = 10*1500
      }
      else{
        this.blueDuration = (35-this.count)*1500 + (10-(35-this.count)) * 1400
      }
    }
  }
  if( this.count >= 35&& this.count < 50){
    if(this.count3 == 1){
      if(this.count < 40){
        this.blueDuration = 10*1400
      }
      else{
        this.blueDuration = (50-this.count)*1400 + (10-(50-this.count)) * 1300
      }
    }
  }
  if( this.count >= 50 && this.count < 65){
    if(this.count3 == 1){
      if(this.count < 55){
        this.blueDuration = 10*1300
      }
      else{
        this.blueDuration = (65-this.count)*1300 + (10-(65-this.count)) * 1200
      }
    }
  }
  if( this.count >= 65 && this.count < 80){
    if(this.count3 == 1){
      if(this.count < 70){
        this.blueDuration = 10*1200
      }
      else{
        this.blueDuration = (80-this.count)*1200 + (10-(80-this.count)) * 1100
      }
    }
  }
  if( this.count >= 80 && this.count < 95){
    if(this.count3 == 1){
      if(this.count < 85){
        this.blueDuration = 10*1100
      }
      else{
        this.blueDuration = (95-this.count)*1100 + (10-(95-this.count)) * 1000
      }
    }

  }
  if( this.count >= 95){
    if(this.count3 == 1){
      this.blueDuration = 10*1000
    }
  }
}

timerAnimationBlue(){
  this.blueAnimation.setValue(this.getWidth()/5)
  Animated.timing(this.blueAnimation, {
    toValue: 0,
    duration: this.blueDuration,
    easing: Easing.linear
  }
  ).start(),

    setTimeout( () => {
      this.setState({ blueTextOpacity: 0 })
    }, this.blueDuration)
}

timerAnimationGreen(){
  this.greenAnimation.setValue(this.getWidth()/5)
  Animated.timing(this.greenAnimation, {
    toValue: 0,
    duration: 30000,
    easing: Easing.linear
  }
).start(),

  setTimeout( () => {
    this.setState({ greenTextOpacity: 0 })
  }, 30000)
}

// White Ball Animations
animations(){
  if(!this.gameOver ){
    this.animationXD()
    this.opacityAnimation.setValue(0)
    if(this.count2 >= 1 && this.count2 <= 11){
      this.duration = 3000
      this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
    }
    else{
      if(this.count < 5){
        this.duration = 3000
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
      if( this.count >= 5 && this.count < 10){
        this.duration = 2500
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
      if( this.count >= 10 && this.count < 20){
        this.duration = 2000
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
      if( this.count >= 20 && this.count < 35){
        this.duration = 1500
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
      if( this.count >= 35&& this.count < 50){
        this.duration = 1400
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
      if( this.count >= 50 && this.count < 65){
        this.duration = 1300
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
      if( this.count >= 65 && this.count < 80){
        this.duration = 1200
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
      if( this.count >= 80 && this.count < 95){
        this.duration = 1100
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
      if( this.count >= 95){
        this.duration = 1000
        this.setState({ errorOpacity: 0, redOpacity: 0, greenOpacity: 0, blueOpacity: 0, hpAlertOpacity: 0, ballOpacity: 1, dur: this.duration*this.ratio})
      }
    }
    Animated.parallel([
        Animated.timing(this.ballAnimation, {
          toValue: { x: this.getWidth()/2 - this.getHeight()/30 , y: this.getHeight()/2 - this.getHeight() /30},
          duration: this.duration,
          easing: Easing.linear
        }
      ),
      Animated.sequence([
        Animated.delay(this.state.dur),
        Animated.timing(this.opacityAnimationFunction(), {
          duration: this.duration-this.state.dur,
          easing: Easing.linear,
          toValue: 1
        })
      ])
    ]).start(() => this.animations())
  }
}

onPressIn() {
      if(this.right){
        setTimeout( () => {
          if (this.check) {
            this.value = this.value + 1;
            this.place = this.place + 5;
            this.value = this.value % 360
            this.spinAnimation.setValue(this.value)
            this.onPressIn()
        }
      }, 5)
      }
    else{
      setTimeout( () => {
        if (this.check) {
          this.place = this.place - 5;
          this.value = this.value - 1;
          this.value = this.value % 360
          this.spinAnimation.setValue(this.value)
          this.onPressIn()
      }
    }, 5)
    }

}

render() {
    const {navigate} = this.props.navigation;
    const spin = this.spinAnimation.interpolate({

      inputRange: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
        50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
        60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
        70, 71],
      outputRange: [
       '0deg', '5deg', '10deg', '15deg', '20deg', '25deg', '30deg', '35deg',
       '40deg', '45deg', '50deg', '55deg', '60deg', '65deg', '70deg', '75deg',
       '80deg', '85deg', '90deg', '95deg', '100deg', '105deg', '110deg', '115deg',
       '120deg', '125deg', '130deg', '135deg', '140deg', '145deg', '150deg', '155deg',
       '160deg', '165deg', '170deg', '175deg', '180deg', '185deg', '190deg', '195deg',
       '200deg', '205deg', '210deg', '215deg', '220deg', '225deg', '230deg', '235deg',
       '240deg', '245deg', '250deg', '255deg', '260deg', '265deg', '270deg', '275deg',
       '280deg', '285deg', '290deg', '295deg', '300deg', '305deg', '310deg', '315deg',
       '320deg', '325deg', '330deg', '335deg', '340deg', '345deg', '350deg', '355deg',]
    })
    if( this.gameOver ){
      return(
      <ImageBackground
        source={{uri: 'background'}}
        style={{width: '100%', height: '100%', flex:1}}>
        <ImageBackground
          style={{
            flex: 1,
            position: 'absolute',
            height: this.getHeight()*(17/18),
            width: this.getHeight()*(17/18)*(3/2),
            bottom: this.getHeight()*(5/100),
            right: ( this.getWidth() - this.getHeight()*(17/18)*(3/2) )/2
          }}
          source = {{uri: 'game_over'}} >

          <Text style = {styles.modalButtonHighScoreStyle}>High Score: {this.highscore}</Text>
          <Text style = {styles.modalButtonScoreStyle}>Score: {this.state.score}</Text>

          <TouchableOpacity
             style={{
             position: 'absolute',
             justifyContent: 'center',
             alignItems: 'center',
             width: this.getHeight()/2,
             height: this.getHeight()/15,
             bottom: '35%',
             right: '28%'}}
             onPress={()=>navigate('Home')}
             >
             <Text style = {styles.modalButtonTextStyle}>PLAY AGAIN</Text>
          </TouchableOpacity>

        </ImageBackground>
      </ImageBackground>
    );
    }
    else{
      return(

      <ImageBackground
        source={{uri: 'background'}}
        style={{width: '100%', height: '100%', flex:1}}>

        <Text style = {styles.scoreStyle}>
          Score: {this.state.score}
        </Text>
        <Animated.Image
          style={[{
          width: this.getHeight()/15,
          height: this.getHeight()/15,
          opacity: this.state.ballOpacity}, this.ballAnimation.getLayout()]}
          source = {this.image} >
        </Animated.Image>


        <Image
          style={{
            height: this.getHeight()/3,
            width: this.getHeight()/3,
            position: 'absolute',
            flex: 1,
            bottom: this.getHeight()/3,
            right: (this.getWidth() - this.getHeight()/3)/2,
          }}
          source = {{uri: 'dynamite'}} >
        </Image>

        <Image
          style={{
            height: this.getHeight()*(42.6)/100,
            width: this.getHeight()*(42.6)/100,
            position: 'absolute',
            flex: 1,
            bottom: this.getHeight()*(28.7)/100,
            right: (this.getWidth() - this.getHeight()*(42.6)/100)/2,
          opacity: 0.5}}
          source = {{uri: 'sphere'}} >
        </Image>

        <Image
          style={{
            height: this.getHeight()*(42.6)/100,
            width: this.getHeight()*(42.6)/100,
            position: 'absolute',
            flex: 1,
            bottom: this.getHeight()*(28.7)/100,
            right: (this.getWidth() - this.getHeight()*(42.6)/100)/2,
          opacity: this.state.redOpacity}}
          source = {{uri: 'red'}} >
        </Image>
        <Image
          style={{
            height: this.getHeight()*(42.6)/100,
            width: this.getHeight()*(42.6)/100,
            position: 'absolute',
            flex: 1,
            bottom:this.getHeight()*(28.7)/100,
            right: (this.getWidth() - this.getHeight()*(42.6)/100)/2,
          opacity: this.state.blueOpacity}}
          source = {{uri: 'blue'}} >
        </Image>
        <Image
          style={{
            height: this.getHeight()*(42.6)/100,
            width: this.getHeight()*(42.6)/100,
            position: 'absolute',
            flex: 1,
            bottom: this.getHeight()*(28.7)/100,
            right: (this.getWidth() - this.getHeight()*(42.6)/100)/2,
            opacity: this.state.greenOpacity}}
          source = {{uri: 'green'}} >
        </Image>
        <Image
          style={{
          width: this.getHeight()/6,
          height: this.getHeight()/12,
          position: 'absolute',
          flex:1,
          right: this.getWidth()/2 - this.getHeight()/15,
          bottom: this.getHeight()*(85/100),
          opacity: this.state.hpAlertOpacity}}
          source = {{uri: 'hp_alert'}} >
        </Image>

        <Image
          style={{
            height: this.getHeight()/18,
            width: this.getHeight()/18,
            position: 'absolute',
            flex: 1,
            bottom: this.getHeight()*(92/100),
            right: this.getWidth()*(95/100),}}
          source = {{uri: 'hp'}} >
        </Image>
        <View style = {{
          justifyContent: 'center',
          alignItems: 'center',
          bottom: this.getHeight()*(93/100),
          right: this.getWidth()*(91/100),
          height: this.getHeight()/18,
          width: this.getHeight()/18,
          position: 'absolute',
          flex: 1}}>

          <Text style = {styles.hpTextStyle}>
            x{this.state.hp}
          </Text>

          </View>


        <Animated.Image
          style={{
              flex: 1,
              position: 'absolute',
              height: this.getWidth() / 110,
              width: this.blueAnimation,
              bottom: this.getHeight()*95/100,
              left: this.getWidth() * (44/100),}}
          source = {{uri: 'blue_timer'}} >
        </Animated.Image>

        <View style = {{
          opacity: this.state.blueTextOpacity,
          justifyContent: 'center',
          alignItems: 'center',
          bottom: this.getHeight()*(91.3/100),
          right: this.getWidth()*(56.5/100),
          height: this.getHeight()/10,
          width: this.getWidth()/9,
          position: 'absolute',
          flex: 1}}>

          <Text style = {styles.blueTextStyle}>
            x2 Score
          </Text>

          </View>

        <Animated.Image
          style={{
          flex: 1,
          position: 'absolute',
          height: this.getWidth() / 110,
          width: this.greenAnimation,
          bottom: this.getHeight()*95/100,
          left: this.getWidth() * (41/100),
          }}
          source = {{uri: 'green_timer'}} >
        </Animated.Image>

        <View style = {{
          opacity: this.state.greenTextOpacity,
          justifyContent: 'center',
          alignItems: 'center',
          bottom: this.getHeight()*(91.3/100),
          right: this.getWidth()*(59.5/100),
          height: this.getHeight()/10,
          width: this.getWidth()/17,
          position: 'absolute',
          flex: 1}}>

          <Text style = {styles.greenTextStyle}>
            Slow
          </Text>

          </View>

        <Animated.Image
            style={{height: this.getHeight() / 100*45,
            width: this.getHeight() / 100*45,
            position: 'absolute',
            bottom: this.getHeight()*(27.5/100),
            right: (this.getWidth() - this.getHeight() / 100*45)/2,
            flex: 1,
            transform: [{rotate: spin}],
           }}
            source = {{uri: 'wall'}} >
        </Animated.Image>

           <Image
             style={{height: this.getHeight(),
             width: this.getWidth(),
             position: 'absolute',
             flex: 1,
             opacity: this.state.errorOpacity}}
             source = {{uri: 'error'}} >
           </Image>

           <TouchableOpacity
              style={{
                height: this.getHeight(),
                width: this.getWidth()/2,
                bottom: this.getHeight()*(6.3/100),
                left: this.getWidth()/2,
                position: 'absolute',
                flex:1
              }}
              activeOpacity = {1}
              onPressIn={ () => {this.check = true, this.right = true, this.onPressIn()  }}
              onPressOut={ ()=>{ this.check = false }}
              >
           </TouchableOpacity>
           <TouchableOpacity

            style={{width: this.getWidth()/2, height:this.getHeight(), flex:1, position: 'absolute', left: 0, bottom: this.getHeight()*(6.3/100),}}
            onPressIn={ () => {this.check = true, this.right = false, this.onPressIn()  }}
            onPressOut={ ()=>{this.check = false}}
            >
           </TouchableOpacity>
      </ImageBackground>

    );
    }
  }
}

const styles = ScaledSheet.create({
  modalButtonScoreStyle: {
    flex: 1,
    bottom: '43%',
    right: '37%',
    position:'absolute',
    fontSize: '20@s',
    fontWeight: 'bold',
    color: 'white'
  },
  greenTextStyle: {
      flex: 1,
      position:'absolute',
      fontSize: '16@s',
      color: '#3EE048'
  },
  blueTextStyle: {
      flex: 1,
      position:'absolute',
      fontSize: '16@s',
      color: '#4A51DE'
  },
  modalButtonHighScoreStyle: {
    flex: 1,
    bottom: '51%',
    right: '32%',
    position:'absolute',
    fontSize: '20@s',
    fontWeight: 'bold',
    color: 'white'
  },
  modalButtonTextStyle: {
    flex: 1,
    position:'absolute',
    fontSize: '23@s',
    fontWeight: 'bold',
    color: '#FFD14A'
  },
  hpTextStyle: {
    fontSize: '17@s',
    position: 'absolute',
    color: 'white'
  },
  scoreStyle: {
    fontSize: '17@s',
    position: 'absolute',
    flex: 1,
    bottom: '92%',
    right: '2%',
    color: 'white'
  },

});
