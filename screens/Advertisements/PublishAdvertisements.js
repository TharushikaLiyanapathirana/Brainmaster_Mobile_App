import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import config from '../../config/config.js';

export default function PublishAdvertisements(props){

    const [image, setImage] = useState(null);
    const [desc, setDesc] = useState('');

    const publishAdvertisement = async () =>{
        let userID = await AsyncStorage.getItem('user_id');

        const fileName = image.uri.split("/").pop();

        let match = /\.(\w+)$/.exec(fileName);
        let type = match ? `image/${match[1]}` : `image`;

        image.type = type;

        let formData = new FormData();

        formData.append("desc", desc);
        formData.append("ad_img", image);
        formData.append("added_by", userID);

        console.log(JSON.stringify(formData));

        await fetch(config.API_URL+"/ad/", {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
            },
            body: formData,
        }).then((res)=>{
            setDesc('');
            setImage(null);
        }).catch((e)=>{
            console.log(e.message);
        })

    }

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //   mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   allowsEditing: true,
        //   aspect: [3, 3],
        //   quality: 1,
        // });
    
        // if (!result.cancelled) {
        //   setImage(result);
        // }

        try{
            let result = await DocumentPicker.getDocumentAsync();
            setImage(result);
            console.log(result);
        }catch(err){
            console.log(err.message);
        }

      };

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Publish Advertisement</Text>
            </View>
            <View>
                <TextInput
                    label="Advertisement Description"
                    value ={desc}
                    onChangeText={(value)=>{setDesc(value)}}
                    mode={'outlined'}
                    multiline={true}
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                />
                <Text>add the description of the advertisement</Text>
            </View>
            
            <View style={styles.btnContainer} >
                <Button style={styles.btnPick} mode="contained" onPress={pickImage}>
                    Image
                </Button>
                <Text>add the Image of the advertisement (jpg, jpeg, png)</Text>
            </View>

            <View>
            <TouchableOpacity style={styles.btn} onPress={()=>{publishAdvertisement()}}>
                <Text style={styles.btnText}>Submit</Text>
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
        justifyContent: 'flex-start'
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

    btnPick : {
        marginTop : 40,
        marginBottom : 20,
        alignItems : 'center',
        justifyContent : 'center',
        height : 40,
        width : 200,
        backgroundColor : 'pink',
        borderRadius : 50,
        marginBottom : 50
    },
    btnContainer : {
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    btnText:{
        color: 'white'
    },
    headerContainer : {
        padding : 20
    },
    header : {
        fontSize : 20,
        fontWeight : 'bold'
    }
});