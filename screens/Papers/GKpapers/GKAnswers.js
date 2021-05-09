import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, BackHandler } from 'react-native';
import { Button, Divider , RadioButton, TextInput } from 'react-native-paper';

import * as ScreenOrientation from 'expo-screen-orientation';

import { StackActions } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import config from '../../../config/config.js';

export default function GKAnswers(props){

    const [question, setQuestion] = useState(null);
    const [markings, setMarkings] = useState(null);
    const [isLoading, setISLoading] = useState(true);

    const getAnswers = async () =>{

        const selectedPaperID = await AsyncStorage.getItem('selected_paper_id');
        const marking = await AsyncStorage.getItem('iqExamMarking');

        let requestBody = {
            paper_id : selectedPaperID
        }

        axios.post(config.API_URL+"/paper2", requestBody)
        .then((res)=>{
            setMarkings(JSON.parse(marking));
            setQuestion(res.data.result.rows);
            setISLoading(false);
        })

    }

    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    const gotoHome = async () =>{
        await AsyncStorage.removeItem('iqExamMarking');
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        props.navigation.dispatch(StackActions.popToTop());
    }

    const backHandler = () =>{
        BackHandler.addEventListener('hardwareBackPress', async function () {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            props.navigation.goBack();
        })
    }

    useEffect(()=>{
        changeScreenOrientation();
        getAnswers();
        backHandler();
    },[]);
      

    return(
        <View>
            <View style={styles.tableHeading}>
                <Text style={styles.tableText}>QUESTION</Text>
                <Text style={styles.tableText}>ANSWER</Text>
                <Text style={styles.tableText}>STATUS</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading?false: question.map((q,index)=>{
                    if(index%2 == 0){
                        return(
                            <View key={index} style={styles.tableDescription1}>
                                <Text>{q.question}</Text>
                                <Text>{q.answer}</Text>
                                <Text>{markings[index]}</Text>
                            </View>
                        )
                    }else{
                        return(
                            <View key={index} style={styles.tableDescription2}>
                                <Text>{q.question}</Text>
                                <Text>{q.answer}</Text>
                                <Text>{markings[index]}</Text>
                            </View>
                        )
                    }
                    })
                }
                <View style={styles.temp}>
                <View style={styles.btnContainer}>
                    <Button mode="contained" onPress={() => gotoHome()} style={styles.btn}>
                        Goto GK Papers
                    </Button>
                </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tableHeading : {
        backgroundColor : '#0d47a1',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems : 'center'
    },
    tableText : {
        color : 'white',
        fontWeight : 'bold',
        marginRight : 50
    },
    tableDescription1 : {
        backgroundColor : '#eceff1',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems : 'center',
    },
    tableDescription2 : {
        backgroundColor : '#fafafa',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems : 'center',
    },
    div2 : {
        backgroundColor : '#4caf50',
        margin : 10,
        padding : 10
    },
    rowDiv : {
        flexDirection : 'row',
        padding : 20
    },
    subContainer : {
        marginLeft  : 50
    },
    subContainerText : {
        marginTop : 10,
        fontSize : 14,
        color : 'white'
    },
    subContainerTextBold : {
        marginTop : 10,
        fontSize : 14,
        color : 'white',
        fontWeight : 'bold'
    },
    subContainerTextHeading : {
        marginTop : 10,
        fontSize : 17,
        color : 'white'
    },
    btn : {
        width : 180
    },
    btnContainer : {
        flexDirection : 'row',
        justifyContent: 'center',
        paddingTop : 30,
        paddingBottom : 30
    },
    temp : {
        paddingTop : 10,
        paddingBottom : 40
    }
})