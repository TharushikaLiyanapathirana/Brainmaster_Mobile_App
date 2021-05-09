import * as React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, DrawerActions } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen'
import SignInScreen from '../screens/SigninScreen'
import Questions from '../screens/Questions';

import { Text } from 'react-native';
import DrawerNavigator from '../components/DrawerNavigator';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';

// const HomeStackScreen = ({navigation}) =>{
//     <HomeStack.Navigator screenOptions={{
//         headerStyle : {
//             backgroundColor : 'blue'
//         },
//         headerTintColor : '#ffffff'
//     }}>

//     <HomeStack.Screen name="DrawerNavigator" 
//         component={DrawerNavigator}
//         options={()=>{
//             navigation.openDrawer();
//         }}
//     ></HomeStack.Screen>

//     </HomeStack.Navigator>
// }

const screens = {
    Login : {
        screen : LoginScreen,
        navigationOptions : {
            headerShown: false
        }
    },
    Signin : {
        screen: SignInScreen,
        navigationOptions : {
            headerShown: false
        }
    },
    Questions : {
        screen: Questions,
        navigationOptions : {
            title : 'Questions',
            headerStyle:{
                backgroundColor : 'blue'
            }
        }
    },
    DrawerNavigator : {
        screen : DrawerNavigator,
        navigationOptions:  {
            title: 'Brain Master'
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);