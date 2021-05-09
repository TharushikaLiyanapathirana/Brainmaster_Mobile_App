import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { Divider, IconButton} from 'react-native-paper';

const axios = require('axios');

import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../config/config.js';

export default function AskedQuestions(props){

    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState('');

    const getUser = async () => {
        const val = await AsyncStorage.getItem("user_id");
        setUserId(val);
      }

    const getQuestions = () =>{
        axios.get(config.API_URL+'/question').then((res)=>{
            setQuestion(res.data);
            getUser();
            setIsLoading(false);
        })
    }

    useEffect(()=>{
        getQuestions();
    },[]);

    const submitHandler = (question_id) =>{

        let requestBody = {
            answer: answer,
            answered_by: userId,
            question_id: question_id,
        }

        axios.post(config.API_URL+'/answer', requestBody)
          .then(function (response) {
            if(response.status===200){
                setAnswer('');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return(
        <View style={styles.newsBoard}>
            <View style={styles.newsBoardHeading}>
                <Text style={styles.newsBoardText}>News Board</Text>
            </View>
            <Divider style={styles.divider2} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading?false: question.map((item, index)=>{
                    return (
                    <View key={item.question_id} style={styles.newsContainer}>
                        <View style={styles.newsWrapper}>
                            <Text style={styles.newsTitle}>{index +1}. {item.question}</Text>
                        </View>
                        <Divider style={styles.divider1} />
                        <View style={styles.newsDetailsWrapper}>
                            <Text style={styles.newsHeading} >Your answer</Text>
                            <TextInput
                                label="Enter your answer"
                                value={answer}
                                mode={'outlined'}
                                onChangeText={(value)=>setAnswer(value)}
                                style={styles.input1}
                            />
                            <View style={styles.btnContainer}>
                                <Button mode="contained" onPress={() => submitHandler(item.question_id)} style={styles.btn}>
                                    Submit
                                </Button>
                            </View>
                        </View>
                    </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles  = StyleSheet.create({
    newsBoard : {
        marginTop : 10,
        backgroundColor : '#1976d2',
        borderRadius : 15,
        paddingBottom : 15
    },
    newsBoardText : {
        fontSize : 20,
        fontWeight : 'bold',
        color : 'white'
    },
    newsBoardHeading : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 50
    },
    divider1 : {
        height : 1,
        backgroundColor : 'black'
    },
    divider2 : {
        height : 2,
        backgroundColor : 'white'
    },
    newsContainer : {
        backgroundColor : '#eeeeee',
        marginLeft : 15,
        marginRight : 15,
        height : 'auto',
        marginTop : 15,
        borderRadius : 15
    },
    newsWrapper : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 50
    },
    newsDetailsWrapper : {
        padding : 10,
        flexDirection : 'column',
    },
    newsHeading : {
        fontSize : 16,
        color : 'black',
        padding : 5
    },
    newsTitle : {
        fontSize : 18,
        color : 'black'
    },
    newsDetails : {
        fontSize : 14,
        color : 'black',
        fontWeight : 'bold'
    },
    btn:{
        width : 150
    },
    btnContainer : {
        flexDirection : 'row',
        justifyContent: 'flex-start',
        paddingTop : 10,
        paddingBottom : 10
    },
})