import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text , TextInput,  TouchableOpacity } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const axios = require('axios');
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../config/config.js';

export default function AskQuestions(props){

    const [question,setQuestion] = useState('');
    const [userId, setUserId] = useState('');
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    const getUser = async () => {
        const val = await AsyncStorage.getItem("user_id");
        setUserId(val);
    }

    const submitHandler = () =>{

        let requestBody = {
            question: question,
            asked_by: userId,
        }

        axios.post(config.API_URL+'/question', requestBody)
          .then(function (response) {
            if(response.status===201){
                setQuestion('');
                showDialog();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(()=>{
        getUser();
    },[]);

    return(
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.text1}>Ask Questions form Users</Text>
            </View>
            <TextInput
                label="Question"
                value={question}
                multiline={true}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                mode={'outlined'}
                onChangeText={text => setQuestion(text)}
            />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText} onPress={()=>{submitHandler()}}>Submit</Text>
            </TouchableOpacity>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Success !</Dialog.Title>
                    <Dialog.Content>
                    <Paragraph>Question added successfully !</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

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
    text1 : {
        fontSize : 20
    }
});