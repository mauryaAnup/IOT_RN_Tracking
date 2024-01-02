import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../LoginScreen';
import SplashScreen from '../SplashScreen';
import RegistrationScreen from '../Registration';
import DashboardScreen from '../Dashboard';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          animation: 'none',
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{
            headerTransparent: true,
            title: '',
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerShown: false,
            headerTransparent: true,
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
