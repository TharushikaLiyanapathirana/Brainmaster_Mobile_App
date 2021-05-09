import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, Linking, Vibration } from 'react-native';
import { Divider, IconButton} from 'react-native-paper';
import * as FileSystem from 'expo-file-system';

import Icon from 'react-native-vector-icons/Ionicons';

const axios = require('axios');

import config from '../../config/config.js';

export default function Knowledge(props){

    const [knowledge, setKnowledge] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let knowledgeAPI = config.KNOWLDEGE_API;

    const getKnowledge = () =>{
        axios.get(config.API_URL+'/knowledge').then((res)=>{
            setKnowledge(res.data);
            setIsLoading(false);
        })
    }


    const downloadPaper = async (item)=>{

        const downloadResumable = FileSystem.createDownloadResumable(
            knowledgeAPI+item.file,
            FileSystem.documentDirectory + '/test/' + item.file,
            {}
          );

        try {
            const { uri } = await downloadResumable.downloadAsync();
            Alert.alert(
                "Finished Downloading",
                "Press Ok to continue with Brainmaster",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
          } catch (e) {
            console.error(e);
          }
    }

    const downloadDocument = (item) =>{
        Vibration.vibrate(100);
        Linking.openURL(config.KNOWLDEGE_API + item.file);
    }

    useEffect(()=>{
        getKnowledge();
    },[]);

    return(
        <View style={styles.container}>
            <View style={styles.KnowledgeHeading}>
                <Text style={styles.KnowledgeHeadingText}>Knowledge</Text>
            </View>

            <View style={styles.tableHeading}>
                <Text style={styles.tableHeadingTitile}>DESCRIPTION</Text>
                <Text style={styles.tableHeadingTitile}>DOWNLOAD</Text>
            </View>

            <View>
                {isLoading?false: knowledge.map((item)=>{
                    return (
                    <View key={item.knowledge_id} style={styles.tableDescription}>
                        <Text style={styles.tableDescriptionText}>{item.desc}</Text>
                        <IconButton 
                            icon="download-outline"
                            color={'#ffffff'}
                            animated = {true}
                            size={20}
                            onPress={()=>{downloadDocument(item)}}
                        />
                    </View>
                    );
                })}
            </View>


            <Divider />

        </View>
    );
}

const styles  = StyleSheet.create({
    container : {
        marginTop : 20,
        backgroundColor : '#212121',
        borderRadius : 15,
        paddingBottom : 15,
        marginBottom : 20
    },
    KnowledgeHeading : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 50
    },
    KnowledgeHeadingText : {
        fontSize : 20,
        fontWeight : 'bold',
        color: 'white'
    },
    tableHeading : {
        backgroundColor : '#bdbdbd',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems : 'center'
    },
    tableHeadingTitile : {
        fontSize : 16,
        fontWeight : 'bold',
        color : 'black'
    },
    tableDescription : {
        backgroundColor : 'transparent',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems : 'center',
    },
    tableDescriptionText : {
        fontSize : 15,
        color : 'white'
    },
})