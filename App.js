import React, { useEffect, useState } from 'react';

import { Provider as PaperProvider } from 'react-native-paper';

import LoginScreen from './screens/Auth/LoginScreen';
import SignInScreen from './screens/Auth/SigninScreen';

import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import About from './screens/Other/About';
import AskQuestions from './screens/Questions/AskQuestions';
import Questions from './screens/Questions/AskedQuestions';
import DashBoard from './screens/DashBoard';
import SummaryReports from './screens/summary-report/SummaryReports';
import Profile from './screens/Profile/Profile';
import PublishAdvertisements from './screens/Advertisements/PublishAdvertisements';
import UploadKnowledge from './screens/knowledge/UploadKnowledge';

import GKpapers from './screens/Papers/GKpapers/GKpapers';
import IQpapers from './screens/Papers/IQpapers/IQpapers';

import International from './screens/Papers/GKpapers/International';
import History from './screens/Papers/GKpapers/History';

import {DrawerContent} from './screens/Drawer/DrawerContent';

const HomeStack = createStackNavigator();
const AskQuestionStack = createStackNavigator();
const QuestionStack = createStackNavigator();
const SummaryReportStack = createStackNavigator();
const AboutStack = createStackNavigator();
const UploadAdvertisementStack = createStackNavigator();
const UploadKnowledgeStack = createStackNavigator();
const IQpaperStack = createStackNavigator();
const GKpaperStack = createStackNavigator();

const Drawer = createDrawerNavigator();

import {AuthContext} from './components/Context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ForgotPassword from './screens/Auth/ForgotPassword';
import Health from './screens/Papers/GKpapers/Health';
import Politics from './screens/Papers/GKpapers/Politics';
import Sports from './screens/Papers/GKpapers/Sports';
import LogicRelated from './screens/Papers/IQpapers/LogicRelated';
import NumberSequence from './screens/Papers/IQpapers/NumberSequence';
import SpeedRelated from './screens/Papers/IQpapers/SpeedRelated';
import TimeRelated from './screens/Papers/IQpapers/TimeRelated';
import AgeRelated from './screens/Papers/IQpapers/AgeRelated';
import GKTestDetails from './screens/Papers/GKpapers/GKTestDetails';
import GKExam from './screens/Papers/GKpapers/GKExam';
import GKResult from './screens/Papers/GKpapers/GKResult';
import IQTestDetails from './screens/Papers/IQpapers/IQTestDetails';
import IQExam from './screens/Papers/IQpapers/IQexam';
import IQResult from './screens/Papers/IQpapers/IQResult';
import IQAnswers from './screens/Papers/IQpapers/IQAnswers';
import GKAnswers from './screens/Papers/GKpapers/GKAnswers';


const AuthStackScreen = ({navigation})=>{
  return(
      <HomeStack.Navigator initialRouteName="Login">
        <HomeStack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen 
          name="Signin" 
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <HomeStack.Screen 
          name="Forgot Password"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
  )
}

const HomeStackScreen = ({navigation})=>{
  return(
      <HomeStack.Navigator initialRouteName="Login">
        <HomeStack.Screen 
          name="DashBoard" 
          component={DashBoard}
          options={{
            title : 'Brain Master',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />
      </HomeStack.Navigator>
  )
}


const GKpaperScreen = ({navigation})=>{
  return (
    <GKpaperStack.Navigator initialRouteName="GKpaper">
        <GKpaperStack.Screen 
          name="GKpaper" 
          component={GKpapers}
          options={{
            title : 'GK Papers',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}}/>
            )
          }}
        />

        <GKpaperStack.Screen 
          name="GK Health" 
          component={Health}
          options={{
            title : 'GK Health',
            headerShown : true,
          }}
        />

        <GKpaperStack.Screen 
          name="GK History" 
          component={History}
          options={{
            title : 'GK History',
            headerShown : true,
          }}
        />

        <GKpaperStack.Screen 
          name="GK International" 
          component={International}
          options={{
            title : 'GK International',
            headerShown : true,
          }}
        />

        <GKpaperStack.Screen 
          name="GK Politics" 
          component={Politics}
          options={{
            title : 'GK Politics',
            headerShown : true,
          }}
        />

        <GKpaperStack.Screen 
          name="GK Sports" 
          component={Sports}
          options={{
            title : 'GK Sports',
            headerShown : true,
          }}
        />

        <GKpaperStack.Screen
          name="GK Test Details" 
          component={GKTestDetails}
          options={{
            title : 'Test Details',
            headerShown : true,
          }}
        />

        <GKpaperStack.Screen
          name="GK Exam" 
          component={GKExam}
          options={{
            title : 'GK Exam',
            headerShown : true,
            headerLeft : ()=> null
          }}
        />

        <GKpaperStack.Screen
          name="GK Result" 
          component={GKResult}
          options={{
            title : 'GK Result',
            headerShown : true,
            headerLeft : ()=> null
          }}
        />

        <GKpaperStack.Screen
          name="GK Answers" 
          component={GKAnswers}
          options={{
            title : 'GK Answers',
            headerShown : true,
            headerLeft : ()=> null
          }}
        />

    </GKpaperStack.Navigator>
  )
}


const IQPaperScreen = ({navigation})=>{
  return (
    <IQpaperStack.Navigator>
        <IQpaperStack.Screen 
          name="IQpaper" 
          component={IQpapers}
          options={{
            title : 'IQ Papers',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />

        <IQpaperStack.Screen 
          name="IQ Age Related"
          component={AgeRelated}
          options={{
            title : 'IQ Age Related Papers',
            headerShown : true,
          }}
        />

        <IQpaperStack.Screen 
          name="IQ Logic"
          component={LogicRelated}
          options={{
            title : 'IQ Logic Papers',
            headerShown : true,
          }}
        />

        <IQpaperStack.Screen 
          name="IQ Number Sequence"
          component={NumberSequence}
          options={{
            title : 'IQ Number Sequence Papers',
            headerShown : true,
          }}
        />

        <IQpaperStack.Screen 
          name="IQ Speed Related"
          component={SpeedRelated}
          options={{
            title : 'IQ Speed Related Papers',
            headerShown : true,
          }}
        />


        <IQpaperStack.Screen 
          name="IQ Time Related"
          component={TimeRelated}
          options={{
            title : 'IQ Time Related Papers',
            headerShown : true,
          }}
        />

        <IQpaperStack.Screen
          name="IQ Test Details" 
          component={IQTestDetails}
          options={{
            title : 'Test Details',
            headerShown : true,
          }}
        />

        <IQpaperStack.Screen
          name="IQ Exam" 
          component={IQExam}
          options={{
            title : 'IQ Exam',
            headerShown : true,
            headerLeft : ()=> null
          }}
        />

        <IQpaperStack.Screen
          name="IQ Result" 
          component={IQResult}
          options={{
            title : 'IQ Result',
            headerShown : true,
            headerLeft : ()=> null
          }}
        />

        <IQpaperStack.Screen
          name="IQ Answers" 
          component={IQAnswers}
          options={{
            title : 'IQ Answers',
            headerShown : true,
            headerLeft : ()=> null
          }}
        />

    </IQpaperStack.Navigator>
  )
}


const AskQuestionsScreen = ({navigation})=>{
  return (
    <AskQuestionStack.Navigator>
        <HomeStack.Screen 
          name="Ask Questions" 
          component={AskQuestions}
          options={{
            title : 'Ask Questions',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />
    </AskQuestionStack.Navigator>
  )
}

const QuestionsScreen = ({navigation})=>{
  return (
    <QuestionStack.Navigator>
        <HomeStack.Screen 
          name="Questions" 
          component={Questions}
          options={{
            title : 'Questions',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />
    </QuestionStack.Navigator>
  )
}

const SummaryReportScreen = ({navigation})=>{
  return (
    <SummaryReportStack.Navigator>
        <HomeStack.Screen 
          name="Summary Report" 
          component={SummaryReports}
          options={{
            title : 'Summary Report',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />
    </SummaryReportStack.Navigator>
  )
}

const ProfileScreen = ({navigation})=>{
  return (
    <SummaryReportStack.Navigator>
        <HomeStack.Screen 
          name="Profile" 
          component={Profile}
          options={{
            title : 'Profile',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />
    </SummaryReportStack.Navigator>
  )
}

const UploadKnowledgeScreen = ({navigation})=>{
  return (
    <UploadKnowledgeStack.Navigator>
        <HomeStack.Screen 
          name="UploadKnowledge" 
          component={UploadKnowledge}
          options={{
            title : 'Upload Knowledege',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />
    </UploadKnowledgeStack.Navigator>
  )
}


const AdvertisementsScreen = ({navigation})=>{
  return (
    <UploadAdvertisementStack.Navigator>
        <HomeStack.Screen 
          name="PublishAdvertisements" 
          component={PublishAdvertisements}
          options={{
            title : 'Advertisements',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />
    </UploadAdvertisementStack.Navigator>
  )
}

const AboutScreen = ({navigation})=>{
  return (
    <AboutStack.Navigator>
        <HomeStack.Screen 
          name="About" 
          component={About}
          options={{
            title : 'About',
            headerShown : true,
            headerLeft : ()=>(
              <Icon.Button name="ios-menu" size={35} backgroundColor="#ffffff" color="#000000" onPress={()=>{navigation.openDrawer()}} />
            )
          }}
        />
    </AboutStack.Navigator>
  )
}



export default function App() {

  const initialLoginState = {
    isLoading: true,
    user: null,
    userId: null
  }

  const loginReducer = (prevState,action) =>{
    switch(action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userId: action.user_id,
          user: action.user,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          user : action.user,
          userId: action.user_id,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          user: null,
          userId: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          user : action.user,
          userId: action.user_id,
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

  const authContext = React.useMemo(()=>({
    login: async (user,userId)=>{
        try {
          await AsyncStorage.setItem('user_id', userId.toString());
        } catch (e) {
          console.log(e.message);
        }
      //}

      // dispatch({type:'LOGIN',user: user, user_id: userId})
      dispatch({type:'LOGIN',user_id: userId})
    },
    signup: ()=>{
    },
    signout: async()=>{
      try {
        await AsyncStorage.removeItem('user_Id');
        await AsyncStorage.clear();
      } catch (e) {
        console.log(e.message);
      }

      dispatch({type:'LOGOUT'})
    },
    getUser: ()=>{
      dispatch({type:'RETRIEVE_TOKEN'})
    }
  }),[]);

  useEffect(()=>{
    setTimeout(async()=>{
      try {
        userId = await AsyncStorage.getItem('user_id');
        userId = await AsyncStorage.getItem('user_id');
      } catch (e) {
        console.log(e.message);
      }
      dispatch({type:'RETRIEVE_TOKEN', user_id: userId})
    },1000);
  },[])

  if(loginState.isLoading) {
    return(
      <View style={styles.loadingIndicator}>
        <Text>Loading</Text>
      </View>
    )
  }


  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
       <NavigationContainer>
          {loginState.userId != null ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
              <Drawer.Screen name="DashBoard" component={HomeStackScreen} />
              <Drawer.Screen name="IQ Papers" component={IQPaperScreen} />
              <Drawer.Screen name="GK Papers" component={GKpaperScreen} />
              <Drawer.Screen name="Ask Questions" component={AskQuestionsScreen} />
              <Drawer.Screen name="Questions" component={QuestionsScreen} />
              <Drawer.Screen name="Summary Report" component={SummaryReportScreen} />
              <Drawer.Screen name="Profile" component={ProfileScreen} />
              <Drawer.Screen name="PublishAdvertisements" component={AdvertisementsScreen} />
              <Drawer.Screen name="UploadKnowledge" component={UploadKnowledgeScreen} />
              <Drawer.Screen name="About" component={AboutScreen} />
            </Drawer.Navigator>
          ):
            <AuthStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

const styles= StyleSheet.create({
  loadingIndicator: {
    flex : 1,
    justifyContent : 'center',
    alignItems: 'center'
  }
})
