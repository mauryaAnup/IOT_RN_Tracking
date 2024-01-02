import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Image, Text, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import imageConstants from '../constants/imageConstants';

var db = openDatabase({name: 'UserDatabase.db'});

const SplashScreen = ({navigation}) => {
  const fade = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 2,
        duration: 1300,
        useNativeDriver: false,
      }),
    ]).start();
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Login'}],
        }),
      );
    }, 2300);
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10}}>
      <Animated.View
        style={{
          transform: [{scale: animation}],
        }}>
        <Image
          source={imageConstants.splash}
          resizeMode="contain"
          style={{
            width: '50%',
            height: '55%',
            alignSelf: 'center',
            marginTop: 120,
          }}
        />
      </Animated.View>
      <Animated.View style={{opacity: fade}}>
        <Text
          style={{
            color: 'black',
            fontSize: 35,
            width: '90%',
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: 'bold',
            marginTop: -110,
            fontStyle: 'italic',
          }}>
          Wild Animal Location Tracker
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
