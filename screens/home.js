import React, {Component} from 'react';
import {Image,
   TouchableOpacity,
   Text,
   Linking,
   ImageBackground,
   Platform,
   StyleSheet,
   scale,
   verticalScale,
   moderateScale,
   Animated,
   Easing,
   Dimensions,
   TouchableHighlight,
   View,
  } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import GameScreen from './game';
import VideoScreen from './video';


type Props = {};
export default class HomeScreen extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {}
    this.textValue = new Animated.Value(0)
  }
  static navigationOptions = {
    header: null,
  };
  componentDidMount(){
    this.textAnim()
  };

  getHeight(){
    return Math.round(Dimensions.get('window').height);
  }
  getWidth(){
    return Math.round(Dimensions.get('window').width);
  }

  textAnim ()  {
      this.textValue.setValue(0)
      Animated.timing(this.textValue, {
        toValue: 2,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => this.textAnim())
  }

  render() {
    const {navigate} = this.props.navigation;
    var textFS = this.textValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [this.getHeight() / 12, this.getHeight() / 11, this.getHeight() / 12]
  })

    return (

      <ImageBackground
        source={{uri: 'background'}}
        style={{width: '100%', height: '100%', flex:1}}>
        <TouchableOpacity
         style={{
           width: this.getHeight()/10,
           height: this.getHeight()/10,
           position: 'absolute',
           bottom: this.getHeight()*(2/100),
           right:  this.getHeight()/10*(6/5) + this.getWidth()*(2/100) + this.getHeight()/5 +  this.getHeight()/5,
           flex:1
         }}
         onPress={ ()=>{ Linking.openURL('https://www.instagram.com/atc_apps/')}}
       >
       <Image
        source={{uri: 'instagram'}}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          flex:1
        }} />
        </TouchableOpacity>

        <TouchableOpacity
         style={{
           width: this.getHeight()/10*(6/5),
           height: this.getHeight()/10,
           position: 'absolute',
           bottom: this.getHeight()*(2/100),
           right: this.getHeight()/5 + this.getWidth()*(2/100),
           flex:1
         }}
         onPress={ ()=>{ Linking.openURL('https://twitter.com/atc_apps')}}
         >
        <Image
         source={{uri: 'twitter'}}
         style={{
           width: '100%',
           height: '100%',
           position: 'absolute',
           flex:1
         }} />
        </TouchableOpacity>

        <View style = {{
          JustifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: this.getHeight()/10*(6/5) + this.getWidth()*(2/100) + this.getHeight()/5,
          bottom: 0,
          width: this.getHeight()/5,
          height: this.getHeight()/10,
          flex: 1}}>

        <Text style={styles.instagramTextStyle}>
          /ATC_apps
        </Text>
        </View>

        <View style = {{
          JustifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: this.getWidth()*(2/100),
          bottom: 0,
          width: this.getHeight()/5,
          height: this.getHeight()/10,
          flex: 1}}>
        <Text style={styles.twitterTextStyle}>
          /ATC_apps
        </Text>
        </View>


        <Image
         source={{uri: 'dynamite'}}
         style={{
           height: this.getHeight()/3,
           width: this.getHeight()/3,
           position: 'absolute',
           flex: 1,
           bottom: this.getHeight()*(2/5),
           right: (this.getWidth() - this.getHeight()/3)/2,
         }} />

         <TouchableOpacity
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: this.getWidth()*(2/5),
            height: this.getHeight()/6,
            bottom: this.getHeight()/5,
            right: this.getWidth()*(3/10),
          }}
          onPress={()=>navigate('Game') }
          >

          <Animated.Text
            style={{fontWeight: 'bold',
            color: '#FFD14A',
            fontSize: textFS }}>
            TAP TO PLAY
          </Animated.Text>
         </TouchableOpacity>
      </ImageBackground>
    );
  }
}




const styles = ScaledSheet.create({
  dynamiteStyle:{
    height: '100@s',
    width: '100@s',
    position: 'absolute',
    flex: 1,
    bottom: '43%',
    right: '40%',
  },
  instagramTextStyle:{
    fontSize: '11@s',
    fontWeight: 'bold',
  },
  twitterTextStyle:{
    fontSize: '11@s',
    fontWeight: 'bold',
  },
  twitterStyle: {
    width: '35@s',
    height: '35@s',
    position: 'absolute',
    bottom: '2%',
    right: '12%',
  },
  twitterPicStyle: {
    width: '35@s',
    height: '35@s',
    position: 'absolute',
  },
  playStyle:{},

});
