import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Divider, Text } from 'react-native-paper';

const axios = require('axios');

import config from '../../config/config.js';

export default function NewsBoard(props){

    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getNews = () => {
        axios.get(config.API_URL+'/news/get_all/dashboard').then((res)=>{
            setNews(res.data);
            setIsLoading(false);
        })
    }

    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    useEffect(()=>{
        getNews();
    },[]);

    return(
        <View style={styles.newsBoard}>
            <View style={styles.newsBoardHeading}>
                <Text style={styles.newsBoardText}>News Board</Text>
            </View>
            <Divider style={styles.divider2} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading?false: news.map((item, index)=>{
                    return (
                    <View key={item.news_id} style={styles.newsContainer}>
                        <View style={styles.newsWrapper}>
                            <Text style={styles.newsTitle}>{index +1}. {item.title}</Text>
                        </View>
                        <Divider style={styles.divider1} />
                        <View style={styles.newsDetailsWrapper}>
                            <Text style={styles.newsHeading} >{item.news_body}</Text>
                            <Text style={styles.newsDetails}> - Added date : {formatDate(item.updatedAt)}</Text>
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
        marginTop : 20,
        backgroundColor : '#ff8f00',
        borderRadius : 15,
        paddingBottom : 15
    },
    newsBoardText : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    newsBoardHeading : {
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
    newsContainer : {
        backgroundColor : '#40b80d',
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
        padding : 10
    },
    newsHeading : {
        fontSize : 16,
        color : 'white',
        padding : 5
    },
    newsTitle : {
        fontSize : 18,
        color : 'white',
    },
    newsDetails : {
        fontSize : 14,
        color : 'white',
        fontWeight : 'bold'
    }
})