import React from 'react';
import { StyleSheet, View , ScrollView } from 'react-native';

import EventBoard from '../screens/Dashboard/Eventboard';
import Leaderboard from '../screens/Dashboard/Leaderboard';
import Knowledge from '../screens/knowledge/Knowledge';
import Advertisements from './Advertisements/Advertisements';
import NewsBoard from '../screens/Dashboard/Newsboard';
import AskedQuestions from '../screens/Questions/AskedQuestions';

export default function Home(props){
    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <EventBoard/>
                <Advertisements />
                <Leaderboard />
                <NewsBoard />
                <Knowledge />
                <AskedQuestions />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10
    }
})