import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios');

import config from '../../config/config.js';

export default function SummaryReports(props){

    const [exams, setExams] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
        await AsyncStorage.getItem("user_id").then(async (val)=>{
            await axios.get(config.API_URL+'/paper2/get_exams/'+val).then((res)=>{
                if(res.data != null){
                    setExams(res.data);
                    setIsLoading(false);
                }
            })
        })
    }

    useEffect(()=>{
        getUser();
    },[]);
      
    return(
        <View>
        
            <View style={styles.tableHeading}>
                <Text style={styles.tableHeadingTitle}>Paper Name</Text>
                <Text style={styles.tableHeadingTitle}>Type</Text>
                <Text style={styles.tableHeadingTitle}>Marks</Text>
                <Text style={styles.tableHeadingTitle}>Grade</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                {isLoading? false: exams.map((item, index)=>{
                    if( index % 2 == 0){
                        return (
                        <View key={index} style={styles.tableDescription1}>
                            <Text style={styles.tableDescriptionText}>{item.paper.paper_name}</Text>
                            <Text style={styles.tableDescriptionText}>{item.paper.paper_type}</Text>
                            <Text style={styles.tableDescriptionText}>{item.marks}</Text>
                            <Text style={styles.tableDescriptionText}>{item.grade}</Text>
                        </View>
                        );
                    }else{
                        return (
                        <View key={index} style={styles.tableDescription2}>
                            <Text style={styles.tableDescriptionText}>{item.paper.paper_name}</Text>
                            <Text style={styles.tableDescriptionText}>{item.paper.paper_type}</Text>
                            <Text style={styles.tableDescriptionText}>{item.marks}</Text>
                            <Text style={styles.tableDescriptionText}>{item.grade}</Text>
                        </View>
                        );
                    }
                })}
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        marginTop : 20,
        backgroundColor : '#ff0000',
        borderRadius : 15,
        paddingBottom : 15
    },
    tableHeading : {
        backgroundColor : '#0d47a1',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems : 'center'
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
    tableDescriptionText1 : {
        fontSize : 15,
        color : 'black'
    },
    tableHeadingTitle : {
        fontSize : 16,
        fontWeight : 'bold',
        color : 'white'
    }
})