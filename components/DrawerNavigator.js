import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Button  } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import About from '../screens/About';
import AskQuestions from '../screens/AskQuestions';
import Questions from '../screens/Questions';
import Home from '../screens/Home';
import SummaryReports from '../screens/SummaryReports';
import Profile from '../screens/Profile';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator(props){

    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Ask Questions" component={AskQuestions} />
                <Drawer.Screen name="Questions" component={Questions} />
                <Drawer.Screen name="Summary Report" component={SummaryReports} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="About Us" component={About} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}