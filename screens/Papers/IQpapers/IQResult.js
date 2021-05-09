import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, Dimensions, ScrollView, BackHandler } from 'react-native';
import {Button} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import config from '../../../config/config.js';

import * as ScreenOrientation from 'expo-screen-orientation';

export default function IQResult(props){

    const [selectedPaper, setSelectedPaper] = useState(null);
    const [participatUser, setParticipantUser] = useState(null);
    const [question, setQuestion] = useState(null);
    const [markings, setMarkings] = useState(null);
    const [exam, setExam] = useState(null);
    const [isLoading, setIsloading] = useState(true);

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    const getData = async ()=>{

        const selectedPaperID = await AsyncStorage.getItem('selected_paper_id');
        const marking = await AsyncStorage.getItem('iqExamMarking');
        const activeUserId = await AsyncStorage.getItem('user_id');

        axios.get(config.API_URL+"/exam/"+selectedPaperID+"/"+activeUserId)
        .then((res)=>{
            console.log(res.data);
            setExam(res.data);
            axios.get(config.API_URL+"/paper/"+selectedPaperID)
            .then((res)=>{
                setSelectedPaper(res.data);

                axios.get(config.API_URL+"/user/"+activeUserId)
                .then((res)=>{
                    setParticipantUser(res.data);
                    setIsloading(false);
                });
            });
        });
    }

    const gotoAnswers = () =>{
        props.navigation.navigate('IQ Answers');
    }

    const backAction = ()=>{
        showDialog();
        return true;
    }

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    useEffect(()=>{
        changeScreenOrientation();
        getData();
        backHandler;
    },[]);

    return(
        <View>
            {isLoading?false : 
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.div2}>
                    <View>
                        <Text style={styles.subContainerTextHeading}>Paper Information</Text>
                        <View style={styles.rowDiv}>
                            <View>
                                <Text style={styles.subContainerText}>Paper Title </Text>
                                <Text style={styles.subContainerText}>Marks </Text>
                                <Text style={styles.subContainerText}>Grade </Text>
                                <Text style={styles.subContainerText}>Paper Category </Text>
                                <Text style={styles.subContainerText}>Paper Type </Text>
                                <Text style={styles.subContainerText}>Duration </Text>
                            </View>
                            <View style={styles.subContainer}>
                                <Text style={styles.subContainerTextBold}>{selectedPaper.paper_name}</Text>
                                <Text style={styles.subContainerTextBold}>{exam.marks}</Text>
                                <Text style={styles.subContainerTextBold}>{exam.grade}</Text>
                                <Text style={styles.subContainerTextBold}>IQ</Text>
                                <Text style={styles.subContainerTextBold}>MCQ & Structured</Text>
                                <Text style={styles.subContainerTextBold}>10 minutes</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.subContainerTextHeading}>Participant Information</Text>
                        <View style={styles.rowDiv}>
                            <View>
                                <Text style={styles.subContainerText}>Full Name </Text>
                                <Text style={styles.subContainerText}>Age </Text>
                                <Text style={styles.subContainerText}>Total Marks</Text>
                            </View>
                            <View style={styles.subContainer}>
                                <Text style={styles.subContainerTextBold}>{participatUser.f_name} {participatUser.l_name}</Text>
                                <Text style={styles.subContainerTextBold}>{participatUser.age}</Text>
                                <Text style={styles.subContainerTextBold}>{participatUser.total_marks}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                

                <View style={styles.btnContainer}>
                    <Button mode="contained" onPress={() => gotoAnswers()} style={styles.btn}>
                        Goto IQ Ansers
                    </Button>
                </View>

            </ScrollView>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    tableHeading : {
        backgroundColor : '#0d47a1',
        flexDirection : 'row',
        justifyContent : 'space-evenly',
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
})