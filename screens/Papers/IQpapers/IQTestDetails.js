import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Button, Divider } from 'react-native-paper';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import config from '../../../config/config.js';

export default function IQTestDetails(props){

    const [userId, setUserId] = useState(null);
    const [selectedPaperId, setSelectedPaperId] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getExamDetails = async () =>{
        await AsyncStorage.getItem('user_id').then(async (user_id)=>{
            setUserId(user_id);
            getPaper(user_id);
        });
    }

    const getPaper = async (user_id) => {
        try {
            const selected_paper_id = await AsyncStorage.getItem('selected_paper_id');
            setSelectedPaperId(selected_paper_id);
            let requestBody = {}
            axios.post(config.API_URL+'/exam/'+selected_paper_id+"/"+user_id, requestBody)
                .then(async (res)=>{
                    if(res.data.result.count !=0 ){
                        props.navigation.goBack();
                    }else{
                        fetch(config.API_URL+'/paper/'+selected_paper_id)
                        .then((response)=>response.json())
                        .then((json)=>{
                            setSelectedPaper(json);
                            setIsLoading(false);
                        })
                    }
                })
                .catch(function (error) {
                console.log(error);
                });
          
        } catch(e) {
          console.log(e.message);
        }
      }

    const startExam = ()=>{
        props.navigation.navigate('IQ Exam');
    }

    useEffect(()=>{
        getExamDetails();
    },[])

    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.eventBoard}>
                <View style={styles.eventBoardHeading}>
                    <Text style={styles.eventBoardText}>Welcome to Online Exam for IQ test.</Text>
                </View>
                <Divider style={styles.divider2} />
                {isLoading?false: <View style={styles.temp}>
                    <View style={styles.eventContainer}>
                    <View style={styles.eventWrapper}>
                        <Text style={styles.eventTitle}>IQ Paper Instructions</Text>
                    </View>
                    <Divider style={styles.divider1} />
                    <View style={styles.eventDetailsWrapper}>
                        <Text style={styles.eventHeading}> - The Exam has 5 multiple-choice questions (MCQ) </Text>
                        <Text style={styles.eventHeading}> - And 5 structured questions (MCQ). </Text>
                        <Text style={styles.eventHeading}> - Exam Duration: 10 minutes.</Text>
                        <Text style={styles.eventHeading}> - Exam will be automatically submitted after exam duration finished. </Text>
                        <Text style={styles.eventHeading}> - Only one attempt is possible. - Paper Title : {selectedPaper.paper_name}</Text>
                        <Text style={styles.eventHeading}> - Paper Type : {selectedPaper.paper_type} </Text>
                    </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <Button style={styles.btn} mode="contained" onPress={() =>{startExam()}}>
                            Start Exam
                        </Button>
                    </View>
                </View>}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    temp:{
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'center'
    },
    container : {
        flex : 1,
        flexDirection : 'column',
        alignItems : 'center'
    },
    eventBoard : {
        backgroundColor : '#212121',
        borderRadius : 15,
        padding : 5,
        margin : 20,
        height : deviceHeight - 100,
    },
    eventBoardText : {
        fontSize : 20,
        fontWeight : 'bold',
        color : 'white'
    },
    eventBoardHeading : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 50
    },
    divider1 : {
        height : 1,
        backgroundColor : 'white'
    },
    divider2 : {
        height : 2,
        backgroundColor : 'white'
    },
    eventContainer : {
        backgroundColor : 'tomato',
        marginLeft : 15,
        marginRight : 15,
        height : 'auto',
        marginTop : 15,
        borderRadius : 15
    },
    eventWrapper : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 50
    },
    eventDetailsWrapper : {
        padding : 10
    },
    eventHeading : {
        fontSize : 16,
        color : 'white',
        padding : 5
    },
    eventTitle : {
        fontSize : 18,
        color : 'white',
    },
    eventDetails : {
        fontSize : 14,
        color : 'white',
        fontWeight : 'bold'
    },
    btnContainer : {
        flexDirection : 'column',
        alignItems : 'center',
        margin : 20
    },
    btn : {
        width : 150
    }
})