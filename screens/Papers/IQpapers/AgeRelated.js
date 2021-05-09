import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import config from '../../../config/config.js';

export default function AgeRelated(props){

    const [ageRelatedPapers, setAgeRelatedPapers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAgeRelatedPapers = async ()=>{

        let requestBody = {
            paper_type : "iq",
            category : "age related"
        }
        
        await axios.post(config.API_URL+'/iq_2', requestBody)
          .then(function (response) {
            if(response.status===200){
                setAgeRelatedPapers(response.data);
                setIsLoading(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const getTest = async (paper_id) =>{
        await AsyncStorage.setItem('selected_paper_id', paper_id.toString()).then((val)=>{
            props.navigation.navigate('IQ Test Details');
        });
    }

    useEffect(()=>{
        getAgeRelatedPapers();
    },[]);

    
    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading?false: ageRelatedPapers.map((item, index)=>{
                    return(
                        <View key={item.paper_id} style={styles.paperView}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text1}>{index+1}. {item.paper_name}</Text>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.text2}> - Paper Type : {item.paper_type}</Text>
                                    <Text style={styles.text2}> - Paper Category : {item.category}</Text>
                                    <Text style={styles.text2}> - Include 5 MCQ Questions</Text>
                                    <Text style={styles.text2}> - Include 5 Structured Questions</Text>
                                </View>
                            </View>
                            <View style={styles.btnContainer}>
                                <Button style={styles.btn} mode="contained" onPress={() =>{getTest(item.paper_id)}}>
                                    Get Test
                                </Button>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    paperView : {
        backgroundColor : '#212121',
        margin : 10,
        marginBottom  : 5
    },
    textContainer : {
        margin : 10
    },
    detailContainer : {
        marginTop : 20
    },  
    btnContainer : {
        flexDirection : 'column',
        alignItems : 'flex-end',
        margin : 20
    },
    btn : {
        width : 150
    },
    text1 : {
        color : 'white',
        fontSize : 24
    },
    text2 : {
        color : 'white',
        fontSize : 18
    }
})