import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Divider, Text } from 'react-native-paper';

const axios = require('axios');

import config from '../../config/config.js';

export default function EventBoard(props){

    const [events, setEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getEvents = () => {
        axios.get(config.API_URL+'/event/get_all/dashboard').then((res)=>{
            setEvents(res.data);
            setIsLoading(false);
        })
    }

    useEffect(()=>{
        getEvents();
    },[]);

    return(
        <View style={styles.eventBoard}>
            <View style={styles.eventBoardHeading}>
                <Text style={styles.eventBoardText}>Event Board</Text>
            </View>
            <Divider style={styles.divider2} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading?false: events.map((item, index)=>{
                    return (
                    <View key={item.event_id} style={styles.eventContainer}>
                        <View style={styles.eventWrapper}>
                            <Text style={styles.eventTitle}>{index +1}. {item.title}</Text>
                        </View>
                        <Divider style={styles.divider1} />
                        <View style={styles.eventDetailsWrapper}>
                            <Text style={styles.eventHeading} >{item.desc}</Text>
                            <Text style={styles.eventDetails}> - Venue : {item.venue}</Text>
                            <Text style={styles.eventDetails}> - Date : {item.date}</Text>
                        </View>
                    </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles  = StyleSheet.create({
    eventBoard : {
        backgroundColor : '#ff8f00',
        borderRadius : 15,
        paddingBottom : 15
    },
    eventBoardText : {
        fontSize : 20,
        fontWeight : 'bold'
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
        backgroundColor : '#1976d2',
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
    }
})