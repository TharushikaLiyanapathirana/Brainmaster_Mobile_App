import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';

const axios = require('axios');

import config from '../../config/config.js';

export default function Leaderboard(props){

    const [rankedUsers, setRankedUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getLeaderboard = async () => {
        await axios.get(config.API_URL+'/user/rank/leaderboard').then((res)=>{
            setRankedUsers(res.data);
            setIsLoading(false);
        })
      }

    useEffect(()=>{
        getLeaderboard();
    },[]);

    return(
        <View style={styles.container}>
            <View style={styles.LeaderboardHeading}>
                <Text style={styles.LeaderboardHeadingText}>Leaderboard</Text>
            </View>
            <View style={styles.tableHeading}>
                <Text style={styles.tableHeadingTitile}>RANK</Text>
                <Text style={styles.tableHeadingTitile}>NAME</Text>
                <Text style={styles.tableHeadingTitile}>MARKS</Text>
            </View>
            <View>
                {isLoading? false: rankedUsers.map((item, index)=>{
                    return (
                    <View key={item.user_id} style={styles.tableDescription}>
                        <Text style={styles.tableDescriptionText}>{index + 1}</Text>
                        <Text style={styles.tableDescriptionText}>{item.f_name} {item.l_name}</Text>
                        <Text style={styles.tableDescriptionText}>{item.total_marks}</Text>
                    </View>
                    );
                })}
            </View>
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
    LeaderboardHeading : {
        height : 50,
        justifyContent : 'center',
        alignItems : 'center'
    },
    divider1 : {
        height : 1,
        backgroundColor : 'white',
    },  
    LeaderboardHeadingText : {
        fontSize : 20,
        fontWeight : 'bold',
        color: '#000000'
    },
    tableHeading : {
        backgroundColor : '#212121',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems : 'center'
    },
    tableDescription : {
        backgroundColor : 'transparent',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        marginLeft : 60,
        marginRight : 60,
        alignItems : 'center',
    },
    tableDescriptionText : {
        fontSize : 15,
        color : 'white'
    },
    tableHeadingTitile : {
        fontSize : 16,
        fontWeight : 'bold',
        color : 'white'
    }
})