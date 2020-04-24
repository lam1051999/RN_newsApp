import React, { useEffect, createContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signin from './src/containers/authentication/components/Signin';
import Signup from './src/containers/authentication/components/Signup';
import Home from './src/containers/tabs/home/Home';
import Search from './src/containers/tabs/search/Search';
import Profile from './src/containers/tabs/profile/Profile';
import { StatusBar } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import { GoogleSignin } from '@react-native-community/google-signin';

import { API_KEY, PROJECT_ID, SENDER_ID, APP_ID, MEASUREMENT_ID, WEB_CLIENT_ID } from 'react-native-dotenv';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: `${PROJECT_ID}`,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: `${SENDER_ID}`,
  appId: `${APP_ID}`,
  measurementId: `G-${MEASUREMENT_ID}`
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const AuthenStack = createStackNavigator();
const AppStack = createBottomTabNavigator();

export const UserContext = createContext();
export default function App() {
  const [user, setUser] = useState(null);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user)
        setUser(user);
      SplashScreen.hide();
    })
  }, [user])

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: `${WEB_CLIENT_ID}`,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, [])

  return (
    <UserContext.Provider value={{
      user: user,
      setUser: setUser,
      isGoogleLogin: isGoogleLogin,
      setIsGoogleLogin: setIsGoogleLogin
    }}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <NavigationContainer>
        {user === null ?
          <AuthenStack.Navigator screenOptions={{
            headerShown: false,
          }}
            initialRouteName="Signin"
          >
            <AuthenStack.Screen name="Signin" component={Signin} />
            <AuthenStack.Screen name="Signup" component={Signup} />
          </AuthenStack.Navigator>
          :
          <AppStack.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Headlines") {
                  iconName = focused ? "home" : "home-outline"
                  return <MaterialCommunityIcon name={iconName} size={size} color={color} />
                } else if (route.name === "Search") {
                  iconName = "ios-search"
                  return <Ionicon name={iconName} size={size} color={color} />
                } else if (route.name === "Profile") {
                  iconName = focused ? "user" : "user-o"
                  return <FontAwesomeIcon name={iconName} size={size} color={color} />
                }
              }
            })}
            tabBarOptions={{
              activeTintColor: '#0288d1',
              inactiveTintColor: 'gray',
              keyboardHidesTabBar: true
            }}
          >
            <AppStack.Screen name="Headlines" component={Home} />
            <AppStack.Screen name="Search" component={Search} />
            <AppStack.Screen name="Profile" component={Profile} />
          </AppStack.Navigator>
        }
      </NavigationContainer>
    </UserContext.Provider>
  );
}


