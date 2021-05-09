import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Vibration } from 'react-native';
import {Button } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import config from '../../config/config.js';

import * as DocumentPicker from 'expo-document-picker';


export default function UploadKnowledge(props){

    const [file, setFile] = useState(null);
    const [fileUploading, setFileUploading] = useState(false);
    const [desc, setDesc] = useState('');

    const addKnowledge = async () =>{

        Vibration.vibrate(100);

        let userID = await AsyncStorage.getItem('user_id');

        file.type = "application/pdf";

        let formData = new FormData();
        formData.append("desc", desc);
        formData.append("file", file);
        formData.append("added_by", userID);

        console.log("Form Data :: "+JSON.stringify(formData));

        fetch(config.API_URL+"/knowledge/", {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
            },
            body: formData
        })
        .then(response => console.log(response.json()));
    }

    
    const pickDocument = async () =>{
        try{
            let result = await DocumentPicker.getDocumentAsync();
            setFile(result);
            setFileUploading(true);
            console.log(result);
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
      }, []);


    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Upload Papers</Text>
            </View>
            <View>
                <TextInput
                    value={desc}
                    onChangeText={(value)=>setDesc(value)}
                    multiline={true}
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                />
                <Text>Add description of the document</Text>
            </View>
            
            <View style={styles.btnContainer} >
                <Button style={styles.btnPick} mode="contained" onPress={()=>{pickDocument()}}>
                    Document
                </Button>
                <Text>Add the document (pdf, docx)</Text>
            </View>

            <View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText} onPress={()=>{addKnowledge()}}>Submit</Text>
            </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent :'center',
        alignItems: 'center'
    },
    container2 : {
        justifyContent: 'center',
        alignItems: 'center',
        padding : 50
    },
    textArea: {
        height: 200,
        width : 350,
        justifyContent: 'flex-start',
        textAlignVertical : 'top',
        borderLeftWidth: 1,
        borderColor : '#0000ee',
        borderRightWidth: 1,
        borderTopWidth : 1,
        borderBottomWidth : 1,
        padding : 10
    },
    textArea2: {
        width : 350,
        justifyContent: 'flex-start'
    },
    btn : {
        marginTop : 40,
        marginBottom : 20,
        alignItems : 'center',
        justifyContent : 'center',
        height : 50,
        width : 100,
        backgroundColor : 'blue',
        borderRadius : 50,
        marginBottom : 50
    },
    btnText:{
        color: 'white'
    },
    btnContainer : {
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30
    },
    headerContainer : {
        padding : 20
    },
    header : {
        fontSize : 20,
        fontWeight : 'bold'
    }
});